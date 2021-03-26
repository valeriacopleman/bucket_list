const apiService = new ApiService() 
let main = document.getElementById('main')
init() 
function init() {
  bindEventListener()
  renderBuckets()
}

function bindEventListener() {
  document.getElementById('buckets').addEventListener('click', renderBuckets)
  document.querySelector('form').addEventListener('submit', searchLetter)
}

function bucketEventListeners() {
  let buckets = document.querySelectorAll("li a:first-child")
  buckets.forEach(bucket => { 
    bucket.addEventListener('click', displayBucket)
  })

  let buttons = document.querySelectorAll(".delete-bucket")
  buttons.forEach(btn => {
    btn.addEventListener('click', removeBucket)
  })

  document.getElementById('bucket-form').addEventListener('click', displayCreateBucketForm)
}

function thingsEventListeners() {
  let things = document.querySelectorAll(".delete-thing")
  things.forEach(thing => {
    thing.addEventListener('click', removeThing)
  })

  document.getElementById('thing-form').addEventListener('click', displayCreateThingForm)
}

async function renderBuckets() {
  const bucketData = await apiService.fetchBuckets()
  console.log(2)
  main.innerHTML = ""
  main.innerHTML += `
    <a href="#" id="bucket-form">+Create a Bucket List</a>
    <div id="bucket-form"></div>
    <br>`
  bucketData.map(bucket => {
    const newBucket = new Bucket(bucket)
    main.innerHTML += newBucket.renderList()
  })
  bucketEventListeners()
}

function displayCreateBucketForm() {
  let formDiv = document.querySelector('div#bucket-form')
  formDiv.innerHTML = `
    <br>
    <form>
      <label>Name:</label>
      <input type="text" id = "name">
      <input type="submit">
    </form>`
  document.querySelector('form').addEventListener('submit', createBucket)
}

function clearForm() {
  let formDiv = document.querySelector('div#bucket-form')
  formDiv.innerHTML = ''
}

async function createBucket(e) {
  e.preventDefault()
  let bucket = {
    name: e.target.querySelector("#name").value
  }
  let data = await apiService.fetchCreateBucket(bucket)
  let newBucket = new Bucket(data)
  main.innerHTML += newBucket.renderList()
  bucketEventListeners()
  clearForm()
}

async function displayBucket(e) {
  let id = e.target.dataset.id
  const data = await apiService.fetchBucket(id)
  const bucket = new Bucket(data)
  main.innerHTML = bucket.renderBucket()
  bucket.things.forEach( thing => {
    const newThing = new Thing(thing)
    main.innerHTML += newThing.renderThing()
  })
  thingsEventListeners()
}

async function removeBucket(e) {
  let id = e.target.parentElement.dataset.id
  const data = await apiService.fetchRemoveBucket(id)
  .then(data => {
      renderBuckets()
  })
}

async function removeThing(e) {
  let bid = e.target.parentElement.dataset.bid
  let id = e.target.parentElement.dataset.id
  await apiService.fetchRemoveThing(id)
  const data = await apiService.fetchBucket(bid)
  const bucket = new Bucket(data)
  main.innerHTML = bucket.renderBucket()
  bucket.things.forEach( list => {
    const newList = new Thing(list)
    main.innerHTML += newList.renderThing() 
  })
  thingsEventListeners()
}

function displayCreateThingForm(e) {
  let bucketId = e.target.dataset.id
  let formDivT = document.querySelector('div#thing-form')
  formDivT.innerHTML = `
    <br>
    <form data-id="${bucketId}">
      <label>Description:</label>
      <input type="text" id = "description">
      <input type="submit">
    </form>`
   document.querySelector('form').addEventListener('submit', createThing)
}

function clearThingForm() {
  let formDiv = document.querySelector('div#thing-form')
  formDiv.innerHTML = ''
}

async function createThing(e) {
  e.preventDefault()
  let bucketId = e.target.dataset.id
  let thing = {
    description: e.target.querySelector("#description").value,
    bucket_id: bucketId
  }
  let data = await apiService.fetchCreateThing(thing)
  let newThing = new Thing(data)
  main.innerHTML += newThing.renderThing()
  clearThingForm()
  thingsEventListeners()
}


async function searchLetter(e) {

    const searchString = e.target.a.value
    const bucketData = await apiService.fetchBuckets()
 
    const found = bucketData.filter(bucket => bucket.name.toLowerCase().includes(searchString))
    
    found.map(bucket => {
      const newBucket = new Bucket(bucket)
      document.querySelector('div#searchEng').innerHTML += newBucket.renderList()
    })
  

    
 
}