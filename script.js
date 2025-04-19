const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const itemClear = document.getElementById('clear')
const itemFilter = document.getElementById('filter')

function addItem (e) {
    e.preventDefault();
    const newItem = itemInput.value

    if (newItem === ''){
        alert('Please enter an item')
        return;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)
    itemList.appendChild(li)
    itemInput.value = ''
    resetUI();
}

function createButton (className) {
    const button = document.createElement('button')
    button.className = className
    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-xmark'
    button.appendChild(icon)
    return button;
}

function removeItem (e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure? You want to delete the item.')){
            e.target.parentElement.parentElement.remove();
            resetUI();
        }
    }
}

function clearAllItems() {
    if (confirm('Are you sure? You want to delete the item.')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild)
        }
    }
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
    const item = document.querySelectorAll('li')

    if(item.length === 0){
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none'
    }
    else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block'
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem)
itemClear.addEventListener('click', clearAllItems)
itemFilter.addEventListener('input', filterItems)