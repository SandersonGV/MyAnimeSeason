import { baseSevice } from './baseSevice'

export class malSevice extends baseSevice {
    constructor() {
        super('https://api.jikan.moe/v4/')
    }
    getSeason = async (year, season, page) => {
        let data = await this.get(`seasons/${year}/${season}?page=${page}`)
        return data;
    }
    getSeasonNow = async (page) => {
        let data = await this.get(`seasons/now?page=${page}`)
        return data;
    }
    getSeasonUpcoming = async (page) => {
        let data = await this.get(`seasons/upcoming?page=${page}`)
        return data;
    }
}