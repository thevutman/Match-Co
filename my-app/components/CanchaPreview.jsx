import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Icon } from '@rneui/themed';
import { theme } from '@/constants/theme';
import { hp, wp } from '../helpers/common';
import Button from '@/components/Button';

export default function CanchaPreview({ cancha, onClose, onSelect }) {
  if (!cancha) return null;

  return (
    <Modal
      visible={!!cancha}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{cancha.nombre}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={theme.colors.textLight} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.infoRow}>
              <Icon name="location-on" size={20} color={theme.colors.primary} />
              <Text style={styles.infoText}>{cancha.direccion}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{cancha.descripcion}</Text>
            </View>

            <Button 
              title="Ver más detalles"
              onPress={onSelect}
              icon={<Icon name="arrow-forward" size={20} color="white" />}
              style={styles.selectButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: wp(4),
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(2.4),
    fontWeight: '600',
    color: theme.colors.textDark,
  },
  closeButton: {
    padding: wp(2),
  },
  content: {
    gap: hp(2),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  infoText: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
    flex: 1,
  },
  descriptionContainer: {
    backgroundColor: theme.colors.background,
    padding: wp(3),
    borderRadius: theme.radius.md,
  },
  description: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
    lineHeight: hp(2.4),
  },
  selectButton: {
    marginTop: hp(2),
  }
});