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
  if (y.style.display === "none") {
    y.style.display = "block";
    z.style.display = "none";
  } else {
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
  console.log(dueDate);

  // Crear un objeto con los datos a enviar al servidor
  const taskData = {
    nombre: taskName,
    descripcion: taskDescription,
    fecha_entrega: dueDate,
    entregada: false,
  };

  // Hacer una solicitud POST al servidor para crear la tarea
  fetch('/tareas/tareas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
    todo.innerHTML += `
    <div class="task" id="${taskName.toLowerCase().split(" ").join("")}" draggable="true" ondragstart="drag(event)">
        <span><strong>${"Tarea: "}</strong>${taskName}<br><strong>${"Descripción: "}</strong>${taskDescription}<br><strong>${"Fecha: "}</strong>${dueDate}</span><br>
        <button onclick="formularioUpdateTask()">Editar</button>
        <button onclick="tareaCompletada()">Completar</button>
</div>
        </div>
`;
  })
  .catch(error => {
    console.error('Error al enviar la tarea al servidor:', error);
    // Manejar el error de alguna manera
  });
}

function fetchTareas() {
  return fetch('/tareas/tareas') 
    .then(response => response.json())
    .catch(error => console.error('Error al obtener tareas:', error));
}



let tareaId;
function formularioUpdateTask(id){
  var x = document.getElementById("inprogress");
  var y = document.getElementById("done");
  var z = document.getElementById("update-new-task-block");
  
  
  if (y.style.display === "none") {
    y.style.display = "block";
    z.style.display = "none";
  } else {
    y.style.display = "none";
    z.style.display = "flex";
  }

  tareaId = id;

  fetchTareasPorID(id).then(tarea => {

    const id = tarea.id;
    const nombre = tarea.nombre;
    const descripcion = tarea.descripcion;
    const fecha = tarea.fecha_entrega;



  document.getElementById("task-name-update").value = nombre;
  document.getElementById("task-description-update").value = descripcion;
  document.getElementById("due-date-update").value = fecha;

  });
}

function cancelarAccion(){
  var x = document.getElementById("inprogress");
  var y = document.getElementById("done");
  var z = document.getElementById("update-new-task-block");
  
  
  if (y.style.display === "none") {
    y.style.display = "block";
    z.style.display = "none";
  } else {
    y.style.display = "none";
    z.style.display = "flex";
  }
}

function editTask() {

  const id = tareaId;
  fetchTareasPorID(id).then(tarea => {

    const id = tarea.id;
    const nombre = tarea.nombre;
    const descripcion = tarea.descripcion;
    const fecha_vencimiento = tarea.fecha_entrega;
    
  const nuevoNombre = document.getElementById("task-name-update").value;
  const nuevaDescripcion = document.getElementById("task-description-update").value;
  const nuevaFechaVencimiento = document.getElementById("due-date-update").value;
  const nuevoEstado = document.getElementById("task-status-update").value;



const taskData = {
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion,
      fecha_entrega: nuevaFechaVencimiento,
      entregada: false,
    };

    // Hacer una solicitud POST al servidor para actualizar la tarea
  fetch(`/tareas/tareas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })
  });
  limpiarBloque();
  cargarTareas();
}




function limpiarBloque(){
  todo.innerHTML = "";
}



function fetchTareasPorID(id) {
  return fetch(`/tareas/tareas/${id}`)
    .then(response => response.json())
    .catch(error => console.error('Error al obtener la informacion de la tarea:', error));
}




function tareaCompletada(id) {
  
  fetchTareasPorID(id).then(tarea => {

    const id = tarea.id;
    const nombre = tarea.nombre;
    const descripcion = tarea.descripcion;
    const fecha_vencimiento = tarea.fecha_entrega;

    
  const nuevoNombre = nombre;
  const nuevaDescripcion = descripcion;
  const nuevaFechaVencimiento = fecha_vencimiento;



const taskData = {
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion,
      fecha_entrega: nuevaFechaVencimiento,
      entregada: true,
    };

    // Hacer una solicitud POST al servidor para actualizar la tarea
  fetch(`/tareas/tareas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })
  });
  limpiarBloque();
  cargarTareas();
}


let optionsVisible = false;

function showOptions(task) {

  let options = task.parentNode.querySelector(".options-menu");

  if (options.innerHTML === "") {
    options.innerHTML = `
        <button onclick="formularioUpdateTask()">Editar</button>
        <button onclick="tareaCompletada()" >Completar</button>
      `;
  } else {
    options.innerHTML = "";
  }

}
function cargarTareas() {
  var todo = document.getElementById("todo");


  // Realizar la solicitud para obtener las tareas
  fetchTareas().then(tareas => {

    // Iterar sobre las tareas y agregarlas al contenedor
    tareas.forEach(tarea => {
      if (tarea.entregada != 1) {

        const id = tarea.id;
        const nombre = tarea.nombre;
        const descripcion = tarea.descripcion;
        const fecha_vencimiento = tarea.fecha_entrega;
        todo.innerHTML += `
          <div class="task" id="${tarea.id}" draggable="true" ondragstart="drag(event)">
          <span>
          <strong>Id:</strong> ${id}<br>
            <strong>Tarea:</strong> ${nombre}<br>
            <strong>Descripción:</strong> ${descripcion}<br>
            <strong>Fecha:</strong> ${fecha_vencimiento}
          </span><br>
          <button onclick="formularioUpdateTask(${id})">Editar</button>
        <button onclick="tareaCompletada(${id})">Completar</button>
  </div>
          `;
      }

    });
  });
}

// Llamada a cargarTareas al cargar la página
document.addEventListener('DOMContentLoaded', cargarTareas);