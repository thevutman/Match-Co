import * as FileSystem from 'expo-file-system';
import {decode} from 'base64-arraybuffer';
import { supabase } from '@/lib/supabase';
import { supabaseUrl } from '@/constants';

export const getUserImageSrc = imagePath => {
    if (imagePath) {
        return getSupabaseFileUrl(imagePath);
    }else{
        return require('../assets/images/defaultUser.png');
    }
}

export const getSupabaseFileUrl = filePath => {
    if(filePath){
        //Hay que poner el lonk de la imagen que esta en las cpartpetas
        // de supabase
        return {uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
    }
    return null; 
}

export const uploadFile = async (folderName, fileUri, isImage = true) => {
    try {
        let fileName = getFilePath(folderName, isImage);
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, { 
            encoding: FileSystem.EncodingType.Base64 
        });

        let imageData = decode(fileBase64); // array buffer
        let {data, error} = await supabase
        .storage
        .from('uploads')
        .upload(fileName, imageData, {
            cacheControl: '3600',
            upsert: false,
            contentType: isImage? 'image/*': 'video/*'
        })
        if(error){
            return {success: false, message:'No se puedo subir el archivo'};
        }

        return {success: true, data: data.path}
    }catch(error){
        return {success: false, message:'No se puedo subir el archivo'};
    }
}

export const getFilePath = (folderName, isImage) => {
    return `/${folderName}/${(new Date()).getTime()}${isImage? '.png': '.mp4'}`;

}