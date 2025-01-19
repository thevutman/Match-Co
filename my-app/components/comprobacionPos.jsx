import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import supabase from '../lib/supabase' // Importa el cliente de Supabase
import Seleccionado from '../assets/icons/seleccionado'
import Disponible from '../assets/icons/disponible';
import Ocupado from '../assets/icons/ocupado'

const IconComponent = () => {
    const [icon, setIcon] = useState('disponible'); // Estado inicial como 'disponible'
    const [positionId, setPositionId] = useState(1); // ID de la posición a actualizar
    const [positions, setPositions] = useState([]); // Estado para almacenar las posiciones

    useEffect(() => {
        fetchPositions(); // Cargar las posiciones al montar el componente
    }, []);

    const fetchPositions = async () => {
        try {
            const { data, error } = await supabase
                .from('Torneo') // Cambia 'positions' por el nombre de tu tabla
                .select('Posiciones'); // Selecciona todas las columnas

            if (error) throw error;

            setPositions(data); // Almacena las posiciones en el estado
        } catch (error) {
            console.error(error);
        }
    };

    const handlePress = async () => {
        if (icon === 'disponible') {
            setIcon('seleccionado');
            await updateSupabase('seleccionado');
        } else if (icon === 'seleccionado') {
            const success = await confirmOccupation();
            if (success) {
                setIcon('ocupado');
                await updateSupabase('ocupado', true); // Inhabilitar la posición
            }
        }
    };

    const confirmOccupation = () => {
        return new Promise((resolve) => {
            Alert.alert(
                "Confirmar Ocupación",
                "¿Estás seguro de que deseas ocupar esta posición?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => resolve(false),
                        style: "cancel"
                    },
                    { text: "Confirmar", onPress: () => resolve(true) }
                ]
            );
        });
    };

    const updateSupabase = async (newStatus, disable = false) => {
        try {
            // Actualiza el array de posiciones
            const updatedPositions = positions.map((position) => {
                if (position.id === positionId) {
                    return { ...position, status: newStatus, is_disabled: disable }; // Actualiza el estado y la inhabilitación
                }
                return position;
            });

            const { data, error } = await supabase
                .from('Torneo') // Cambia 'positions' por el nombre de tu tabla
                .update({ positions: updatedPositions }) // Actualiza el array de posiciones
                .eq('Posiciones', 1); // Cambia 'id' por el nombre de la columna que identifica la posición

            if (error) throw error;
            setPositions(updatedPositions); // Actualiza el estado local
        } catch (error) {
            console.error(error);
        }
    };

    const renderIcon = () => {
        switch (icon) {
            case 'disponible':
                return <Disponible />;
            case 'seleccionado':
                return <Seleccionado />;
            case 'ocupado':
                return <Ocupado />;
            default:
                return null;
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={handlePress} disabled={icon === 'ocupado'}>
                {renderIcon()}
            </TouchableOpacity>
        </View>
    );
};

export default IconComponent;