const imagePreview = document.getElementById('img-preview');
const imageUploader = document.getElementById('img-uploader');
const form = document.getElementById('form');
const imgPreview = document.getElementById('img-preview');
const resultadoPrediccion = document.getElementById('prediccion');
const resultadoConfianza = document.getElementById('confianza');
const inputPrediccion = document.getElementById('inputPrediccion');
const inputConfianza = document.getElementById('inputConfianza');


form.addEventListener("click", () => {
    imageUploader.click();
});

imageUploader.onchange = ({ target }) => {
    let file = target.files[0];
    if (file) {
        let fileName = file.name;
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }
    }
}

const loading = document.getElementById('loading');
const loadingP = document.getElementById('loadingP');
const loadingC = document.getElementById('loadingC');

imageUploader.addEventListener('change', function() {
  loading.style.display = 'block';
  loadingP.style.display = 'block';
  loadingC.style.display = 'block';
  setTimeout(function() {
    loading.style.display = 'none';
    loadingP.style.display = 'none';
    loadingC.style.display = 'none';
  }, 2000);

});




// const API_URL = `http://localhost:8080/predict`;
const API_URL = `http://165.232.139.195/predict`;

imageUploader.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    let objectURL = URL.createObjectURL(file);
    imagePreview.src = objectURL;
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(
        API_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }
    );
    const data = res.data;
    const prediccion = data.Predicción;
    const confianza = data.Confianza;
    const confianzaL = confianza * 100 + "%";
    inputPrediccion.value = prediccion;
    inputConfianza.value = confianzaL;
    
    setTimeout(function(){
        resultadoPrediccion.innerHTML = prediccion;
        resultadoConfianza.innerHTML = confianzaL;
    }, 2000);
});


