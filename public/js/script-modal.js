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


const indicadorPlaga = document.getElementById('indicador-plaga');
const sectionControlPlagas = document.getElementById('section-control-plagas');

indicadorPlaga.addEventListener('change', function(){
    if(indicadorPlaga === "Planta Enferma Trips"){
        sectionControlPlagas.display = "block"
    }
})