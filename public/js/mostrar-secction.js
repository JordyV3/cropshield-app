const secctionControl = document.getElementById('section-control-plagas');
const prediccion = document.getElementById('prediccion');

if(prediccion.textContent === "Planta Enferma Trips") {
    secctionControl.style.display = 'block'
} else{
    secctionControl.style.display = 'none';
}