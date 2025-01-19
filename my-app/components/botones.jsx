import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import  supabase  from '../lib/supabase';

const botones = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentValue1, setCurrentValue1] = useState();
  const [isOpen2, setIsOpen2] = useState(false);
  const [currentValue2, setCurrentValue2] = useState(null);
  //const [items1, setItems1] = useState([]);
  //const [items2, setItems2] = useState({});
  /* 
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('torneo') // Reemplaza con el nombre de tu tabla
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        // Procesa los datos para el primer DropDownPicker
        const options = data.map(item => ({
          label: item.fechas, // Cambia 'label' por el nombre de la columna que deseas mostrar
          value: item.fechas, // Cambia 'value' por el nombre de la columna que deseas usar como valor
        }));
        setItems1(options);

        // Si tienes subopciones, puedes procesarlas aquí
        const subOptions = {};
        data.forEach(item => {
          subOptions[item.value] = item.horas; // Cambia 'subOptions' por el nombre de la columna que contiene las subopciones
        });
        setItems2(subOptions);
      }
    };

    fetchData();
  }, []);
  
  */
  const items1 = [
    { label: 'Opción A', value: 'opcionA' },
    { label: 'Opción B', value: 'opcionB' },
    { label: 'Opción C', value: 'opcionC' },
  ]
  const items2 = {
    opcionA: [
      { label: 'Subopción A1', value: 'subopcionA1' },
      { label: 'Subopción A2', value: 'subopcionA2' },
    ],
    opcionB: [
      { label: 'Subopción B1', value: 'subopcionB1' },
      { label: 'Subopción B2', value: 'subopcionB2' },
    ],
    opcionC: [
      { label: 'Subopción C1', value: 'subopcionC1' },
      { label: 'Subopción C2', value: 'subopcionC2' },
    ],

  };
  return (
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30}}>
      <DropDownPicker 
      items={items1} 
      open={isOpen1} 
      setOpen={() => setIsOpen1(!isOpen1)}
      value={currentValue1}
      setValue={val=>setCurrentValue1(val)}
      maxHeight={200}
      autoScroll

      placeholder='Seleccione la Fecha'
      placeholderStyle={{color:'black', fontWeight: 'bold', backgroundColor: 'grey'}}
      
      showTickIcon={true}
      showArrowIcon={true}
      disableBorderRadius={true}

      badgeColors={['grey']}
      badgeDotColors={['white']}
      badgeTextStyle={{ color: 'white' }}
      />

      {currentValue1 && (
        <DropDownPicker style={{ padding: 30 }}
          items={items2[currentValue1] || []}
          open={isOpen2}
          setOpen={setIsOpen2}
          value={currentValue2}
          setValue={val => setCurrentValue2(val)}
          maxHeight={200}
          autoScroll

          placeholder='Seleccione un horario'
          placeholderStyle={{ color: 'black', fontWeight: 'bold', backgroundColor: 'grey' }}

          showTickIcon={true}
          showArrowIcon={true}
          disableBorderRadius={true}

          badgeColors={['grey']}
          badgeDotColors={['white']}
          badgeTextStyle={{ color: 'white' }}
        />
      )}
    </View>    
  );
}
export default  botones;