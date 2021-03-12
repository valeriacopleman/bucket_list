class ApiService {

    constructor() {
        this.baseURL = 'http://localhost:3000'
    }

    static headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    async fetchBuckets() {
        let res = await fetch(this.baseURL + '/buckets')
        let data = await res.json()
        return data
    }

    async fetchBucket(id) {
        let res = await fetch(this.baseURL + `/buckets/${id}`)
        let data = await res.json()
        return data
    }
    
    async fetchCreateBucket(bucketData) {
        let configObj = {
            method: 'POST',
            body: JSON.stringify(bucketData),
            headers: ApiService.headers
        }
        let res = await fetch(this.baseURL + `/buckets`, configObj)
        let data = await res.json()
        return data
    }

    async fetchRemoveBucket(id) {
        let configObj = {
            method: 'DELETE',
            headers: ApiService.headers
        }
        await fetch(this.baseURL + `/buckets/${id}`, configObj)
    }

    async fetchCreateThing(thingData) {
        let configObj = {
            method: 'POST',
            body: JSON.stringify(thingData),
            headers: ApiService.headers
        }
    
        let res = await fetch(this.baseURL + `/things`, configObj)
        let data = await res.json()
        return data

    }

    async fetchRemoveThing(id) {
        let configObj = {
            method: 'DELETE',
            headers: ApiService.headers
        }
        await fetch(this.baseURL + `/things/${id}`, configObj)
    }
}