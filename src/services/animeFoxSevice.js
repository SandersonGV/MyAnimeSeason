import { baseSevice } from './baseSevice'
import { similarity } from '../helpers/similarity'
import { animeInfoData } from '../models/animeInfoData'
import { animeSearchData } from '../models/animeSearchData'
import { animeStreamLinks } from '../models/animeStreamLinks'

export class animeFoxSevice extends baseSevice {
    constructor() {
        super('https://api.consumet.org/anime/animefox/')
    }
    async getAnimeInfo(search) {
        let name = search.title
        let animelist = await this.get(name)
        let ranklist = animelist.results.filter(o => {
            let perc = similarity(search.title_english || "", o.title) * 100
            let perc2 = similarity(search.title || "", o.title) * 100
            if (perc > 80 || perc2 > 80) {
                o.similarity = perc + perc2
                return new animeSearchData(o)
            }
        })
        let melhoresresultados = ranklist.sort((a, b) => b.similarity - a.similarity)
        return melhoresresultados[0]
    }
    async getAnimeInfoById(id) {
        let anime = await this.get("info?id=" + id)
        return new animeInfoData(anime);
    }
    async getStremLink(id) {
        let animelinks = await this.get(`watch?episodeId=${id}`)
        let links = {
            sources: animelinks.sources,
            subtitles: []
        }
        return new animeStreamLinks(links);
    }
}