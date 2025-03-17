import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
// import { Button, Text } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

const DatePicker = () => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Seleccionar Fecha</Button>
      <DatePickerModal
        locale="es"
        mode="single"
        visible={visible}
        onDismiss={() => setVisible(false)}
        date={date}
        onConfirm={(params) => {
          setDate(params.date);
          setVisible(false);
        }}
      />
      {date && <Text>Fecha seleccionada: {date.toDateString()}</Text>}
    </View>
  );
};

export default DatePicker;
