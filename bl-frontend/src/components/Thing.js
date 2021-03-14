class Thing {

    constructor(data){
        this.id = data.id 
        this.description = data.description
        this.bucket_id = data.bucket_id
    }

    renderThing() {
        return `
        <li >${this.description}
         - <span class="w3-button w3-black"><a class="delete-thing" data-bid="${this.bucket_id}" data-id="${this.id}">x</a></span>
        </li>
        <br>
        `  
    }
}
