class CategoryApi {

    constructor(port){
        this.baseUrl = `${port}/categories`
    }
        

    getCategories(){
        fetch(this.baseUrl)
        .then(r => r.json())
        .then( json => {
            json["data"].forEach(element => {
                const c = new Category({id: element.id, ...element.attributes})
                c.addToDom()
                c.addToDropDown()
            })
        })
    }
}