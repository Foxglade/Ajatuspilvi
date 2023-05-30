import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ImageBackground, TextInput } from 'react-native';
import io from 'socket.io-client';

const socket = io('https://mindcloud.herokuapp.com/');

import Comments from '../components/Comments';

export default function Home() {
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
     // Replace with your server IP address

    socket.on('chat message', (msg) => {
      setComments((prevComments) => [...prevComments, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const handleSubmit = () => {
    if (message) {
      // Emit the message to the server
      socket.emit('chat message', message);

      // Clear the input field
      setMessage('');
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../wallpaper.jpg')} style={styles.imageBackground}>
        <View style={styles.content}>
          {comments.map((comment, index) => (
            <Comments key={index} message={comments} sender="User" />
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            value={message}
            onChangeText={handleMessageChange}
          />
          <Button style={styles.sendbtn} title="Send" onPress={handleSubmit} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'fill',
    width: 500,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  commentContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
    marginLeft: 60,
    marginRight: 60,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
  },
  message: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 60,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderWidth: 1,
    marginLeft: 50,
    marginRight: 10,
    borderRadius: 30,
    width: 500,
  },
});
