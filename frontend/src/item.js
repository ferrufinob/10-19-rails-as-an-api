// build out an Item class


// the html we want to put on the dom for each item 
// attach event listeners particular to each item 

class Item{

    static all = []
    static container = document.getElementById('item-list')

    constructor({id, name, description, price, category_id}){
        // setting the properties of each item
        this.name = name 
        this.price = price 
        this.description = description
        this.id = id 

        // setup the html element that will contain the item
        this.element = document.createElement('li')
        this.element.dataset["id"] = id
        this.element.id = `item-${id}`
        
        this.element.addEventListener('click', this.handleLiClick)

        // remembering all the items 
        Item.all.push(this)
    }

    // arrow function b/c it is used as a callback in an event listener
    handleLiClick = (e) => {
        if(e.target.innerText === "Edit"){
            console.log("edit")
        } else if (e.target.innerText === "Delete"){
            deleteItem(e)
        }
    }

    render(){
        this.element.innerHTML = `
            <div data-id="${this.id}">
                $<span class="price">${this.price}</span>
                <strong class="name">${this.name}</strong>:
                <span class="description">${this.description}</span> 
            </div>
            <button class="edit" data-id="${this.id}">Edit</button>
            <button class="delete" data-id="${this.id}">Delete</button>
        `
        return this.element
    }

    attachToDom(){
        this.render()
        Item.container.appendChild(this.element)
        // Item.container.appendChild(this.render())
    }
    
    
    
   
}