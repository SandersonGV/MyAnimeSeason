<script >
import { animeSeasonController } from "../controllers/animeSeasonController";
import AnimeList from '../components/AnimeList.vue'


export default {
  components: {
    AnimeList
  },
  data: function () {
    return {
      Titulo: "Lista de animes por temporada",
      animes: [],
      currentpage: 1,
      hasnextpage: false,
      currentseason: "winter",
      seasons: [
        "winter",
        "spring",
        "summer",
        "fall"
      ],
      currentyear: "2023",
      years: [
        "2023",
        "2022",
        "2021",
      ],
      animeController: new animeSeasonController(),
    }
  },
  methods: {
    async getAnimesSeason(page = 1) {
      this.animes = []
      this.currentpage = 1
      this.hasnextpage = false
      let result = await this.animeController.getSeason(this.currentyear, this.currentseason, page)
      this.animes = result.data;
      this.currentpage = result.pagination.current_page
      this.hasnextpage = result.pagination.has_next_page
    },
    async nextPage() {
      this.currentpage = this.currentpage + 1;
      let result = await this.animeController.getSeason(2023, this.currentseason, this.currentpage)
      this.animes.push(...result.data);
      this.currentpage = result.pagination.current_page
      this.hasnextpage = result.pagination.has_next_page
    },
    async getAnimeInfo(anime) {
      console.log(anime)
      let responseAnime = await this.animeController.getAnimeInfo(anime)
      this.$router.push(`/anime/${responseAnime.id}`)
    },

  },
  mounted() {
    this.getAnimesSeason()
  },
}
</script>

<template>
  <main>
    <div class="p-3 m-3">
      <h1>{{ Titulo }}</h1>
      <div class="row m-2">
        <div class="col-md-4">
          <select v-model="currentyear" @change="getAnimesSeason()" class="form-select"
            aria-label="Default select example">
            <option selected>selecione</option>
            <option v-for="(item, index) in years" :key="index" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="col-md-8">
          <select v-model="currentseason" @change="getAnimesSeason()" class="form-select"
            aria-label="Default select example">
            <option selected>selecione</option>
            <option v-for="(item, index) in seasons" :key="index" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>

      <AnimeList :animelist="animes" :hasnextpage="hasnextpage" @nextPage="nextPage" />
    </div>
  </main>
</template>
