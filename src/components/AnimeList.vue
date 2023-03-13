<script >
import { animeSeasonController } from "../controllers/animeSeasonController";
import { profileController } from '../controllers/profileController'

export default {
    props: [
        'animelist',
        "hasnextpage",
        "canadd"
    ],
    data: function () {
        return {
            myanimes: [],
            profileController: new profileController(),
            animeController: new animeSeasonController(),
        }
    }, methods: {
        async remAnime(id) {
            let newArrya = this.myanimes.filter(o => o.mal_id != id)
            this.myanimes = newArrya;
            this.profileController.saveList(this.myanimes)
        },
        async addAnime(anime) {
            this.myanimes.push(anime)
            this.profileController.saveList(this.myanimes)
        },
        async getAnimeInfo(anime) {
            let responseAnime = await this.animeController.getAnimeInfo(anime)
            this.$router.push(`/anime/${responseAnime.id}`)
        },
        async nextPage() {
            this.$emit("nextPage")
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
    <div>
        <div class="d-flex flex-wrap justify-content-center m-2">
            <div v-for="(item, index) in animelist" :key="index" class="card rounded-0 m-1" v-show="(!canadd||myanimes.some(o => o.mal_id == item.mal_id))">
                <img :src="item.images.jpg.image_url" class="card-img rounded-0 h-100" alt="...">
                <div class="card-img-overlay d-flex flex-column align-items-sm-start ">
                    <a href="#" class="badge text-bg-light my-1 text-decoration-none" v-if="myanimes.some(o => o.mal_id == item.mal_id)"
                        @click.prevent="remAnime(item.mal_id)">
                        <i class="bi bi-bookmark-fill text-secondary "></i> remover
                    </a>
                    <a href="#" class=" badge text-bg-secondary  my-1 text-decoration-none" v-else
                        @click.prevent="addAnime(item)">
                        <i class="bi bi-bookmark "></i> adicionar
                    </a>
                    
                    <span class="badge text-bg-secondary my-1">
                        <i class="bi bi-display"></i> {{ item.broadcast.day }}
                    </span>
                    <span class="badge text-bg-secondary my-1">
                        <i class="bi bi-broadcast-pin"></i> {{ item.status }}
                    </span>
                    <a href="#" @click="getAnimeInfo(item)"
                        class="my-1 mt-auto text-start w-100 text-truncate badge text-decoration-none text-bg-secondary">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto py-5">
            <button class="btn btn-primary" v-show="hasnextpage" type="button" @click.prevent="nextPage()">Carregar
                mais</button>
        </div>
    </div>
</template>

<style scoped>

</style>
