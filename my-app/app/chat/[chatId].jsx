// import { View, Text } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

// export default function ChatScreen() {
//   const { chatId } = useLocalSearchParams(); // Obtiene el ID del chat desde la URL

//   return (
//     <View>
//       <Text>Chat ID: {chatId}</Text>
//     </View>
//   );
// }


import { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useMessages } from '../../contexts/MessageContext';
import { useAuth } from '../../contexts/AuthContext';

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams(); // Obtiene el ID del chat
  const { messages, fetchMessages, sendMessage } = useMessages();
  const { user } = useAuth(); // Obtiene el usuario autenticado
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages(chatId);
  }, [chatId]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    sendMessage(chatId, user.id, newMessage);
    setNewMessage('');
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 8, backgroundColor: item.sender_id === user.id ? '#DCF8C6' : '#FFF', marginBottom: 5, borderRadius: 8 }}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje..."
          style={{ flex: 1, borderWidth: 1, padding: 8, borderRadius: 5 }}
        />
        <Button title="Enviar" onPress={handleSend} />
      </View>
    </View>
  );
}
