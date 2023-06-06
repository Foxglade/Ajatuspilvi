import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ImageBackground, TextInput } from 'react-native';
import io from 'socket.io-client';

const socket = io('https://ajatuspilvi1servu.herokuapp.com');

import Comments from '../components/Comments';

export default function Home() {
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

      useEffect(() => {
        socket.on('chat message', (msg) => {
          console.log('Received Message Info:', msg);
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
     const newMessage = {
       sender: 'Your Sender',
       message: message,
     };
     socket.emit('chat message', newMessage);
     setMessage('');
   }
 };


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../wallpaper.jpg')} style={styles.imageBackground}>
        <View style={styles.content}>
          {comments.map((comment, index) => (
            <Comments key={index} sender={comment.sender} message={comment.message} />
          ))}
        </View>


        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={handleMessageChange}
          />
          <Button title="Send" onPress={handleSubmit} />
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
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'fill',
    width: 500,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    color: '#000'
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
    color: '#000',
  },
  message: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
    color: '#000',
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
