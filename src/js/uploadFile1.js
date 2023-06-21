const imageUploader = document.getElementById('imgUpload');
const resultadoPrediccion = document.getElementById('prediccion');
const resultadoConfianza = document.getElementById('confianza');

const API_URL = `http://localhost:8080/predict`;

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
    // console.log(data);
    const prediccion = data.Predicción;
    const confianza = data.Confianza;
    const confianzaL = confianza * 100 + "%";
    resultadoPrediccion.innerHTML = prediccion;
    resultadoConfianza.innerHTML = confianzaL;
});