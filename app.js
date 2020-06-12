// Selectors
const todoInput = document.querySelector('.to-do__input');
const todoButton = document.querySelector('.to-do__button');
const todoList = document.querySelector('.to-do__list');
const filterTodo = document.querySelector('.filter__to-do');

// Event Listeners
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterTodo.addEventListener("click", filterTask);

// Functions
function addToDo(event){

    event.preventDefault();
    // create new to-do div
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("to-do");

    // create new list element
    const newToDo = document.createElement("li");
    newToDo.innerText = todoInput.value;
    newToDo.classList.add("to-do__item");

    // add the to-do list element as a child of the to-do div
    toDoDiv.appendChild(newToDo);

    //add to-do to local storage
    saveToLocalStorage(todoInput.value);

    //Check mark button
    const taskDone = document.createElement("button");
    taskDone.innerHTML = '<i class="fas fa-check"></i>';
    taskDone.classList.add("complete__btn");
    toDoDiv.appendChild(taskDone);

    //Trash button
    const trashTask = document.createElement("button");
    trashTask.innerHTML = '<i class="fas fa-trash"></i>';
    trashTask.classList.add("trash__btn");
    toDoDiv.appendChild(trashTask);

    //Append to-do div to to-do list
    todoList.appendChild(toDoDiv);

    //Clear todoInput.value
    todoInput.value = "";
}

//Delete to-do List item
function deleteCheck(e){
    const item = e.target;

    if (item.classList[0] === "trash__btn"){
        const todo = item.parentElement;

        //Animation
        todo.classList.add("fall");
        todo.addEventListener("transitioned", function(){
            todo.remove();
        })
        
    }

    if (item.classList[0] === "complete__btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTask(e){
        const todos = todoList.childNodes;
        todos.forEach(function(todo){
            switch(e.target.value){
                case "all": 
                    todo.style.display = "flex";
                    break;

                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
                
                case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
            }
        });
    
}

function saveToLocalStorage(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDo(){
    //check if local storage has to-dos
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        // create new to-do div
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("to-do");

    // create new list element
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("to-do__item");

    // add the to-do list element as a child of the to-do div
    toDoDiv.appendChild(newToDo);

    //Check mark button
    const taskDone = document.createElement("button");
    taskDone.innerHTML = '<i class="fas fa-check"></i>';
    taskDone.classList.add("complete__btn");
    toDoDiv.appendChild(taskDone);

    //Trash button
    const trashTask = document.createElement("button");
    trashTask.innerHTML = '<i class="fas fa-trash"></i>';
    trashTask.classList.add("trash__btn");
    toDoDiv.appendChild(trashTask);

    //Append to-do div to to-do list
    todoList.appendChild(toDoDiv);

    });
}

