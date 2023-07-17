const boton = document.getElementById("miBoton");
const menu = document.getElementById("miMenu");

// Agrega un evento de clic al botón de categorias de cultivo LG
boton.addEventListener("click", function() {
  if (menu.style.display === "none") {
    menu.style.display = "block";  
    menu.style.transition = "enter: ease-out duration-200";
    menu.style.transition = "enter-start: opacity-0 translate-y-1"
    menu.style.transition = "leave: ease-in duration-150"
    menu.style.transition = "opacity-0 translate-y-1"
  } else {
    menu.style.display = "none";
    menu.style.transition = "enter-end: opacity-100 translate-y-0"
    menu.style.transition = "leave-start: opacity-100 translate-y-0"
  }
});

const botonClose = document.getElementById("botonClose");
const miMenuMovil = document.getElementById('miMenuMovil');
const menuHam = document.getElementById('menuHam');

menuHam.addEventListener("click", function(){
    if(miMenuMovil.style.display === "none"){
        miMenuMovil.style.display="block"
    }
})

botonClose.addEventListener("click", function(){
    if(miMenuMovil.className==="lg:hidden"){
        miMenuMovil.style.display = "none"
    }
})



const butonMovilC = document.getElementById('butonMovilC');
const menuMovil = document.getElementById('menuMovil');

butonMovilC.addEventListener("click", function() {
    if (menuMovil.style.display === "none") {
        menuMovil.style.display = "block";  
    } else {
        menuMovil.style.display = "none";
    }
  });


  //Control de plagas
  
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






