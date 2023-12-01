function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    // Verificar si la tarea se está moviendo de un bloque a otro
    if (ev.target.classList.contains('kanban-block') ) {
        var isDelivered = ev.target.id === 'done' ? 1 : 0;

        // Obtener el contenedor actual de la tarea
        var currentContainer = draggedElement.parentNode;

        // Verificar si la tarea se está moviendo al mismo bloque
        if (ev.target !== currentContainer) {
            // Obtener los datos de la tarea desde el elemento arrastrado
            var taskId = draggedElement.dataset.tareaId;
            var taskName = draggedElement.dataset.tareaNombre;
            var taskDescription = draggedElement.dataset.tareaDescripcion;
            var dueDate = draggedElement.dataset.tareaFechaEntrega;

            // Crear un objeto con los datos de la tarea a enviar al servidor
            var taskData = {
                id: taskId,
                nombre: taskName,
                descripcion: taskDescription,
                fecha_entrega: dueDate,
                entregada: isDelivered
            };

            // Enviar solicitud al servidor solo si la tarea se mueve a otro bloque
            fetch(`/tareas/tareas/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Estado actualizado en la base de datos:', data);
                    // Actualizar la interfaz según sea necesario
                })
                .catch(error => {
                    console.error('Error al actualizar el estado en la base de datos:', error);
                    // Manejar el error de alguna manera
                });

            // Mover la tarea al contenedor destino
            ev.target.appendChild(draggedElement);
        }
    }
}




// Función para mostrar el formulario de agregar tarea
function mostrarFormulario() {
    const kanbanDone = document.getElementById('done');
    const addTaskForm = document.getElementById('addTaskForm');

    kanbanDone.style.display = 'none';
    addTaskForm.style.display = 'block';
}

// Función para ocultar el formulario de agregar tarea
function ocultarFormulario() {
    const kanbanDone = document.getElementById('done');
    const addTaskForm = document.getElementById('addTaskForm');
    
    // Limpiar los campos del formulario
    document.getElementById('taskName').value = ''; // Campo Nombre de la tarea
    document.getElementById('taskDescription').value = ''; // Campo Descripción
    document.getElementById('dueDate').value = ''; // Campo Fecha de Entrega

    kanbanDone.style.display = 'block';
    addTaskForm.style.display = 'none';
}

// Función para agregar una nueva tarea a la lista de pendientes
function agregarTarea() {
    const taskName = document.getElementById('taskName').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const dueDate = document.getElementById('dueDate').value.trim();

    // Verificar si todos los campos están completos
    if (taskName !== '' && taskDescription !== '' && dueDate !== '') {
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
                alert('La tarea fue agregada con exito');
                ocultarFormulario();
                cargarTareasYDistribuir();
            })
            .catch(error => {
                console.error('Error al enviar la tarea al servidor:', error);
                // Manejar el error de alguna manera
            });
    } else {
        alert('Por favor completa todos los campos antes de agregar la tarea.');
    }
}

// Manejadores de eventos para los botones
document.getElementById('btnAgregarTarea').addEventListener('click', mostrarFormulario);
document.getElementById('btnCancelar').addEventListener('click', ocultarFormulario);
document.getElementById('btnAceptar').addEventListener('click', agregarTarea);


/**Funciones relacionadas con rutas y base de datos */

function fetchTareas() {
    return fetch('/tareas/tareas')
      .then(response => response.json())
      .catch(error => console.error('Error al obtener tareas:', error));
  }

// Función para crear y devolver un elemento de tarea con su información
function crearElementoTarea(tarea) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.draggable = true;
    taskElement.id = tarea.id;


    // Guardar la información de la tarea como atributos de datos en el elemento
    taskElement.dataset.tareaId = tarea.id;
    taskElement.dataset.tareaNombre = tarea.nombre;
    taskElement.dataset.tareaDescripcion = tarea.descripcion;
    taskElement.dataset.tareaFechaEntrega = tarea.fecha_entrega;

    // Evento de arrastre
    taskElement.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text', tarea.id.toString()); // Establecer el ID de la tarea
    });

    // Contenido visible del elemento de tarea
    const contenidoTarea = document.createElement('div');
    contenidoTarea.innerHTML = `
        <p>ID: ${tarea.id}</p>
        <p>Nombre: ${tarea.nombre}</p>
        <p>Descripción: ${tarea.descripcion}</p>
        <p>Fecha de entrega: ${tarea.fecha_entrega}</p>
    `;

    taskElement.appendChild(contenidoTarea);

    return taskElement;
}

// Función para distribuir las tareas en los bloques 'todo' y 'done' con su información
function distribuirTareasEnBloques(tareas) {
    const todoColumn = document.getElementById('todo');
    const doneColumn = document.getElementById('done');

    // Iterar sobre las tareas obtenidas
    tareas.forEach(tarea => {
        // Crear un nuevo elemento de tarea con la información de la tarea actual
        const newTask = crearElementoTarea(tarea);

        // Determinar en qué columna colocar la tarea según su estado (pendiente o completada)
        if (tarea.entregada) {
            doneColumn.appendChild(newTask);
        } else {
            todoColumn.appendChild(newTask);
        }
    });
}

// Función para obtener las tareas del usuario y distribuirlas en los bloques al cargar la página
function cargarTareasYDistribuir() {
    const todoColumn = document.getElementById('todo');
    const doneColumn = document.getElementById('done');

    // Eliminar las tareas actuales de los bloques
    const tasksInTodo = todoColumn.getElementsByClassName('task');
    while (tasksInTodo.length > 0) {
        tasksInTodo[0].parentNode.removeChild(tasksInTodo[0]);
    }

    const tasksInDone = doneColumn.getElementsByClassName('task');
    while (tasksInDone.length > 0) {
        tasksInDone[0].parentNode.removeChild(tasksInDone[0]);
    }

    fetchTareas()
        .then(tareas => {
            distribuirTareasEnBloques(tareas);
        })
        .catch(error => console.error('Error al cargar las tareas:', error));
}


// Llamada a la función para cargar tareas y distribuirlas al cargar la página
window.addEventListener('load', cargarTareasYDistribuir);