import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Avatar from "@/components/avatar";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { Icon } from '@rneui/themed';
import { formatTime } from '@/utils/dateUtils';

export default function ChatTorneo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener usuario actual
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError("Debes iniciar sesión para acceder al chat");
          return;
        }
        setUsuarioActual(user);

        // Obtener mensajes
        const { data: mensajesData, error: mensajesError } = await supabase
          .from("mensajes")
          .select(`
            *,
            users:usuario_id (
              name,
              image
            )
          `)
          .eq("torneo_id", id)
          .order("creado_en", { ascending: true });

        if (mensajesError) throw mensajesError;
        setMensajes(mensajesData);

        // Escuchar nuevos mensajes en tiempo real
        const subscription = supabase
          .channel(`chat:${id}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "mensajes",
              filter: `torneo_id=eq.${id}`,
            },
            (payload) => {
              setMensajes((prev) => [...prev, payload.new]);
              // Scroll al último mensaje
              flatListRef.current?.scrollToEnd({ animated: true });
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(subscription);
        };
      } catch (err) {
        console.error("Error cargando chat:", err);
        setError("Error al cargar el chat");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

    try {
      const { error } = await supabase.from("mensajes").insert([
        {
          torneo_id: id,
          usuario_id: usuarioActual.id,
          mensaje: mensaje.trim(),
        },
      ]);

      if (error) throw error;
      setMensaje("");
    } catch (err) {
      console.error("Error enviando mensaje:", err);
      setError("Error al enviar el mensaje");
    }
  };

  if (loading) {
    return <Loading text="Cargando chat..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button 
          title="Reintentar" 
          onPress={() => router.replace(`/torneo/${id}/chat`)}
        />
      </View>
    );
  }

  const renderMensaje = ({ item }) => {
    const esUsuarioActual = item.usuario_id === usuarioActual?.id;

    return (
      <View style={[
        styles.messageContainer,
        esUsuarioActual ? styles.messageContainerUsuario : styles.messageContainerOtro
      ]}>
        {!esUsuarioActual && (
          <Avatar
            uri={item.users?.image}
            size={hp(6)}
            rounded={theme.radius.xxl}
            style={styles.avatar}
          />
        )}
        <View style={[
          styles.messageBubble,
          esUsuarioActual ? styles.messageBubbleUsuario : styles.messageBubbleOtro
        ]}>
          {!esUsuarioActual && (
            <Text style={styles.userName}>{item.users?.name}</Text>
          )}
          <Text style={[
            styles.messageText,
            esUsuarioActual ? styles.messageTextUsuario : styles.messageTextOtro
          ]}>
            {item.mensaje}
          </Text>
          <Text style={styles.timestamp}>
            {formatTime(item.creado_en)}
          </Text>
        </View>
        {esUsuarioActual && (
          <Avatar
            uri={usuarioActual?.user_metadata?.avatar_url}
            size={hp(6)}
            rounded={theme.radius.xxl}
            style={styles.avatar}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <BackButton router={router} />
      
      <FlatList
        ref={flatListRef}
        data={mensajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMensaje}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={mensaje}
          onChangeText={setMensaje}
          placeholder="Escribe un mensaje..."
          style={styles.input}
          multiline
        />
        <Button
          title="Enviar"
          onPress={enviarMensaje}
          disabled={!mensaje.trim()}
          icon={{
            name: 'send',
            type: 'material',
            size: 20,
            color: 'white'
          }}
          iconPosition="right"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
    gap: hp(3),
  },
  errorText: {
    fontSize: hp(2),
    color: theme.colors.error,
    textAlign: 'center',
  },
  messagesList: {
    padding: wp(4),
    paddingTop: hp(8),
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: hp(2),
    maxWidth: '80%',
  },
  messageContainerUsuario: {
    alignSelf: 'flex-end',
  },
  messageContainerOtro: {
    alignSelf: 'flex-start',
  },
  avatar: {
    marginHorizontal: wp(2),
  },
  messageBubble: {
    padding: wp(3),
    borderRadius: theme.radius.md,
    maxWidth: '100%',
  },
  messageBubbleUsuario: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: theme.radius.sm,
  },
  messageBubbleOtro: {
    backgroundColor: 'white',
    borderBottomLeftRadius: theme.radius.sm,
  },
  userName: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    marginBottom: hp(0.5),
  },
  messageText: {
    fontSize: hp(1.8),
    lineHeight: hp(2.4),
  },
  messageTextUsuario: {
    color: 'white',
  },
  messageTextOtro: {
    color: theme.colors.textDark,
  },
  timestamp: {
    fontSize: hp(1.2),
    color: theme.colors.textLight,
    marginTop: hp(0.5),
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: wp(2),
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    padding: wp(3),
    fontSize: hp(1.8),
    maxHeight: hp(12),
    minHeight: hp(5),
  },
});
