import { dataStorage } from '../helpers/dataStorage'

export class profileController {
    constructor() {
        this.dataStorage = new dataStorage();
        let storageProfile = this.getProfile()
        if(storageProfile){
            this.profile = storageProfile.data;
        }else{
            this.profile = {
                name:"Anonimo",
                config: {
                    server: "vidstreaming",
                    quality: "default",
                    lang: "Brazil",
                    provider: "zoro",
                },
                animeList: []
            }
            console.log(this.profile)
            this.saveProfile();
        }
    }
    getConfig(){
        this.profile = this.getProfile()
        return this.profile.config;
    }
    saveConfig(config){
        this.profile.config = config
        this.saveProfile();
    }
    getList(){
        this.profile = this.getProfile()
        return this.profile.animeList;
    }
    saveList(animeList){
        this.profile.animeList = animeList
        this.saveProfile();
    }
    getProfile(){
        let storageProfile = this.dataStorage.get("profile");
        if(storageProfile){
            this.profile = storageProfile.data;
        }else{
            this.profile = {
                name:"Anonimo",
                config: {
                    server: "vidstreaming",
                    quality: "default",
                    lang: "Brazil",
                    provider: "zoro",
                },
                animeList: []
            }
            this.saveProfile();
        }
        return this.profile;
    }
    saveProfile(){
        this.dataStorage.save( {id:"profile", data: this.profile} );
    }

}