const BASE_URL = 'http://localhost:3000'

const apiService = new ApiService() 
let main = document.getElementById('main')

const init = () => {
    bindEventListener()
    renderBuckets()
}

function bindEventListener() {
    document.getElementById('buckets').addEventListener('click', renderBuckets)
}

async function renderBuckets() {
    const buckets = await apiService.fetchBuckets()
    main.innerHTML = ""
    main.innerHTML += `
            <a href="#" id="bucket-form">+Create a Bucket List</a>
            <div id="bucket-form"></div>
            <br>
            `
    buckets.map(bucket => {
        const newBucket = new Bucket(bucket)
        main.innerHTML += newBucket.render()
    })
    document.getElementById('bucket-form').addEventListener('click', displayCreateBucketForm)
    attachClicksToLinks()
}

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

async function createBucket(e) {
    e.preventDefault()
    let main = document.getElementById('main')
    let bucket = {
        name: e.target.querySelector("#name").value
    }
    let data = await apiService.fetchCreateBucket(bucket)
    let newBucket = new Bucket(data)
    main.innerHTML += newBucket.render()
    attachClicksToLinks()
    clearForm()
    document.getElementById('bucket-form').addEventListener('click', displayCreateBucketForm) 
}

function attachClicksToLinks() {
    let buckets = document.querySelectorAll("li a")
    buckets.forEach(bucket => {
        bucket.addEventListener('click', displayBucket)
    })
    let buttons = document.querySelectorAll(".delete-bucket")
    buttons.forEach(btn => {
        btn.addEventListener('click', removeBucket)
    })
}

function attachClicksToButtons() {
    let things = document.querySelectorAll(".delete-thing")
    things.forEach(thing => {
        thing.addEventListener('click', removeThing)
    })
}

async function displayBucket(e) {
    console.log(e.target)
    let id = e.target.dataset.id
    const data = await apiService.fetchBucket(id)
    const bucket = new Bucket(data)
    main.innerHTML = bucket.renderBucket()
    bucket.things.forEach( thing => {
        main.innerHTML += `
        <li >${thing.description}
         - <button class="delete-thing" data-bid="${thing.bucket_id}"data-id="${thing.id}">Remove</button>
        </li>
        <br>
        `  
    })
    attachClicksToButtons()
    document.getElementById('thing-form').addEventListener('click', displayCreateThingForm)

}

async function removeBucket(e) {
    let id = e.target.dataset.id
    const data = await apiService.fetchRemoveBucket(id)
    .then(data => {
        renderBuckets()
    })
}

async function removeThing(e) {
    let bid = e.target.dataset.bid
    let id = e.target.dataset.id
    
    const data = await apiService.fetchRemoveThing(id)
    const dat = await apiService.fetchBucket(bid)
    const bucket = new Bucket(dat)
    main.innerHTML = bucket.renderBucket()
    bucket.things.forEach( thing => {
        main.innerHTML += `
        <li >${thing.description}
         - <button class="delete-thing" data-bid="${thing.bucket_id}"data-id="${thing.id}">Remove</button>
        </li>
        <br>
        `  
    })
    attachClicksToButtons()
    document.getElementById('thing-form').addEventListener('click', displayCreateThingForm)
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
            - <button class="delete-thing" data-bid="${thing.bucket_id}" data-id="${thing.id}">Remove</button>
            </li>
            <br>
        `
        clearThingForm()
        attachClicksToButtons()
        document.getElementById('thing-form').addEventListener('click', displayCreateThingForm) 
        } 
    )
}


init() 

