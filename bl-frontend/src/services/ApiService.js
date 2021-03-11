class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:3000'
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
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let res = await fetch(this.baseURL + `/buckets`, configObj)
        let data = await res.json()
        return data
    }

    async fetchRemoveBucket(id) {
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let res = await fetch(this.baseURL + `/buckets/${id}`, configObj)
    }

    async fetchRemoveThing(id) {
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let res = await fetch(this.baseURL + `/things/${id}`, configObj)
    }
}

