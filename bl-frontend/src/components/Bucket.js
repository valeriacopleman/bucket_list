class Bucket {
    constructor(data){
        this.id = data.id 
        this.name = data.name 
        this.things = data.things
    }

    render() {
        return `
        <li>
            <a href="#" data-id="${this.id}">${this.name}</a>
            - <button class="delete-bucket" data-id="${this.id}">Delete List</button>
        </li>
        <br>
        `
    }

    renderBucket() {
        return `
        <h3>${this.name}:</h3>
        
        <br>
        <a href="#" id="thing-form" data-id="${this.id}">+Add to List</a>
        <div id="thing-form"></div>
        <br>
        `
    }
}   