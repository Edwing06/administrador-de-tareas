function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));
}

function createTask(){
    var x = document.getElementById("inprogress");
    var y = document.getElementById("done");
    var z = document.getElementById("create-new-task-block");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "flex";
    }
}

function saveTask(){
    var todo = document.getElementById("todo");
    var taskName = document.getElementById("task-name").value;
    var taskDescription = document.getElementById("task-description").value;
    var estado = document.getElementById("task-status").value;
    const dueDate = document.getElementById('due-date').value;
    console.log(taskName);
    console.log(taskDescription);
    console.log(estado);


    

    todo.innerHTML += `
    <div class="task" id="${taskName.toLowerCase().split(" ").join("")}" draggable="true" ondragstart="drag(event)">
    
        <span><strong>${"Tarea: "}</strong>${taskName}<br><strong>${"Descripción: "}</strong>${taskDescription}<br><strong>${"Fecha: "}</strong>${dueDate}</span><br>
        <input type="checkbox" onChange="completeTask(this)">
        
    </div>
    `
    
}

function editTask(){
    var saveButton = document.getElementById("save-button");
    var editButton = document.getElementById("edit-button");
    if (saveButton.style.display === "none") {
        saveButton.style.display = "block";
        editButton.style.display = "none";
    } else{
        saveButton.style.display = "none";
        editButton.style.display = "block";
    }
}


  function completeTask(checkbox) {

    if(checkbox.checked) {
      checkbox.parentElement.remove();
    }
  
  }