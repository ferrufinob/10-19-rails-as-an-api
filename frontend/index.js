// make a fetch request to the '/items' and display items on the DOM
const list = document.getElementById("item-list");
const form = document.getElementById("item-form");
const priceInput = document.getElementById("item-price");
const nameInput = document.getElementById("item-name");
const descriptionInput = document.getElementById("item-description");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  //make our params hash
  const itemInfo = {
    price: priceInput.value,
    name: nameInput.value,
    description: descriptionInput.value,
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(itemInfo),
  };

  // pessimistic rendering

  fetch("http://localhost:3000/items", configObj)
    .then((r) => r.json())
    .then((json) => {
      renderItem(json.data);
    });
  form.reset();
}

function getItems() {
  fetch("http://localhost:3000/items")
    // .then(function(r){
    //     return r.json()
    // })   // this is the same as the .then on line 8
    .then((r) => r.json())
    .then(renderItems);
}

function renderItems(arg) {
  const items = arg["data"];
  items.forEach((element) => {
    renderItem(element);
  });
}

function renderItem(item) {
  const li = document.createElement("li");
  li.dataset["id"] = item.id;
  li.id = `item-${item.id}`;
  renderLiHTML(li, item);
  list.appendChild(li);
  li.addEventListener("click", handleLiClick);

  // const deleteBtn = li.querySelector('.delete')
  // deleteBtn.addEventListener('click', deleteItem)
}

function handleLiClick(e) {
  if (e.target.innerText === "Edit") {
    //chnage the button from edit to save
    e.target.innerText = "Save";
    //replace the div with different input tags
    // createEditFields(e.target);
    createEditFields(e.target);
  } else if (e.target.innerText === "Delete") {
    deleteItem(e);
  } else if (e.target.innerText === "Save") {
    e.target.innerText = "Edit";
    // save this info to DB
    //turn all input fields back into spans
    saveUpdatedItem(e.target);
  }
}

function renderLiHTML(li, item) {
  li.innerHTML = `
        <div data-id="${item.id}">
            $<span class="price">${item.attributes.price}</span>
            <strong class="name">${item.attributes.name}</strong>:
            <span class="description">${item.attributes.description}</span> 
        </div>
        <button class="edit" data-id="${item.id}">Edit</button>
        <button class="delete" data-id="${item.id}">Delete</button>
    `;
}

function saveUpdatedItem(saveBtn) {
  const li = saveBtn.parentElement;
  const priceInput = li.querySelector(".edit-price");
  const nameInput = li.querySelector(".edit-name");
  const descriptionInput = li.querySelector(".edit-description");
  const id = li.dataset.id;

  //get ready to send a patch request
  //config object
  //data that we  want to send
  let itemObj = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
  };
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
    },
    body: JSON.stringify(itemObj),
  };
  fetch(`http://localhost:3000/items/${id}`, configObj)
    .then((res) => res.json())
    .then((json) => {
      //use this data to update the innerHTML of that div
      renderLiHTML(li, json.data);
    });
  //remove form
}

function createEditFields(editBnt) {
  const li = editBnt.parentElement;
  const div = li.querySelector("div");

  for (const prop of div.children) {
    let inputValue = prop.innerText;
    let name = prop.classList[0];
    prop.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}">`;
  }
}

// CHARLOTTES CODE //

// function editItem(e) {
//   let id = e.target.dataset.id;
//   let item = document.querySelector(`#item-${id}`);
//   let name = item.querySelector(".name").innerText;
//   let price = item.querySelector(".price").innerText;
//   let description = item.querySelector(".description").innerText;
//   let updateForm = `<input name="name" id=${id} value=${name}>
//   <input name="price" id=${id} value=${price}>
//   <input name="description", id=${id} value=${description}>
//    <button class="save" data-id="${id}">Save</button>`;
//   let div = document.createElement("div");
//   div.id = `${item.id}`;
//   div.innerHTML = updateForm;
//   item.append(div);
//   let save = document.querySelector(".save");
//   save.addEventListener("click", sendPatchRequest(item.id));
// }

// function sendPatchRequest(itemId) {
//   const updateItemPrice = document.getElementById(`update-price-${itemId}`);
//   const updateItemDescription = document.getElementById(
//     `update-description-${itemId}`
//   );
//   const updateItemName = document.getElementById(`update-name-${itemId}`);
//   let itemObj = {
//     name: updateItemName.value,
//     description: updateItemDescription.value,
//     price: updateItemPrice.value,
//   };
//   let configObj = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accepts: "application/json",
//     },
//     body: JSON.stringify(itemObj),
//   };
//   fetch(`http://localhost:3000/items/${itemId}`, configObj)
//     .then((res) => res.json())
//     .then((response) => updateItemOnDom(response.data));
//   //remove form
//   let form = document.getElementById(`update-form-${itemId}`);
//   form.remove();
// }

//optomistic rendering
function deleteItem(e) {
  e.target.parentElement.remove(); // remove it before the fetch request
  const id = e.target.dataset.id;

  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  fetch(`http://localhost:3000/items/${id}`, configObj)
    .then((r) => r.json())
    .then((json) => alert(json.message));
}

// add event listerner
// submit a fetch request to delete
// .remove() it from the DOM

getItems();
