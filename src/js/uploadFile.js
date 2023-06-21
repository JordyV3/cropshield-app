const imagePreview = document.getElementById('img-preview');
const imageUploader = document.getElementById('img-uploader');
const form = document.getElementById('form');
const imgPreview = document.getElementById('img-preview');
const resultadoPrediccion = document.getElementById('prediccion');
const resultadoConfianza = document.getElementById('confianza');

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
