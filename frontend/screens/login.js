import { StatusBar, StyleSheet, View, Text, Button,Image, TextInput, TouchableOpacity, } from 'react-native';
import { globalStyles } from '../styles/global';
import React, { useState } from "react";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import jwt from 'jwt-decode'

export default function Login({ navigation, route}) {

    const pressRegister = () => {
        navigation.navigate('Register');
        }

   
    const baseUrl = 'http://3.123.65.51:3000';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const image=require('../img/user.png')

    const pressLogin=() => {
      console.log(email)
      console.log(password)
      axios.post('http://3.123.65.51:3000/users/login',{
        email: email,
        password: password,
      })
      .then((response) => {
        const token=response.data.token
        AsyncStorage.setItem('jwtToken', token)
          .then(() => {
            console.log('Token stored successfully');
            navigation.navigate('HomeLogin',{response});
          })
          .catch((error) => {
            console.log('Error storing token: ', error);
          });
      });
    }

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={image} /> 
        <StatusBar style="auto" />
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
        <View style={styles.registerView}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={pressRegister}>
            <Text style={styles.register_button} > Register</Text> 
          </TouchableOpacity>
        </View> 
        <TouchableOpacity style={styles.loginBtn}
          onPress={pressLogin} >
          <Text style={styles.loginText}>Login</Text> 
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
    marginBottom: 20,
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
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});