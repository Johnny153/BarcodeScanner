import React, { useState } from 'react';
import axios from 'axios';
import { View, Text,Modal, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Info({route,navigation }) {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [valability, setValability] = useState('');
    const baseUrl = 'http://3.123.65.51:3000';

    const getDetails = async () => {
        const {code} = route.params;
        await axios({
        method: 'get',
        url: `${baseUrl}/products/${code}`,
        }).then((response) => {
            setName(response.data.name);
            setCategory(response.data.category);
            setQuantity(response.data.quantity);
            setValability(response.data.description);
            setPrice(response.data.price);
        });
        
    };

    React.useEffect(() => {
      getDetails()
      return () => {};
    }, []);

    return (
        <>
        
        <View style={{ backgroundColor:'#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', width: 290, height: 400, padding: 20, borderRadius: 10}}>
                  <Text style={{color: 'red', fontSize: 22, textAlign: 'center'}}>Info</Text>
                  
                  <Text style={globalStyles.detailsName}>Denumire: {name}</Text>
                  <Text style={[globalStyles.detailsName,{top:100}]}>Categorie: {category}</Text>
                  <Text style={[globalStyles.detailsName,{top:130}]}>Cantitate: {quantity}</Text>
                  <Text style={[globalStyles.detailsName,{top:160}]}>Pret: {price} lei</Text>
                  <Text style={[globalStyles.detailsName,{top:190}]}>Data expirare: {valability}</Text>
                  

                  <TouchableOpacity style={[globalStyles.exitbutton,{backgroundColor:'green',top:280,borderRadius:20}]}
                   onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.buttonText}>   EXIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
        </>
    );
}