export class baseSevice {
    constructor(baseUrl) {
        this.baseurl = baseUrl;
        this.get = async (url, params) => {
            let result = await fetch(this.baseurl + url, {
                method: 'GET',
            })
            return await result.json()
        }
    }
}