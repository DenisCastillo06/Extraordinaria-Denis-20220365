import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { database, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

// Componente Add para agregar un nuevo registro
const Add = ({ navigation }) => {
    // Estado inicial del registro
    const [registro, setRegistro] = useState({
        nombre: '',
        precio: 0,
        vendido: false,
        creado: new Date(),
        imagen: ''
    });

    // Función para navegar a la pantalla de inicio
    const goToHome = () => {
        navigation.navigate('Home');
    };

    // Función para abrir la galería de imágenes del dispositivo
    const openGalery = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [8, 8],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                setRegistro({
                    ...registro,
                    imagen: result.assets[0].uri
                });
                console.log('Imagen seleccionada:', result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error al abrir la galería', error);
        }
    };

    // Función para agregar el producto a Firestore
    const agregarProducto = async () => {
        try {
            let imageUrl = null;

            if (registro.imagen) {
                console.log('Subiendo imagen a Firebase Storage...');
                const imageRef = ref(storage, `images/${Date.now()}-${registro.nombre}`);

                const response = await fetch(registro.imagen);
                const blob = await response.blob();

                console.log('Antes del uploadBytes');
                const snapshot = await uploadBytes(imageRef, blob);
                console.log('Snapshot después del uploadBytes:', snapshot);

                imageUrl = await getDownloadURL(snapshot.ref);
                console.log("URL de la imagen:", imageUrl);
            }

            console.log('Datos del registro:', {...registro, imagen: imageUrl});
            await addDoc(collection(database, 'productos'), {...registro, imagen: imageUrl});
            console.log('Se guardó la colección');

            Alert.alert('Registro agregado', 'El registro se agregó correctamente', [
                { text: 'Ok', onPress: goToHome },
            ]);

            goToHome();
        } catch (error) {
            console.error('Error al agregar el registro', error);
            Alert.alert('Error', 'Ocurrió un error al agregar el registro. Por favor, intenta nuevamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar registro</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre Completo:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setRegistro({ ...registro, nombre: text })}
                    value={registro.nombre}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Grado:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setRegistro({ ...registro, grado: text })}
                    value={registro.grado}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sección:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setRegistro({ ...registro, seccion: text })}
                    value={registro.seccion}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Observación:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setRegistro({ ...registro, observacion: text })}
                    value={registro.observacion}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={agregarProducto}>
                <Text style={styles.buttonText}>Agregar registro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={goToHome}>
                <Text style={styles.buttonText}>Volver a home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Add;

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%'
    },
    imagePicker: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    imagePickerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    inputContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f8f9fa',
        marginBottom: 16,
    },
});