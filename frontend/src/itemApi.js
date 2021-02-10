class ItemApi{

    static baseURL = 'http://localhost:3000/items/'

    static sanatizeResp = (json) => {
        return {id: json.id, ...json.attributes}
    }
    
    static fetchItems = () => {
        fetch(this.baseURL)
        .then(res => res.json())
        .then(json => {
            json.data.forEach(i => {
                const item = new Item(ItemApi.sanatizeResp(i))
                item.addToDom()
            })
        })
    }

    static sendPatch(item){
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
       
    
        // pessimistic rendering 
        fetch(this.baseURL + item.id, configObj)
        .then(r => r.json())
        .then(json => {
            // use this json data to update the innerHTML of that div
            
            item.render()
        })
    }
}