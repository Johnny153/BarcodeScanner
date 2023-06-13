import { StatusBar, StyleSheet, View, Text, Button,Image, FlatList, TextInput, TouchableOpacity, } from 'react-native';
import { globalStyles } from '../styles/global';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';



import { Picker } from '@react-native-picker/picker';


export default function Setting({ navigation }) {
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('  Concediu');
    const onDayPress = (day) => {
        setVisible(false);
      };

    return (
        
        <View style={{ backgroundColor:'#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', width: 290, height: 400, padding: 20, borderRadius: 10 }}>
                  <Text style={{color: 'red', fontSize: 22, textAlign: 'center'}}>Setări</Text>
                  <Text></Text>
                  <TouchableOpacity style={globalStyles.buttonText}
                   onPress={() => navigation.navigate('ManageProducts')}>
                    <Text style={[globalStyles.buttonText,{color:'black', fontSize:17}]}>  Gestionare produse</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={globalStyles.buttonText}
                   onPress={() => navigation.navigate('GenerateRaport')}>
                    <Text style={[globalStyles.buttonText,{color:'black', fontSize:17}]}>   Rapoarte</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={globalStyles.buttonText}
                   onPress={() => setVisible(true)}>
                    <Text style={[globalStyles.buttonText,{color:'black'}]}>   {selectedDate}</Text>
                  </TouchableOpacity>
                  

                  <TouchableOpacity style={{top:50, backgroundColor:'red', borderRadius:10}}
                   onPress={() => navigation.navigate('Home')}>
                    <Text style={globalStyles.buttonText}>   EXIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
    );
}