<script >
import { profileController } from '../controllers/profileController'
import AnimeList from '../components/AnimeList.vue'

export default {
  components:{
    AnimeList
  },
  data() {
    return {
      Titulo: "minha lista de animes",
      myanimes:[],
      profileController: new profileController(),
    }
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
    <AnimeList 
      :animelist="myanimes" 
      hasnextpage="false" 
      canadd
      />
    </div>
  </main>
</template>
