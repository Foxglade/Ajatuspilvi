import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Comments = ({ message, sender }) => {
console.log('Received message:', message);
  console.log('Received sender:', sender);
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.sender}>{sender}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Comments;