import React, { useState } from 'react';
import { View, Text,Modal, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Setari({ navigation }) {
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
                   onPress={() => setVisible(false)}>
                    <Text style={[globalStyles.buttonText,{color:'black'}]}>      Pacienți</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={globalStyles.buttonText}
                   onPress={() => setVisible(false)}>
                    <Text style={[globalStyles.buttonText,{color:'black'}]}>   Programări</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={globalStyles.buttonText}
                   onPress={() => setVisible(true)}>
                    <Text style={[globalStyles.buttonText,{color:'black'}]}>   {selectedDate}</Text>
                  </TouchableOpacity>
                  

                  <TouchableOpacity style={{top:40, backgroundColor:'red'}}
                   onPress={() => navigation.navigate('Home')}>
                    <Text style={globalStyles.buttonText}>   EXIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
    );
}