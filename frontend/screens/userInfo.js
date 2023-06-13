import React, { useState } from 'react';
import axios from 'axios';
import { View, Text,Modal, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { AsyncStorage } from 'react-native';

export default function UserInfo({route,navigation }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const baseUrl = 'http://3.123.65.51:3000';

    const getDetails = async () => {
        const {response} = route.params;
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setRole(response.data.role);
        setEmail(response.data.email);
    };

    const pressLogOut= ()=>{
      const role='guest'
      AsyncStorage.setItem('userRole', role)
      navigation.navigate('Home')
    }

    React.useEffect(() => {
      getDetails()
      return () => {};
    }, []);

    return (
        <>
        
        <View style={{ backgroundColor:'#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', width: 290, height: 400, padding: 20, borderRadius: 10}}>
                  <TouchableOpacity style={[{backgroundColor:'green',width: 90,left: 160,borderRadius:20}]}
                   onPress={() => pressLogOut()}>
                    <Text style={globalStyles.buttonText}>LOG OUT</Text>
                  </TouchableOpacity>
                  <Text style={{color: 'red', fontSize: 22, textAlign: 'center'}}>Info</Text>
                  
                  <Text style={globalStyles.detailsName}>First name: {firstName}</Text>
                  <Text style={[globalStyles.detailsName,{top:100}]}>Last name: {lastName}</Text>
                  <Text style={[globalStyles.detailsName,{top:130}]}>Email: {email}</Text>
                  <Text style={[globalStyles.detailsName,{top:160}]}>Role: {role}</Text>

                  <TouchableOpacity style={[globalStyles.exitbutton,{backgroundColor:'green',top:250,borderRadius:20}]}
                   onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.buttonText}>   EXIT</Text>
                  </TouchableOpacity>
                  
                </View>
              </View>
        </>
    );
}