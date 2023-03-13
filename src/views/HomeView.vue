<script >
import { animeSeasonController } from "../controllers/animeSeasonController";
import AnimeList from '../components/AnimeList.vue'

export default {
  components:{
    AnimeList
  },
  data() {
    return {
      Titulo: "Animes desta temporada",
      animeController: new animeSeasonController(),
      currentpage: 1,
      hasnextpage: false,
      animes:[]
    }
  },methods: {
    async getAnimesSeason(page = 1) {
      this.animes = []
      this.currentpage = 1
      this.hasnextpage = false
      let result = await this.animeController.getSeasonNow( page)
      this.animes = result.data;
      this.currentpage = result.pagination.current_page
      this.hasnextpage = result.pagination.has_next_page
    },
    async nextPage() {
      this.currentpage = this.currentpage + 1;
      let result = await this.animeController.getSeasonNow( this.currentpage)
      this.animes.push(...result.data);
      this.currentpage = result.pagination.current_page
      this.hasnextpage = result.pagination.has_next_page
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
      <h1>{{Titulo}}</h1>
    <AnimeList 
      :animelist="animes" 
      :hasnextpage="hasnextpage" 
      @nextPage="nextPage" 
      />
    </div>
  </main>
</template>
