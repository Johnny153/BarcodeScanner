import React, { useState } from 'react';
import { StatusBar, StyleSheet, Modal, View, Text, Button,Image, TextInput, TouchableOpacity, } from 'react-native';
import { globalStyles } from '../styles/global';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';


export default function Creeaza({ navigation }) {

    const pressHandler = () => {
        navigation.goBack();
        }

    const pressOk = () => {
        setVisible(false);
        navigation.navigate('Home')
    }

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        setVisibleDate(false);
        };
        
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Categoria');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [valability, setValability] = useState('');
    const [barcode, setBarcode] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [visible, setVisible] = useState(false);
    const [visibleDate, setVisibleDate] = useState(false);

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Denumire produs"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          /> 
        </View>

        <View style={[styles.inputView,{alignItems: "center"}]}>
          <Picker style={[styles.inputView,{color:"#003f5c"}]}
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
            <Picker.Item label="Categoria" value="optiune1" />
            <Picker.Item label="Uniforma" value="Uniforma" />
            <Picker.Item label="Igiena" value="Igiena" />
          </Picker>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Cod de bare"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(barcode) => setBarcode(barcode)}
          /> 
        </View >

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Cantitate"
            placeholderTextColor="#003f5c"
            onChangeText={(quantity) => setQuantity(quantity)}
          /> 
        </View>
       
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Pret"
            placeholderTextColor="#003f5c"
            onChangeText={(price) => setPrice(price)}
          /> 
        </View>

        <View style={styles.inputView}>
            <TouchableOpacity style={{top:18, left:30}}
                onPress={() => setVisibleDate(true)}>
                <Text style={{ color:'#003f5c',fontSize: 16, left: 20}}>Data expirare: {selectedDate}</Text>
            </TouchableOpacity>
            <Modal visible={visibleDate} animationType="fade" transparent={true}>
               <Calendar onDayPress={onDayPress} />
            </Modal>
        </View >
        
        <TouchableOpacity style={styles.registerBtn} 
            onPress={() =>setVisible(true)}>
          <Text style={styles.loginText}>SUBMIT</Text> 
        </TouchableOpacity>
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={{ backgroundColor:'#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', width: 290, height: 400, padding: 20, borderRadius: 10 }}>
                    <Text style={{color:'black'}}>Produs adaugat cu succes</Text>

                    <TouchableOpacity style={[globalStyles.exitbutton,{backgroundColor:'green',top:300}]}
                    onPress={() =>pressOk()}>
                    <Text style={globalStyles.buttonText}>    OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal> 
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
    width: "80%",
    height: 60,
    marginBottom: 10,
  },
  TextInput: {
    height: 60,
    flex: 1,
    padding: 10,
    marginLeft: 40,
    fontSize: 16,
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