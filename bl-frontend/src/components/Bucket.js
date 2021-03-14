class Bucket {

    constructor(data){
        this.id = data.id 
        this.name = data.name 
        this.things = data.things
    }

    renderList() {
        return `
        <li>
            <a href="#" data-id="${this.id}">${this.name}</a>
            - <span class="w3-button w3-black"><a class="delete-bucket" data-id="${this.id}">x</a></span>
        </li>
        <br>
        `
    }

    renderBucket() {
        return `
        <div class="w3-row w3-padding w3-black">
            
                <span class="w3-tag">${this.name}</span>
            
        </div>
       
        <br>
        <a href="#" id="thing-form" data-id="${this.id}">+Add to List</a>
        <div id="thing-form"></div>
        <br>
        `
    }
}   