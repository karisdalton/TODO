// Get required elements from HTML
const clear = document.querySelector('.clear');
const dateElement = document.getElementById("date");
const list = document.getElementById('list');
const input = document.getElementById('input');

// add fontawesome and css classes
const CHECK = "fa-check-circle";
const UNCHECK = 'fa-circle';
const LINE_THROUGH = 'lineThrough';

let LIST = [];
let id = 0;

// add toDo function
function addToDo(toDo, id, done, trash) {
    
    if (trash) {
        return;
    }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    // if todo is complete add done variable else line
    const text = `
    <li class="item">
        <i class="fas ${DONE} complete" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fas fa-edit edit" job="edit" id="${id}"></i>
        <i class="fas fa-trash-alt delete" job="delete" id="${id}"></i>
    </li>
    `;
    
    const position = 'beforeend';
    
    // add list to HTML
    list.insertAdjacentHTML(position, text);
}

// toggle TODOs
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove TODO
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// edit toDo
function editToDO(element) {
    let editinput = element.previousElementSibling.innerHTML;

    input.value = editinput;
}

list.addEventListener('click', (e) => {
    let element = e.target;
    const elementJOB = e.target.attributes.job.value;
    
    if (elementJOB == 'complete') {
        completeToDo(element);
    } else if (elementJOB == 'delete') {
        removeToDo(element);
    } else if (elementJOB == 'edit') {
        editToDO(element);
    }
    
    // update local storage
    localStorage.setItem('TODO', JSON.stringify(LIST));
});


// enter key event listener 
document.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        const toDo = input.value;
        
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
                );
                localStorage.setItem('TODO', JSON.stringify(LIST));
                id++;
            }
            input.value = ""; 
        }
    });
    
    // clear local storage
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

// todays date
let today = new Date();
let options = { weekday: 'long', month: 'short', day: 'numeric' };
dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// Local storage
let data = localStorage.getItem('TODO');

if (data) {
    LIST = JSON.parse(data);
    loadToDo(LIST);
    id = LIST.length;
} else {
    LIST = [];
    id = 0;
}

function loadToDo(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
});
}

    
    
    
    