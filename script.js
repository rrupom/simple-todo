// defining UI Elements

let form = document.querySelector('#form');
let newtask = document.querySelector('#new_task');
let filter = document.querySelector('#filter');
let tasklist = document.querySelector('#tasklist');
let cleartasks = document.querySelector('#cleartasks');

// Add Event Listener
form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask);
filter.addEventListener('keyup', filterTask);
cleartasks.addEventListener('click', clearAllTask);
document.addEventListener("DOMContentLoaded", getTasks);

// function that clear all tasks from takslist
function clearAllTask() {
    if (confirm("Are you want to delete all tasks")) {
        tasklist.innerHTML = "";
    }

    // alternative
    // while (tasklist.firstChild) {
    //     tasklist.remove(tasklist.firstChild);
    // }

    // clear from loal storage
    localStorage.clear();
}

// task filter
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(function (task) {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

// removeTask
function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove(); // delete parent element
            removeFromLS(ele);
        }
    }
}

function removeFromLS(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    let li = task;

    li.removeChild(li.lastChild);

    tasks.forEach(function (item, index) {
        if (li.textContent.trim() == item) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// addinf Task in the list
function addTask(e) {
    e.preventDefault();
    if (newtask.value === '') {
        alert('Add a task!')
    }
    else {
        // creating list item
        let li = document.createElement('li');
        // create text node
        li.appendChild(document.createTextNode(newtask.value + ' '));

        // create a node
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);
        tasklist.appendChild(li);
        storeTaskInLocalStorage(newtask.value);
        newtask.value = '';
    }
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {

        // same process of ad task method
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);
        tasklist.appendChild(li);
    });
}
