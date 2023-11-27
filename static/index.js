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

function createTask() {
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

function saveTask() {
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
        <span class="options" onclick="showOptions(this)">°°°</span>
        <div class="options-menu"></div>
  <div id="options"></div>
</div>
        </div>
`;

}

function editTask() {
  var saveButton = document.getElementById("save-button");
  var editButton = document.getElementById("edit-button");
  if (saveButton.style.display === "none") {
    saveButton.style.display = "block";
    editButton.style.display = "none";
  } else {
    saveButton.style.display = "none";
    editButton.style.display = "block";
  }
}


function fetchTareas() {
  return fetch('/tareas/tareas') // Ajusta la ruta según tu configuración
    .then(response => response.json())
    .catch(error => console.error('Error al obtener tareas:', error));
}

function cargarTareas() {
  var todo = document.getElementById("todo");


  // Realizar la solicitud para obtener las tareas
  fetchTareas().then(tareas => {

    // Iterar sobre las tareas y agregarlas al contenedor
    tareas.forEach(tarea => {
      if (tarea.entregada != 1) {

        const nombre = tarea.nombre;
        const descripcion = tarea.descripcion;
        const fecha_vencimiento = tarea.fecha_entrega;
        todo.innerHTML += `
          <div class="task" id="${tarea.id}" draggable="true" ondragstart="drag(event)">
          <span>
            <strong>Tarea:</strong> ${nombre}<br>
            <strong>Descripción:</strong> ${descripcion}<br>
            <strong>Fecha:</strong> ${fecha_vencimiento}
          </span><br>
          <span class="options" onclick="showOptions(this)">°°°</span>
          <div class="options-menu"></div>
    <div id="options"></div>
  </div>
          `;
      }

    });
  });
}

// Llamada a cargarTareas al cargar la página
document.addEventListener('DOMContentLoaded', cargarTareas);

let optionsVisible = false;

function showOptions(task) {

  let options = task.parentNode.querySelector(".options-menu");

  if (options.innerHTML === "") {
    options.innerHTML = `
        <button onclick="editTask(this)">Editar</button>
        <button>Completar</button>
      `;
  } else {
    options.innerHTML = "";
  }

}
