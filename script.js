const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const itemClear = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
const submitFormButton = itemForm.querySelector('button')
let isEditMode = false

// Functions to add items to DOM and Local Storage: "CREATE"

function onAddItemSubmit (e) {
    e.preventDefault();
    const newItem = itemInput.value

    if (newItem === ''){
        alert('Please enter an item')
        return;
    }

    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if(checkIfItemExist(newItem)){
            console.log('already exist')
            alert('Item already exist!');
            return;
        }
    }

    // Create the list item and add it to the DOM
    addItemToDOM(newItem)

    // Add Item to local storage 
    addItemToStorage(newItem)

    resetUI();
    itemInput.value = ''
}

function addItemToDOM (newItem) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)
    itemList.appendChild(li)
}

function createButton (className) {
    const button = document.createElement('button')
    button.className = className
    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-xmark'
    button.appendChild(icon)
    return button;
}

function addItemToStorage (item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to storage
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


// Getting stored items from local storage: "READ"

function getItemsFromStorage () {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null){
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function displayItems () {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item))
    resetUI();
}


function onClickItem (e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }
}

function checkIfItemExist (item) {
    const itemsFromStorage = getItemsFromStorage();
    console.log(itemsFromStorage)
    console.log(item)
    return itemsFromStorage.includes(item);
}


// Edit the item: "Update"

function setItemToEdit (item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))

    item.classList.add('edit-mode');
    submitFormButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    submitFormButton.style.color = "white"
    submitFormButton.style.backgroundColor = "#228B22"
    itemInput.value = item.textContent.trim();
}


// Deleting items from storage and DOM: "DELETE"

function removeItem (item) {
    if(confirm('Are you sure? You want to delete the item.')){
        item.remove();
        removeItemFromStorage(item.textContent)
        resetUI();
    }
}

function removeItemFromStorage (item) {
    let itemsFromStorage = getItemsFromStorage();

    // Filtering out rest of the element apart from one that is deleted
    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    // Setting the filtered array to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearAllItems() {
    if (confirm('Are you sure? You want to delete the item.')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild)
        }
    }

    // Clear from local storage
    localStorage.removeItem('items')

    resetUI();
}

function filterItems (e) {
    const item = document.querySelectorAll('li') // The li tag elements
    const text = e.target.value.toLowerCase(); // Captures the input
    item.forEach(item => {
        const itemName = item.firstChild.textContent.toLocaleLowerCase()
        // If the text types is present in the name of the existing item text then will display else not
        if(itemName.indexOf(text) !== -1){
            item.style.display = 'flex'
        }
        else{
            item.style.display = 'none'
        }
    })
}

function resetUI () {
    itemInput.value = '';
    const item = document.querySelectorAll('li')

    if(item.length === 0){
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none'
    }
    else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block'
    }
    submitFormButton.innerHTML = '<i class="fa-solid fa-plus" ></i> Add Item'
    submitFormButton.style.backgroundColor = 'black'
    submitFormButton.style.color = 'white'
    isEditMode = false
}

// Initialize App

function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem)
    itemClear.addEventListener('click', clearAllItems)
    itemFilter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)
    resetUI();
}

init();

/*
Local storage and session storage are property on Window interface and the data is
stored locally on our browser. It gets stored in key/value pair and values are in
strings. We can not store complete object, need to strigify them.
*/

// localStorage.setItem('name', 'Brad')
// console.log(localStorage.getItem('name'))
// localStorage.clear();
// sessionStorage.clear();