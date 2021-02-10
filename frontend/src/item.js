class Item{
 
    static all = []

    constructor({name, description, price, category_id, id}){
        this.name = name 
        this.description = description 
        this.price = price 
        this.id = id 
        this.category_id = category_id 

        this.element = document.createElement('li')
        this.element.dataset["id"] = id
        this.addListeners()
        Item.all.push(this)
    }

    addListeners = () => {
        this.element.addEventListener('click', this.handleLiClick)
    }

    handleLiClick = (e) => {
        if(e.target.innerText === "Edit"){
             // change the button from edit to save
             e.target.innerText = "Save"
             // replace the div with different input tags 
             createEditFields(e.target)
        } else if (e.target.innerText === "Delete"){
            deleteItem(e)
        } else if(e.target.innerText === "Save"){
            e.target.innerText = "Edit"
            // save this info to the DB
            // turn all input fields back into spans
            this.saveUpdatedItem()
        }
    }

    saveUpdatedItem = () => {
        this.price = this.element.querySelector(".edit-price").value
        this.name = this.element.querySelector(".edit-name").value
        this.description = this.element.querySelector(".edit-description").value
    
       ItemApi.sendPatch(this)
    }



    static sort = () => {
        const sorted = Item.all.sort((a,b) =>{
            return  b.price - a.price
        })
        list.innerHTML = ""
        sorted.forEach (i => i.addToDom())
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

    addToDom = () => {
        list.append(this.render())
        
    }
}