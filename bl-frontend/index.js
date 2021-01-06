const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    getBuckets()
})

function getBuckets() {
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + '/buckets')
    .then(res => res.json())
    .then(buckets => {
        buckets.map( bucket => {
        
        main.innerHTML += `
        <li>
        <a href="#" data-id="${bucket.id}">${bucket.name}</a>
        </li>
        ` 
        }).join("")
        attachClicksToLinks()
    })

}

function attachClicksToLinks() {
    let buckets = document.querySelectorAll("li a")
    buckets.forEach(bucket => {
        bucket.addEventListener('click', displayBucket)
    })
}

function displayBucket(e) {
    console.log(e.target)
    let id = e.target.dataset.id
    main.innerHTML = ""
    fetch(BASE_URL + `/buckets/${id}`)
    .then(resp => resp.json())
    .then(bucket => {
        main.innerHTML = `
        <h3>${bucket.name}:</h3> 
        <br>
        `
        bucket.things.forEach( thing => {
            main.innerHTML += `
            <li>${thing.description}</li>
            `
        })
    })
}



