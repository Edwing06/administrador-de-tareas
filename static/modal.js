let abrirModal = document.querySelector('[data-id="abrir"]');
let cerrarModal = document.querySelector('[data-id="cerrar"]');
let modal = document.querySelector('[data-id="modal"]');

abrirModal.addEventListener('click', ()=>{
    modal.showModal();
});

cerrarModal.addEventListener('click', ()=>{
    modal.close();
});
