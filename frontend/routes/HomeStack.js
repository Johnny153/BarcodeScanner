import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Modal, Image, Button, TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/global';

// Screens
import Setari from '../screens/setari';
import LoginScreen from './LoginStack';
import Istoric from '../screens/istoric';
import Creeaza from '../screens/creeaza';


//Screen names
const setari = "Setari"
const acasa = "Acasa"
const creeaza = "Creaza"
const istoric = "Istoric"

const Tab = createBottomTabNavigator();




function MainContainer() {

  const [visible, setVisible] = useState(false);
  return (
    <>
    <NavigationContainer >
      <Tab.Navigator 
        initialRouteName={acasa}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === acasa) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === creeaza) {
              iconName = focused ? 'create' : 'create-outline';
            } else if (rn === istoric) {
              iconName = focused ? 'history' : 'history-outline';
            } else if (rn === setari) {
              iconName = focused ? 'settings' : 'settings-outline';
            }



            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        screenOptions={{
          //headerTitle: () => <CustomHeader />,
          headerRight: () => (
            <>
           
            </>
          ),
          headerShown: false,
          headerStyle:{height:80},
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
          },
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}>

        <Tab.Screen name={acasa} component={LoginScreen} options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{left:30 }}
            />
          ),
        }}/>
        <Tab.Screen name={creeaza} component={Creeaza} options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              disabled={false}
              style={{ left:90,opacity: 1 }}
            />
          ),
        }}/>
        <Tab.Screen name={istoric} component={Istoric} options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              disabled={false}
              style={{left:150, opacity: 1 }}
            />
          ),
        }}/>
        <Tab.Screen name={setari} component={Setari} options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{ left:210 }}
            />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>

        <View>
      
    </View>


    </>
  );
}

export default MainContainer;