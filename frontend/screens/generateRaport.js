import { StatusBar, StyleSheet, View, Text, Button,Image, Alert, Pressable, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Picker } from '@react-native-picker/picker';


export default function GenerateRaport({ navigation }) {

  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);

  const [products, setProducts] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [sortProductsList, setSortProductsList] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [category, setCategory] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);


  const getAllProducts=async() =>{
    try {
        axios.get(`http://3.123.65.51:3000/products/`, {})
          .then(async (response) => {
            setProductsList(response.data);
            setSortProductsList(response.data);
          });
      } catch (error) {
        console.log('Error retrieving product from DataBase:', error);
      }
}


  const orderLines = [
    {
      id: 1,
      productName: 'Product 1',
      UM: '-buc-',
      quantity:30,
      price: 10.00,
      totalPrice: 0
    },
    {
        id: 2,
        productName: 'Product 2',
        UM: '-buc-',
        quantity:43,
        price: 17.50,
        totalPrice: 0
    },
    {
        id: 3,
        productName: 'Product 3',
        UM: '-buc-',
        quantity:129,
        price: 90.99,
        totalPrice: 0
    },
  ];

  orderLines.forEach((line) => {
    line.totalPrice = line.quantity * line.price; // Calculăm prețul total pentru linie și actualizăm proprietatea totalPrice
  });

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const html = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica';
                font-size: 12px;
              }
              header, footer {
                height: 50px;
                background-color: #fff;
                color: #000;
                display: flex;
                justify-content: center;
                padding: 0 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 5px;
              }
              th {
                background-color: #ccc;
              }
              footer {
                margin-top: 30px;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>Factura numarul #${count}</h1>
            </header>
            <h1>Detalii factura</h1>
            <table>
              <tr>
                <th>Emis de catre</th>
                <td>Academia Tehnica militara 'Ferdinand I'</td> 
              </tr>
              <tr>
                <th>Din data de</th>
                <td>29-Jul-2022</td>
              </tr>
              <tr>
                <th>Pana in data de</th>
                <td>13-May-2023</td>
              </tr>
            </table>
            <h1>Categorie: Categorie 1</h1>
            <table>
              <tr>
                <th>Nr. crt.</th>
                <th>Denumire produs</th>
                <th>U.M.</th>
                <th>Cantitate</th>
                <th>Pret unitar</th>
                <th>Pret total</th>
              </tr>
              <tr>
                <th></th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5(3x4)</th>
              </tr>
              ${orderLines
                .map(
                  line => `
                <tr>
                  <td>${line.id}</td>
                  <td>${line.productName}</td>
                  <td>${line.UM}</td>
                  <td>${line.quantity}</td>
                  <td>${line.price}</td>
                  <td>${line.totalPrice}</td>
                </tr>
              `,
                )
                .join('')}
            </table>
            <div style="clear: both">
                <h1 style="float: left">TOTAL:</h1>
                <h1 style="float: right">$1360</h1>
            </div>
            <footer>
              <p>Multumim ca ati cumparat de la noi!</p>
            </footer>
          </body>
        </html>
      `;
      const options = {
        html,
        fileName: `factura_${count}`,
        directory: 'Facturi',
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);
      setCount(count + 1);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (isLoading) {
    return <Text>Generating PDF...</Text>;
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => generatePDF()}>
        <Text style={styles.text}>Generate PDF</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aac',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  button: {
    backgroundColor: '#6c8ee3',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
});


