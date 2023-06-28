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




