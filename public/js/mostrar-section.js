const sectionPlagas = document.getElementById('section-control-plagas');
const prediccionM = document.getElementById('prediccion');

sectionPlagas.addEventListener('DOMContentLoaded', function(){
    let prediccion = prediccionM.innerHTML;
    if(prediccion === "Planta Enferma Trips"){
        console.log('Aqui ')
        sectionPlagas.style = "block";
    }
    console.log('Aqui afuera')
})