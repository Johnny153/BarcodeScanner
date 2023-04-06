import { StatusBar, StyleSheet, View, Text, Button,Image, TextInput, TouchableOpacity, } from 'react-native';
import { globalStyles } from '../styles/global';
import React, { useState } from "react";


export default function Register({ navigation }) {

    const pressHandler = () => {
        navigation.goBack();
        }
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const image=require('../img/user.png')
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={image} /> 
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          /> 
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Surname"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          /> 
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          /> 
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View >
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View > 
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.loginText}>Register</Text> 
        </TouchableOpacity> 
      </View> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  registerView:{
    flexDirection: 'row',
  },
  image: {
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    width: 150,
    height: 150,
  },
  inputView: {
    backgroundColor: "#66AAFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  registerText: {
    flexDirection: 'row',
    height: 30,
    marginBottom: 30,
  },
  register_button: {
    flexDirection: 'row',
    height: 30,
    marginBottom: 30,
    color: "#3333FF",
    fontWeight: "bold",
  },
  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FF1493",
  },
});