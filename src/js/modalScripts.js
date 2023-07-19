const modal = document.getElementById('modal-control-biologico');
const openModal = document.getElementById('ver-tabla');
const closeModal = document.getElementById('cerrar-modal');

openModal.addEventListener('click', function(){
    if(modal.style.display === "none") {
        modal.style.display = "block"
    }
})

closeModal.addEventListener('click', function(){
    if(modal.style.display === "block"){
        modal.style.display = "none"
    }
})

const secctionControl = document.getElementById('section-control-plagas');
const prediccion = document.getElementById('prediccion');

if(prediccion.textContent === "Planta Enferma Trips") {
    secctionControl.style.display = 'block'
} else{
    secctionControl.style.display = 'none';
}