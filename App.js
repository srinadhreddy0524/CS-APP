// App.js

import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleImageUpload = async () => {
    setResult(null); // Clear previous result

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'currency.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('https://edb0-2405-201-c044-392c-1957-86ba-c6f9-c739.ngrok-free.app ', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to recognize currency. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Recognition App</Text>
      <Button title="Pick an Image" onPress={handleImageUpload} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />}
      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Result:</Text>
          <Text>{JSON.stringify(result)}</Text>
        </View>
      )}
    </View>
  );
}

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
    marginBottom: 20,
  },
  image: {
    marginTop: 20,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  spinner: {
    marginTop: 20,
  },
  resultBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
