let abrirModal = document.querySelector('[data-id="abrir"]');
let btnCerrar = document.getElementById("btn-cerrar");
let modal = document.querySelector('[data-id="modal"]');

abrirModal.addEventListener('click', ()=>{
    console.log(document.activeElement);
    modal.showModal();
});

// Agregar listener al botón cerrar
btnCerrar.addEventListener("click", function() {
  
    
    modal.close();
  
  });