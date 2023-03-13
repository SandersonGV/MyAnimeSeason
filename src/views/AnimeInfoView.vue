<script >
import { profileController } from '../controllers/profileController'
import { animeSeasonController } from "../controllers/animeSeasonController";
import { VideoPlayer } from '../helpers/VideoPlayer'

export default {
  props: ['id'],
  data: function () {
    return {
      selectedAnime: {},
      animeService: new animeSeasonController(),
      cjs: {},
      timeVideo: "",
      player: null,
      videoModal: null,
      selectedEdisode: {},
      config: {},
      profileController: new profileController(),
    }
  }, methods: {
    async getAnimeInfo() {
      let anime = await this.animeService.getAnimeInfoById(this.id)
      console.log(anime)
      anime.episodes = anime.episodes.sort((a, b) => b.number - a.number)
      this.selectedAnime = anime;
    },
    async getStremLink(ep) {
      let id = ep.id
      let anime = await this.animeService.getStremLink(id)
      return {
        source: anime.sources,
        subtitle: anime.subtitles
      }
    },
    async openInVideoPlayer(ep) {
      this.selectedEdisode = {};
      let { source, subtitle } = await this.getStremLink(ep)
      let theSource = source.find(o => o.quality == this.config.quality)
      source = theSource ?? source[0]
      let subtitles = subtitle.map(o => {
        let sub = {
          kind: 'captions',
          src: o.url,
          label: o.lang,
        }
        if (o.lang.includes("Brazil")) {
          sub.default = true;
        }

        return sub
      })

      console.log(source, subtitles)
      this.player.changeVideo(source.url)
      this.player.addSubtitle(subtitles)
      this.selectedEdisode = ep
      this.videoModal.show()

    },
    async openInCast(ep) {
      let { source, subtitle } = await this.getStremLink(ep)
      let theSource = source.find(o => o.quality == this.config.quality)
      source = theSource ?? source[0]
      subtitle = subtitle.map(o => {
        sub = {
          active: true,
          label: o.lang,
          src: o.url
        }
        if (o.lang.includes("Brazil")) {
          sub.active = true;
        }
        return sub
      })

      if (this.cjs.available) {
        this.cjs.cast(source.url, {
          poster: this.selectedAnime.image,
          title: this.selectedAnime.title,
          description: ep.title,
          subtitles: subtitle,
        })
      }
    }
  },
  mounted() {
    this.cjs = new Castjs();
    this.getAnimeInfo()
    this.player = new VideoPlayer({
      id: 'videoPlayer'
    });
    this.videoModal = new bootstrap.Modal('#videoModal', {
      keyboard: false
    })
    const myModalEl = document.getElementById('videoModal')
    myModalEl.addEventListener('hidden.bs.modal', event => {
      this.player.pause();
    })
    this.config = this.profileController.getConfig()
  },
  beforeDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  }
}
</script>

<template>
  <main>
    <div class=" p-3 m-5">
      <div class="row">
        <div class="col-3">
          <img :src="selectedAnime.image" class="w-100 rounded" />
        </div>
        <div class="col-9">
          <h1>{{ selectedAnime.title }}</h1>
          <p class="card-text">{{ selectedAnime.description }}</p>
        </div>
      </div>

      <div class="card my-2">
        <div class="card-header">
          Playng now: {{ this.cjs.title || "..." }}
        </div>
        <div class="card-body">

          <p class="card-text"> {{ this.cjs.description }} </p>
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-outline-danger" @click.prevent="cjs.disconnect()"><i
                class="bi bi-stop"></i></button>
            <button type="button" class="btn btn-outline-primary" @click.prevent="cjs.pause()"
              v-if="this.cjs.state == 'playing'"><i class="bi bi-pause"></i></button>
            <button type="button" class="btn btn-outline-primary" @click.prevent="cjs.play()" v-else><i
                class="bi bi-play"></i></button>
          </div> {{ cjs.timePretty }}
        </div>
      </div>
      <h6>Lista de Episodeos</h6>
      <div class="list-group">
        <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          v-for="(ep, index) in selectedAnime.episodes" :key="index" :value="ep.id">
          <span>Episodeo {{ ep.number }} - <small>{{ ep.title }}</small></span>
          <div>
            <button type="button" class="btn btn-outline-primary" @click.prevent="openInVideoPlayer(ep)"><i
                class="bi bi-collection-play-fill"></i></button>
            <button type="button" class="btn btn-outline-primary" @click.prevent="openInCast(ep)"><i
                class="bi bi-cast"></i></button>
          </div>
        </a>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="videoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="videoModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="videoModalLabel">{{ selectedEdisode.title }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <video controls preload="auto" data-setup='{}' id="videoPlayer" :poster="selectedAnime.image"
                class="video-js vjs-fluid">
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
