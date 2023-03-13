<script >
import { profileController } from '../controllers/profileController'
import { animeSeasonController } from "../controllers/animeSeasonController";
import WeeklyCalendar from '../components/WeeklyCalendar.vue'

export default {
  components: {
    WeeklyCalendar
  },
  data: function () {
    return {
      Titulo: "Calendario de Animes",
      animeService: new animeSeasonController(),
      profileController: new profileController(),
      myanimes:[]
    }
  },methods: {
    async getAnimeInfo(anime) {
      let responseAnime = await this.animeService.getAnimeInfo(anime)
      this.$router.push(`/anime/${responseAnime.id}`)
    },
  },
  mounted() {

  },
  created() {
    this.myanimes = this.profileController.getList()
  },
}
</script>

<template>
  <main>
    <div class="p-3 m-3">
      <h1>{{Titulo}}</h1>
      <WeeklyCalendar :myAnimes="myanimes" @click="getAnimeInfo"/>
    </div>
  </main>
</template>

