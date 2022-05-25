import axios from "axios";

const uploadImage = async(image) =>{
    if(image){
        try {
            const formData = new FormData();
            formData.append('upload_preset','journal-app');
            formData.append('file',image);

            const url = 'https://api.cloudinary.com/v1_1/higueraDev/image/upload'
            const {data} = await axios.post(url,formData);
            return data.secure_url
        } catch (error) {
            console.error('Error al cargar la imagen', error)
            return null
        }
    }
}

export default uploadImage