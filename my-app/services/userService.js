import { supabase } from "../lib/supabase";

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