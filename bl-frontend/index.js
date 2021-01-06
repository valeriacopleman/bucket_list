const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getBuckets()
})

function getBuckets() {
    let main = document.getElementById('main')
    fetch(BASE_URL + '/buckets')
    .then(res => res.json())
    .then(buckets => {
        console.log(buckets)
    })
}