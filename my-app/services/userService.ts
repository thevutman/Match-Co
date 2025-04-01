import { supabase } from "../lib/supabase";
import * as FileSystem from 'expo-file-system';
import {decode} from 'base64-arraybuffer'
import { supabaseUrl } from "@/constants";
import { PostgrestError } from '@supabase/supabase-js';

// Tipos
export interface User {
    id: string;
    created_at: string;
    name: string;
    image: string | null;
    bio: string | null;
    email: string;
    address: string | null;
    phone_number: string | null;
}

// Validaciones
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
};

// Servicios
export const getUserData = async (userId: string): Promise<{success: boolean; data?: User; msg?: string}> => {
    try {
        const {data, error} = await supabase
            .from('users')
            .select()
            .eq('id', userId)
            .single();
            
        if (error) {
            return {success: false, msg: error.message}
        }
        return {success: true, data};
    }
    catch(error: unknown) {
        console.log('Error getting user data: ', error);
        if (error instanceof Error) {
            return {success: false, msg: error.message}
        }
        return {success: false, msg: 'Error desconocido al obtener datos del usuario'}
    }
}

export const updateUser = async (userId: string, data: Partial<User>): Promise<{success: boolean; msg?: string}> => {
    try {
        // Validaciones
        if (data.email && !validateEmail(data.email)) {
            return {success: false, msg: 'Formato de email inválido'}
        }
        if (data.phone_number && !validatePhoneNumber(data.phone_number)) {
            return {success: false, msg: 'Formato de teléfono inválido'}
        }
        if (data.bio && data.bio.length > 500) {
            return {success: false, msg: 'La biografía no puede exceder los 500 caracteres'}
        }

        const {error} = await supabase
            .from('users')
            .update(data)
            .eq('id', userId);
            
        if (error) {
            return {success: false, msg: error.message}
        }
        return {success: true};
    }
    catch(error: unknown) {
        console.log('Error updating user: ', error);
        if (error instanceof Error) {
            return {success: false, msg: error.message}
        }
        return {success: false, msg: 'Error desconocido al actualizar usuario'}
    }
}

export const updateUserField = async (userId: string, field: keyof User, value: any): Promise<{success: boolean; msg?: string}> => {
    try {
        // Validaciones específicas por campo
        if (field === 'email' && !validateEmail(value)) {
            return {success: false, msg: 'Formato de email inválido'}
        }
        if (field === 'phone_number' && !validatePhoneNumber(value)) {
            return {success: false, msg: 'Formato de teléfono inválido'}
        }
        if (field === 'bio' && value.length > 500) {
            return {success: false, msg: 'La biografía no puede exceder los 500 caracteres'}
        }

        const {error} = await supabase
            .from('users')
            .update({ [field]: value })
            .eq('id', userId);
            
        if (error) {
            return {success: false, msg: error.message}
        }
        return {success: true};
    }
    catch(error: unknown) {
        console.log(`Error updating user ${field}: `, error);
        if (error instanceof Error) {
            return {success: false, msg: error.message}
        }
        return {success: false, msg: 'Error desconocido al actualizar campo del usuario'}
    }
}

export const getUserImageSrc = (imagePath: string | null): {uri: string} | null => {
    if(imagePath){
        return getSupabaseFileUrl(imagePath);
    }else {
        return require('../assets/images/defaultUser.png');
    }
}

export const getSupabaseFileUrl = (filePath: string | null): {uri: string} | null => {
    if(filePath){
        return {uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
    }
    return null;
}

export const uploadFile = async (folderName: string, fileUri: string, isImage: boolean = true): Promise<{success: boolean; data?: string; msg?: string}> => {
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
            return {success: false, msg: 'No se pudo subir el archivo'}
        }

        if (!data?.path) {
            return {success: false, msg: 'Error al obtener la ruta del archivo'}
        }

        return {success: true, data: data.path}

    }catch(error: unknown){
        console.log('file error upload: ', error);
        if (error instanceof Error) {
            return {success: false, msg: error.message}
        }
        return {success: false, msg: 'Error desconocido al subir el archivo'}
    }
}

export const getFilePath = (folderName: string, isImage: boolean): string => {
    return `/${folderName}/${(new Date()).getTime()}${isImage? '.png': '.mp4'}`;
} 