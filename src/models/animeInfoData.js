export class animeInfoData {
    constructor(animeInfo) {
        this.id = animeInfo.id;
        this.image = animeInfo.image;
        this.title = animeInfo.title;
        this.description = animeInfo.description;
        this.episodes = animeInfo.episodes.map(o => { return { id: o.id, number: o.number, title: o?.title || "" } });
    }
}