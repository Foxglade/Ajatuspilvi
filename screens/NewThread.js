import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Pressable } from 'react-native';

export default function NewThread({ route, navigation }) {

  const InputSubmit = ({ onSubmit }) => {
    const [text, setText] = useState('');

    const handleTextChange = (value) => {
      setText(value);
    };

    const handleSubmit = () => {
      onSubmit(text);
      setText('');
    };

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={text}
          placeholder="Enter text"
        />
        <Button title="Submit" onPress={handleSubmit} />

      </View>
    );
  }};

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
      flex: 1,
    },
  });