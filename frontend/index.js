// make a fetch request to the '/items' and display items on the DOM
const list = document.getElementById('item-list')
const form = document.getElementById('item-form')
const priceInput = document.getElementById('item-price')
const nameInput = document.getElementById('item-name')
const descriptionInput = document.getElementById('item-description')
const sortBtn = document.getElementById('sort')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
   e.preventDefault()

   //make our params hash
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
   fetch("http://localhost:3000/items", configObj)
    .then(r => r.json())
    .then(json => renderItem(json.data))
}

// function getItems(){
//     fetch('http://localhost:3000/items')
//     // .then(function(r){
//     //     return r.json()
//     // })   // this is the same as the .then on line 8
//     .then(r => r.json())
//     .then(renderItems)

// }



// function renderItems(arg){
//     const items = arg["data"]
//     items.forEach(element => {
//         renderItem(element)
//     })
// }

function renderLiHTML(li, item){
    li.innerHTML = `
        <div data-id="${item.id}">
            $<span class="price">${item.attributes.price}</span>
            <strong class="name">${item.attributes.name}</strong>:
            <span class="description">${item.attributes.description}</span> 
        </div>
        <button class="edit" data-id="${item.id}">Edit</button>
        <button class="delete" data-id="${item.id}">Delete</button>
    `
}

function renderItem(item){
    const li = document.createElement('li')
    li.dataset["id"] = item.id
    li.id = `item-${item.id}`
    renderLiHTML(li, item)
    list.appendChild(li)
    li.addEventListener('click', handleLiClick)
    
    // const deleteBtn = li.querySelector('.delete')
    // deleteBtn.addEventListener('click', deleteItem)

}

// function handleLiClick(e){
//     if(e.target.innerText === "Edit"){
//          // change the button from edit to save
//          e.target.innerText = "Save"
//          // replace the div with different input tags 
//          createEditFields(e.target)
//     } else if (e.target.innerText === "Delete"){
//         deleteItem(e)
//     } else if(e.target.innerText === "Save"){
//         e.target.innerText = "Edit"
//         // save this info to the DB
//         // turn all input fields back into spans
//         saveUpdatedItem(e.target)
//     }
// }

// function saveUpdatedItem(saveBtn){
//     const li = saveBtn.parentElement
//     const id = li.dataset.id
//     const priceInput = li.querySelector(".edit-price")
//     const nameInput = li.querySelector(".edit-name")
//     const descriptionInput = li.querySelector(".edit-description")
   
//     // get ready to send a patch request 
//     // config object 
//     // data that we want to send
//     //make our params hash
//    const itemInfo = {
//         price:  priceInput.value,
//         name: nameInput.value,
//         description: descriptionInput.value
//     }

//     const configObj = {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         body: JSON.stringify(itemInfo)
//     }

//     // pessimistic rendering 
//     fetch(`http://localhost:3000/items/${id}`, configObj)
//     .then(r => r.json())
//     .then(json => {
//         // use this json data to update the innerHTML of that div
//         renderLiHTML(li, json.data)
//     })
// }

function createEditFields(editBtn){
    const li = editBtn.parentElement
    const div = editBtn.parentElement.children[0]

    for(const e of div.children){
        let inputValue = e.innerText
        let name = e.classList[0]
        e.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}">`
    }
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
        .then(json => {
            debugger
            alert(json.message)
        })

}

// add event listerner 
// submit a fetch request to delete 
// .remove() it from the DOM



// getItems()
ItemApi.fetchItems()

sortBtn.addEventListener('click', Item.sort)