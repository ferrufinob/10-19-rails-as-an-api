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
            price:  priceInput.value,
            name: nameInput.value,
            description: descriptionInput.value
       }
    
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
            const i = new Item({id: json.data.id, ...json.data.attributes})
            i.attachToDom()
        })
    }
}

