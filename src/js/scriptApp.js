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

// const secctionControl = document.getElementById('section-control-plagas');
// const prediccion = document.getElementById('prediccion');

// if(prediccion.textContent === "Planta Enferma Trips") {
//     secctionControl.style.display = 'block'
// } else{
//     secctionControl.style.display = 'none';
// }