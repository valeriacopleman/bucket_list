class Thing {

    constructor(data){
        this.id = data.id 
        this.description = data.description
        this.bucket_id = data.bucket_id
    }

    renderThing() {
        return `
        <li >${this.description}
         - <button class="delete-thing" data-bid="${this.bucket_id}"data-id="${this.id}">Remove</button>
        </li>
        <br>
        `  
    }
}
