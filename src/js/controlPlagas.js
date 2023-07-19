const sectionColap1 = document.getElementById('accordion-flush1')
const bodySectionColap1 = document.getElementById('accordion-flush-body-1');

sectionColap1.addEventListener("click", function() {
    if(bodySectionColap1.style.display === "none"){
        bodySectionColap1.style.display = "block"
    } else {
        bodySectionColap1.style.display = "none"
    }
})

const sectionColap2 = document.getElementById('accordion-flush2')
const bodySectionColap2 = document.getElementById('accordion-flush-body-2');

sectionColap2.addEventListener("click", function() {
    if(bodySectionColap2.style.display === "none"){
        bodySectionColap2.style.display = "block"
    } else {
        bodySectionColap2.style.display = "none"
    }
})

const sectionColap3 = document.getElementById('accordion-flush3')
const bodySectionColap3 = document.getElementById('accordion-flush-body-3');

sectionColap3.addEventListener("click", function() {
    if(bodySectionColap3.style.display === "none"){
        bodySectionColap3.style.display = "block"
    } else {
        bodySectionColap3.style.display = "none"
    }
})

const sectionColap4 = document.getElementById('accordion-flush4')
const bodySectionColap4 = document.getElementById('accordion-flush-body-4');

sectionColap4.addEventListener("click", function() {
    if(bodySectionColap4.style.display === "none"){
        bodySectionColap4.style.display = "block"
    } else {
        bodySectionColap4.style.display = "none"
    }
})

const sectionColap5 = document.getElementById('accordion-flush5')
const bodySectionColap5 = document.getElementById('accordion-flush-body-5');

sectionColap5.addEventListener("click", function() {
    if(bodySectionColap5.style.display === "none"){
        bodySectionColap5.style.display = "block"
    } else {
        bodySectionColap5.style.display = "none"
    }
})

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