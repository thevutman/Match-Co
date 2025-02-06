import { supabase } from "../lib/supabase";
import * as FileSystem from 'expo-file-system';
import {decode} from 'base64-arraybuffer'
import { supabaseUrl } from "@/constants";

export const getUserData  = async (userId)=> {
    try {
        const {data, error} = await supabase
        .from('users')
        .select()
        .eq('id', userId)
        .single();
        if (error) {
            return{success: false, msg: error?.mesagge}
        }
        return {success: true, data};
    }
    catch(error) {
        console.log('error: ', error);
        return{success: false, msg: error.mesagge}
    }
}
export const updateUser  = async (userId, data)=> {
    try {
        const {error} = await supabase
        .from('users')
        .update(data)
        .eq('id', userId);
        if (error) {
            return{success: false, msg: error?.mesagge}
        }
        return {success: true, data};
    }
    catch(error) {
        console.log('error: ', error);
        return{success: false, msg: error.mesagge}
    }
}
export const getUserImageSrc = imagePath => {
    if(imagePath){
        return getSupabaseFileUrl(imagePath);
    }else {
        return require('../assets/images/defaultUser.png');
    }
}
export const getSupabaseFileUrl = filePath =>{
    if(filePath){
        return {uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
    }
    return null;
}
export const uploadFile = async (folderName, fileUri, isImage=true) => {
    try {
            let fileName = getFilePath(folderName, isImage);
            const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64
            });
            let imageData = decode(fileBase64);
            let {data, error} = await supabase
            .storage
            .from('uploads')
            .upload(fileName, imageData, {
                cacheControl: '3600',
                upsert: false,
                contentType: isImage? 'image/*': 'video/*',
            });
            if (error) {
                return {success: false, msg: 'Could not upload media'}
            }

            console.log('data: ', data);
            return {success: true, data: data.path}

    }catch(error){
        console.log('file erro upload: ', error);
        return {success: false, msg: 'Could not upload media'}

    }
}

export const getFilePath = (folderName, isImage) => {
    return `/${folderName}/${(new Date()).getTime()}${isImage? '.png': '.mp4'}`;
}