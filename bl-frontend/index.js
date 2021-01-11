const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('buckets').addEventListener('click', getBuckets)
    getBuckets()

})

function displayCreateBucketForm() {
    let formDiv = document.querySelector('div#bucket-form')
    let html = `
        <br>
        <form>
            <label>Name:</label>
            <input type="text" id = "name">
            <input type="submit">
        </form>

    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createBucket)
}

function clearForm() {
    let formDiv = document.querySelector('div#bucket-form')
    formDiv.innerHTML = ''
}

function createBucket(e) {
    e.preventDefault()
    let bucket = {
        name: e.target.querySelector("#name").value
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(bucket),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + '/buckets', configObj)
    .then(res => res .json()) 
    .then(bucket => {
        main.innerHTML += `
        <br>
        <li>
        <a href="#" data-id="${bucket.id}">${bucket.name}</a>
        </li>
        `
        attachClicksToLinks()
        clearForm() 
        }
    ) 
}

function getBuckets() {
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetchBuckets()
    .then(buckets => {
        main.innerHTML = `
        <a href="#" id="bucket-form">+Create a Bucket List</a>
        <div id="bucket-form"></div>
        `
        buckets.map( bucket => {
        main.innerHTML += `
        <br>
        <li>
        <a href="#" data-id="${bucket.id}">${bucket.name}</a>
        </li>
        ` 
        })
        attachClicksToLinks()
        clearForm()
        document.getElementById('bucket-form').addEventListener('click', displayCreateBucketForm)
    })
    
}

async function fetchBuckets() {
    let res = await fetch(BASE_URL + '/buckets')
    let data = await res.json()
    return data
}

function attachClicksToLinks() {
    let buckets = document.querySelectorAll("li a")
    buckets.forEach(bucket => {
        bucket.addEventListener('click', displayBucket)
    })
}

function attachClicksToButtons() {
    let things = document.querySelectorAll("button")
    things.forEach(thing => {
        thing.addEventListener('click', removeThing)
    })
}

function displayBucket(e) {
    console.log(e.target)
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + `/buckets/${id}`)
    .then(resp => resp.json())
    .then(bucket => {
        main.innerHTML = `
        <h3>${bucket.name}:</h3>
        <button id="delete-bucket" data-id="${bucket.id}">Delete List</button>
        <br>
        <br>
        <a href="#" id="thing-form" data-id="${bucket.id}">Add to List</a>
        <div id="thing-form"></div>
        <br>
        `        
        bucket.things.forEach( thing => {
            main.innerHTML += `
            <li >${thing.description}
             - <button id="delete-thing" data-id="${thing.id}">Remove</button>
            </li>
            <br>
            `
        }
        )
        attachClicksToLinks()
        attachClicksToButtons()
        document.getElementById('delete-bucket').addEventListener('click', removeBucket)
        document.getElementById('thing-form').addEventListener('click', displayCreateThingForm)
    })
}

function removeBucket(e) {
    let configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + `/buckets/${e.target.dataset.id}`, configObj)
    .then(() => {
        getBuckets()}
    )
}

function removeThing(e) {
    let bucketI = e.target.dataset.bucketNum
    let configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + `/things/${e.target.dataset.id}`, configObj)
    .then(() => {
        displayBucket(bucketI)
       
    })

}

function displayCreateThingForm(e) {
    let bucketId = e.target.dataset.id
    let formDivT = document.querySelector('div#thing-form')
    let htmlT = `
        <br>
        <form data-id="${bucketId}">
            <label>Description:</label>
            <input type="text" id = "description">
            <input type="submit">
        </form>

        `
    formDivT.innerHTML = htmlT
   document.querySelector('form').addEventListener('submit', createThing)
}

function clearThingForm() {
    let formDiv = document.querySelector('div#thing-form')
    formDiv.innerHTML = ''
}


function createThing(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let bucketId = e.target.dataset.id
    let thing = {
        description: e.target.querySelector("#description").value,
        bucket_id: bucketId
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(thing),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(BASE_URL + `/things`, configObj)
    .then(res => res .json()) 
    .then(thing => {
        
        main.innerHTML += `
            <li>${thing.description}
            - <button id="delete-thing" data-id="${thing.id}">Remove</button>

            </li>
            </div>
            <br>
        `
        attachClicksToLinks()
        clearThingForm()
        attachClicksToButtons()
        //document.getElementById('delete-thing').addEventListener('click', removeThing)
        document.getElementById('thing-form').addEventListener('click', displayCreateThingForm) 
        }
        
    )
    
    
}


