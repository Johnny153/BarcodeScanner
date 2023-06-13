import { StatusBar, StyleSheet, View, Text, Button,Image,Modal, FlatList, TextInput, TouchableOpacity, } from 'react-native';
import { globalStyles } from '../styles/global';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';


export default function ManageProducts({ navigation, route }) {
    const [products, setProducts] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [sortProductsList, setSortProductsList] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [category, setCategory] = useState('');
    const [visibleModal, setVisibleModal] = useState(false);

    const getProductName = async (productCode) => {
      const response = await axios.get(`http://3.123.65.51:3000/products/${productCode}`);
      if(response.status === 200) {
        return response.data.name;
      }
    }

    const handleSearch = (text) => {
        setSearchQuery(text);
      };
    
      const handleFinalSearch= () => {
        filterProductsByName(searchQuery)
      };
    
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

    const deleteProduct=async(productCode) => {
        try {
            await axios.delete(`http://3.123.65.51:3000/products/${productCode}`)
          } catch (error) {
            console.log('Error deleting product from the DataBase:', error);
          }
          setVisibleModal(false)
    }

    const filterProductsByName=(inputName) => {
        const filteredProducts = productsList.filter((product) =>
        product.name.toLowerCase().includes(inputName.toLowerCase())
      );
      setSortProductsList(filteredProducts);
    }

    const filterProductsByCategories=(inputCategories) => {
        setCategory(inputCategories)
        let filteredProducts = [];
        if (inputCategories.toLowerCase() === 'toate') {
          filteredProducts = productsList;
        } else {
          filteredProducts = productsList.filter((product) =>
            product.category.toLowerCase().includes(inputCategories.toLowerCase())
          );
        }
        setSortProductsList(filteredProducts);
      };

    React.useEffect(() => {
      getAllProducts()
      return () => {};
    }, []);

 

    return (
        
        <View style={{ backgroundColor:'#000000aa', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ width: '100%', height: 50,marginBottom:10, alignItems:'center',flexDirection: 'row'}}>
                <Text style={{color:'white',fontSize: 32, textAlign: 'center',marginLeft: 40}}>Produse</Text>
                <View style={{ borderRadius: 20, backgroundColor:'green',width: 120, height: 55,marginTop:10,marginLeft:60,alignItems:'center'}}>
                    <Picker style={{color:'white', width: 150, height: 50}}
                        selectedValue={category}
                        onValueChange={(itemValue, itemIndex) => filterProductsByCategories(itemValue)}>
                        <Picker.Item label="Sortare" value="Sortare"  style={{ fontSize: 18 }}/>
                        <Picker.Item label="Uniforma" value="Uniforma" />
                        <Picker.Item label="Haine" value="Haine" />
                        <Picker.Item label="Igiena" value="Igiena" />
                        <Picker.Item label="Toate" value="Toate" />
                    </Picker>
                </View>
            </View>
            <SearchBar style={{}}
                placeholder="Caută..."
                onChangeText={(q) => {
                setSearchQuery(q)
                }}
                value={searchQuery}
                onSubmitEditing={handleFinalSearch}
                containerStyle={{ borderRadius: 30, width: '80%',height: 55, backgroundColor: '#C0C0C0' }}
                inputStyle={{ borderRadius: 30,backgroundColor: '#D0D0D0'}}
                inputContainerStyle={{ borderRadius: 30,height: 40,backgroundColor: '#D0D0D0'}}
            />
            <View style={{ backgroundColor: 'white', width: 290, height: 300, padding: 20, borderRadius: 10,marginTop:10, alignItems:'center'}}>
                <FlatList data={sortProductsList}
                renderItem={({ item }) => {
                    return(
                    <View style={{ backgroundColor: '#F4FEFE', width: 350, height: 50, borderRadius: 10, alignItems:'center',flexDirection: 'row'}}>
                        <TouchableOpacity style={{backgroundColor:'green',marginTop: 10,marginRight:5,alignItems:'center',borderRadius:20,width: 180,height: 35}}
                        onPress={() => navigation.navigate('ProductInfo', {code:item.code})}>
                            <Text style={{color:'white',textAlign: 'center',fontSize:22}}>{ item.name }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'red',marginTop: 10,alignItems:'center',marginRight:5,borderRadius:20,width: 30,height: 35}}
                        onPress={() =>setVisibleModal(true)}>
                            <Text style={{color:'white',textAlign: 'center',fontSize:16}}>D</Text>
                        </TouchableOpacity>
                        <Modal visible={visibleModal} animationType="fade" transparent={true}>
                            <View style={{ backgroundColor:'#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', width: 290, height: 400, padding: 20, borderRadius: 10 }}>
                                <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>Sunteti sigur ca doriti sa stergeti acest produs?</Text>
                                <Text></Text>
                                <View style={{ width: '100%', height: 50,marginBottom:10, alignItems:'center',flexDirection: 'row'}}>
                                    <TouchableOpacity style={{backgroundColor:'red',left:50}}
                                    onPress={() =>deleteProduct(item.code)}>
                                        <Text style={globalStyles.buttonText}>DA</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[globalStyles.exitbutton,{backgroundColor:'grey',left:100}]}
                                    onPress={() =>setVisibleModal(false)}>
                                        <Text style={globalStyles.buttonText}>NU</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity style={{backgroundColor:'blue',marginTop: 10,alignItems:'center',borderRadius:20,width: 30,height: 35}}
                        onPress={() => navigation.navigate('ModifyProduct', {code:item.code})}>
                            <Text style={{color:'white',textAlign: 'center',fontSize:16}}>M</Text>
                        </TouchableOpacity>
                    </View>)
                }} />
              </View>
            

            <TouchableOpacity style={{backgroundColor:'red',marginTop: 20,width: 150,height: 45,borderRadius:10}}
              onPress={() => navigation.navigate('Setting')}>
              <Text style={globalStyles.buttonText}> EXIT</Text>
            </TouchableOpacity>
        </View>
    );
}




const styles = StyleSheet.create({
    
    // container: {
    //   flex: 1,
    //   backgroundColor: "#fff",
    //   alignItems: "center",
    //   justifyContent: "center",
    // },
    // registerView:{
    //   flexDirection: 'row',
    // },
    // image: {
    //   justifyContent: 'center',
    //   paddingTop: 16,
    //   marginTop: 16,
    //   borderTopWidth: 1,
    //   borderTopColor: '#eee',
    //   width: 150,
    //   height: 150,
    // },
    // inputView: {
    //   backgroundColor: "#66AAFF",
    //   borderRadius: 30,
    //   width: "70%",
    //   height: 45,
    //   marginBottom: 10,
    //   alignItems: "center",
    // },
    // TextInput: {
    //   height: 50,
    //   flex: 1,
    //   padding: 10,
    //   marginLeft: 20,
    // },
    // registerText: {
    //   flexDirection: 'row',
    //   height: 30,
    //   marginBottom: 30,
    // },
    // register_button: {
    //   flexDirection: 'row',
    //   height: 30,
    //   marginBottom: 30,
    //   color: "#3333FF",
    //   fontWeight: "bold",
    // },
    // registerBtn: {
    //   width: "80%",
    //   borderRadius: 25,
    //   height: 50,
    //   alignItems: "center",
    //   justifyContent: "center",
    //   marginTop: 20,
    //   backgroundColor: "#FF1493",
    // },
  });