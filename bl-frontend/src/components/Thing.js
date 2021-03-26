class Thing {

    constructor(data){
        this.id = data.id 
        this.description = data.description
        this.bucket_id = data.bucket_id
    }

    renderThing() {
        return `
        <li >${this.description}
         - <a class="delete-thing" data-bid="${this.bucket_id}" data-id="${this.id}"><span class="w3-button w3-black">x</span></a>
        </li>
        <br>
        `  
    }
}
