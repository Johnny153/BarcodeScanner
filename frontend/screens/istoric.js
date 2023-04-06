import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Button,Image, TextInput, TouchableOpacity, } from 'react-native';
import { globalStyles } from '../styles/global';

import { Picker } from '@react-native-picker/picker';

export default function Istoric({ navigation }) {
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('  Concediu');
    const onDayPress = (day) => {
        setVisible(false);
      };
      const [category, setCategory] = useState('default');

    return (
        
        <View style={{ backgroundColor:'#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', width: 290, height: 400, padding: 20, borderRadius: 10 }}>
                  <Text style={{color: 'red', fontSize: 22, textAlign: 'center'}}>Istoric</Text>
                  <Text></Text>
                  <TouchableOpacity style={globalStyles.buttonText}
                   onPress={() => setVisible(false)}>
                    <Text style={[globalStyles.buttonText,{color:'black'}]}>Bocanci</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={globalStyles.buttonText}
                   onPress={() => setVisible(false)}>
                    <Text style={[globalStyles.buttonText,{color:'black'}]}>Bluza</Text>
                  </TouchableOpacity>
                  {/* <Picker style={styles.TextInput}
                    selectedValue={category}
                    onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                    <Picker.Item label="Categoria" value="default" />
                    <Picker.Item label="Cardiologie interventionala" value="Cardiologie interventionala" />
                    <Picker.Item label="Cardiologie pediatrica" value="Cardiologie pediatrica" />
                  </Picker> */}
                  <TouchableOpacity style={[globalStyles.buttonText,{top:260,width:120}]}
                   onPress={() => setVisible(true)}>
                    <Text style={globalStyles.buttonText}>   {selectedDate}</Text>
                  </TouchableOpacity>
                  

                  <TouchableOpacity style={{top:30,backgroundColor:'red'}}
                   onPress={() => navigation.navigate('Home')}>
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