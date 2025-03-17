import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setSelectedDate(date.toLocaleString());
    hideDatePicker();
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Seleccionar Fecha y Hora" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {selectedDate && <Text>Fecha seleccionada: {selectedDate}</Text>}
    </View>
  );
};

export default DatePicker;
