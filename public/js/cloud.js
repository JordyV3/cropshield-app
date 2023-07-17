const imageUploader = document.getElementById('img-uploader');

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dbeomkgu9/image/upload`
const CLOUDINARY_UPLOAD_PRESET = 'g7yk85f6';

imageUploader.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }
    );
    const img = res.data.secure_url;
    const resImagen = img;
    console.log(resImagen);
    
    const inputImg = document.getElementById('imgInput');
    
    inputImg.value= resImagen;
    console.log(inputImg.value);
    return resImagen;
    
});


