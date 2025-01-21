import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

const ExampleComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: items, error } = await supabase
        .from('Ubicaciones') // Reemplaza con el nombre de tu tabla
        .select('*','*'); // Puedes especificar columnas específicas
        
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setData(items);
        console.log(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Text>Cargando datos...</Text>;
  }
};

const styles = StyleSheet.create({});

export default ExampleComponent;
