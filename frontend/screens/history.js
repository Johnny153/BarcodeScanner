import { StatusBar, StyleSheet, View, Text, Button,Image, FlatList, TextInput, TouchableOpacity, } from 'react-native';
import { globalStyles } from '../styles/global';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';



import { Picker } from '@react-native-picker/picker';

export default function History({ navigation, route }) {
    const [products, setProducts] = useState([]);

    const getProductName = async (productCode) => {
      const response = await axios.get(`http://3.123.65.51:3000/products/${productCode}`);
      if(response.status === 200) {
        return response.data.name;
      }
    }
    
    const getDetails = async () => {
      try {
        const id = await AsyncStorage.getItem('userID');
        axios.get(`http://3.123.65.51:3000/users/${id}`, {})
          .then(async (response) => {
            const productsHistoryResponse = response.data.productsHistory;
            var productsHistory = [];
            for(i=0;i<productsHistoryResponse.length;i++) {
              const p = await getProductName(productsHistoryResponse[i]);
              productsHistory.push({
                name: p,
                code: productsHistoryResponse[i]
              });
            }
            setProducts(productsHistory);
          });
      } catch (error) {
        // Handle error
        console.log('Error ', error);
      }
    };

    React.useEffect(() => {
      getDetails()
      return () => {};
    }, []);

 

    return (
        
        <View style={{ backgroundColor:'#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', width: 290, height: 400, padding: 20, borderRadius: 10 }}>
            <Text style={{color: 'red', fontSize: 22, textAlign: 'center'}}>Istoric</Text>
            <Text></Text>
            <FlatList data={products}
              renderItem={({ item }) => {
                // getNameProduct(item);
                return(
                <TouchableOpacity onPress={() => navigation.navigate('ProductInfo', {code:item.code})}>
                  <Text style={globalStyles.titleText}>{ item.name }</Text>
                  <Text style={globalStyles.titleText}>{ item.code }</Text>
                  <Text/>
                </TouchableOpacity>)
              }} />
            

            <TouchableOpacity style={{top:10,backgroundColor:'red'}}
              onPress={() => navigation.goBack()}>
              <Text style={globalStyles.buttonText}>   EXIT</Text>
            </TouchableOpacity>
          </View>
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