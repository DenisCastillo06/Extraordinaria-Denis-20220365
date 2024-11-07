import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { database } from '../config/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Función para eliminar un documento de Firestore
const handleDelete = async (id) => {
    try {
        // Se elimina el documento con el id proporcionado de la colección 'registros'
        await deleteDoc(doc(database, 'productos', id));
        console.log('Se eliminó el documento con id: ', id);
    } catch (e) {
        console.error('Error removing document: ', e);
    }
};

// Función para actualizar el estado de 'vendido' de un documento en Firestore
const handleUpdate = async (id, vendido) => {
    try {
        // Se actualiza el campo 'vendido' invirtiendo su valor actual
        await updateDoc(doc(database, 'productos', id), {
            vendido: !vendido
        });
        console.log('Se actualizó el documento con id: ', id);
    } catch (e) {
        console.error('Error updating document: ', e);
    }
};

// Componente funcional que representa una tarjeta de producto
const CardProductos = ({ id, nombre, grado, seccion, observacion, vendido }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.text}>Grado:{grado}</Text>
            <Text style={styles.text}>Seccion:{seccion}</Text>
            <Text style={styles.text}>Observación:{observacion}</Text>
            <Text style={[styles.text, vendido ? styles.vendido : styles.disponible]}>
                {vendido ? "Finalizado" : "Pendiente"}
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(id)}>
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.updateButton, vendido ? styles.regresarButton : styles.venderButton]}
                    onPress={() => handleUpdate(id, vendido)}>
                    <Text style={styles.updateButtonText}>
                        {vendido ? "Devolver a pendiente" : "Finalizar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    vendido: {
        color: 'green',
        fontWeight: 'bold',
    },
    disponible: {
        color: 'red',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    updateButton: {
        padding: 10,
        borderRadius: 5,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    venderButton: {
        backgroundColor: '#4caf50',
    },
    regresarButton: {
        backgroundColor: '#ff9800',
    },
});

export default CardProductos;