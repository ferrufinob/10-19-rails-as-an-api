// make a fetch request to the '/items' and display items on the DOM
const port = 'http://localhost:3000'
const itemApi =  new ItemApi(port)
const list = document.getElementById('item-list')
const form = document.getElementById('item-form')
const priceInput = document.getElementById('item-price')
const nameInput = document.getElementById('item-name')
const descriptionInput = document.getElementById('item-description')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
   e.preventDefault()
   itemApi.createItem()
   e.target.reset()
}

//optomistic rendering
function deleteItem(e){
    e.target.parentElement.remove() // remove it before the fetch request 
    const id = e.target.dataset.id 

    const configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }
    
    fetch(`http://localhost:3000/items/${id}`, configObj)
        .then(r => r.json())
        .then(json => alert(json.message))

}

// add event listerner 
// submit a fetch request to delete 
// .remove() it from the DOM



itemApi.getItems()