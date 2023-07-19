const botonCloseA = document.getElementById("botonCloseA");
const miMenuMovilA = document.getElementById('miMenuMovilA');
const menuHamA = document.getElementById('menuHamA');

menuHamA.addEventListener("click", function(){
  if(miMenuMovilA.style.display === "none"){
      miMenuMovilA.style.display="block"
  }
})

botonCloseA.addEventListener("click", function(){
  if(miMenuMovilA.className==="lg:hidden"){
      miMenuMovilA.style.display = "none"
  }
})