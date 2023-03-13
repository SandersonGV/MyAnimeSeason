import { dataStorage } from '../helpers/dataStorage'
import { animeZoroSevice } from '../services/animeZoroSevice'
import { gogoAnimeSevice } from '../services/gogoAnimeSevice'
import { enimeSevice } from '../services/enimeSevice'
import { animePaheSevice } from '../services/animePaheSevice'
import { animeFoxSevice } from '../services/animeFoxSevice'
import { malSevice } from '../services/malSevice'

export class animeSeasonController {
    constructor() {
        this.dataStorage = new dataStorage();
        this.service = {
            zoro: new animeZoroSevice(),
            gogoanime: new gogoAnimeSevice(),
            enime: new enimeSevice(),
            animepahe: new animePaheSevice(),
            animefox: new animeFoxSevice(),
            myanimelist: new malSevice(),
        }
    }
    async getAnimeInfo(animeData) {
        this.getConfig()
        let search = {
            title: animeData.title,
            title_english: animeData.title_english,
        }
        let anime = await this.service[this.provider].getAnimeInfo(search)
        return anime;
    }
    async getAnimeInfoById(id) {
        this.getConfig()
        let anime = await this.service[this.provider].getAnimeInfoById(id)
        return anime;
    }
    async getStremLink(id) {
        this.getConfig()
        let anime = await this.service[this.provider].getStremLink(id, this.server)
        return anime;
    }
    async getConfig() {
        let config = this.dataStorage.get("config")
        if (config) {
            this.provider = config.data.provider
            this.server = config.data.server
        }
    }
    async getSeason(year, season, page) {
        let data = await this.service.myanimelist.getSeason(year, season, page)
        return data;
    }
    async getSeasonNow(page) {
        let data = await this.service.myanimelist.getSeasonNow(page)
        return data;
    }
    async getSeasonUpcoming (page) {
        let data = await this.service.myanimelist.getSeasonUpcoming(page)
        return data;
    }
}