// import { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../lib/supabase';

// const MessageContext = createContext();

// export const MessageProvider = ({ children }) => {
//     const [messages, setMessages] = useState([]);

//     const fetchMessages = async (chatId) => {
//         const { data, error } = await supabase
//             .from('messages')
//             .select('*')
//             .eq('chat_id', chatId)
//             .order('created_at', { ascending: true });

//         if (error) console.error(error);
//         else setMessages(data);
//     };

//     const sendMessage = async (chatId, senderId, content) => {
//         const { data, error } = await supabase
//             .from('messages')
//             .insert([{ chat_id: chatId, sender_id: senderId, content }]);

//         if (error) console.error(error);
//         else setMessages((prev) => [...prev, data[0]]);
//     };

//     useEffect(() => {
//         const subscription = supabase
//             .channel('realtime-messages')
//             .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
//                 setMessages((prev) => [...prev, payload.new]);
//             })
//             .subscribe();

//         return () => supabase.removeChannel(subscription);
//     }, []);

//     return (
//         <MessageContext.Provider value={{ messages, fetchMessages, sendMessage }}>
//             {children}
//         </MessageContext.Provider>
//     );
// };

// export const useMessages = () => useContext(MessageContext);


import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const MessageContext = createContext(null); // Asegurar que no sea undefined

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async (chatId) => {
        if (!chatId) return; // Evitar errores si chatId es undefined
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true });

        if (error) console.error(error);
        else setMessages(data || []); // Asegurar que siempre sea un array
    };

    const sendMessage = async (chatId, senderId, content) => {
        if (!chatId || !senderId || !content) return; // Evitar errores si falta algo
        const { data, error } = await supabase
            .from('messages')
            .insert([{ chat_id: chatId, sender_id: senderId, content }]);

        if (error) console.error(error);
        else setMessages((prev) => [...prev, data[0]]);
    };

    useEffect(() => {
        const subscription = supabase
            .channel('realtime-messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages((prev) => [...prev, payload.new]);
            })
            .subscribe();

        return () => supabase.removeChannel(subscription);
    }, []);

    return (
        <MessageContext.Provider value={{ messages, fetchMessages, sendMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessages debe estar dentro de un MessageProvider');
    }
    return context;
};
