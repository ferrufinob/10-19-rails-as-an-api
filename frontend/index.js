// make a fetch request to the '/items' and display items on the DOM
const port = 'http://localhost:3000'
const itemApi =  new ItemApi(port)
const categoryApi = new CategoryApi(port)
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


itemApi.getItems()
categoryApi.getCategories()