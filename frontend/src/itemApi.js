// handle all fetch requests for the items 

class ItemApi {

    constructor(port){
        this.baseUrl = `${port}/items`
    }
        

    getItems(){
        fetch(this.baseUrl)
        .then(r => r.json())
        .then( json => {
            json["data"].forEach(element => {
                const i = new Item({id: element.id, ...element.attributes})
                i.attachToDom()
            })
        })
    }

    createItem(){

        const itemInfo = {
            item: {
                price:  priceInput.value,
                name: nameInput.value,
                description: descriptionInput.value,
                // category_id: dropdown.value
                category_name: catNameInput.value
            } 
       }
       console.log(itemInfo)
       const configObj = {
           method: 'POST',
           headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
           },
           body: JSON.stringify(itemInfo)
       }
      
       // pessimistic rendering 
       fetch(this.baseUrl, configObj)
        .then(r => r.json())
        .then(json => {
            // renderItem(json.data)
            debugger
            const i = new Item({id: json.data.id, ...json.data.attributes})
            i.attachToDom()
          
       
           if(!Category.all.find((c) => c.id == i.categoryId)){
               let catObj = new Category({id: i.categoryId, name: json.data.attributes.category_name})
               catObj.addToDom()
               catObj.addToDropDown()
            }
        })
    }

    sendPatch = (item) => {
        debugger
        let {price, name, description} = item
        const itemInfo = {
            price,
            name,
            description
        }

        const configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(itemInfo)
        }
       
        fetch(`${this.baseUrl}/${item.id}`, configObj)
        .then(r => r.json())
        .then(json => {
            // we are optomistically rendering here since we don't use the json response
            item.render()
        })
    }

    deleteItem = (id) => {
        const configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }
        
        fetch(`${this.baseUrl}/${id}`, configObj)
            .then(r => r.json())
            .then(json => alert(json.message))
    }
}

