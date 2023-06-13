import React, { useState , useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Modal, Image, Button, TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import { AsyncStorage } from 'react-native';


// Screens
import Setting from '../screens/setting';
import LoginScreen from './LoginStack';
import History from '../screens/history';
import AddProduct from '../screens/addProduct';


//Screen names
const setting = "Setări"
const acasa = "Acasă"
const addProduct = "Adaugă"
const history = "Istoric"

const Tab = createBottomTabNavigator();




function MainContainer({navigation,route}) {

  const [visible, setVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const getRole = async () =>{
    const role = await AsyncStorage.getItem('userRole');
    if(role==='administrator')
    {
      setIsAdmin(true)
      setIsClient(false)
    }
    else if(role==='client')
    {
      setIsClient(true)
      setIsAdmin(false)
    }
    else
    {
      setIsClient(false)
      setIsAdmin(false)
    }
  }
  

  React.useEffect(() => {
    getRole()
    return () => {};
  }, []);

  // Set an interval to periodically check for value changes
  setInterval(getRole, 1000);

  if(isAdmin){
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
              } else if (rn === addProduct) {
                iconName = focused ? 'add' : 'add-outline';
              } else if (rn === history) {
                iconName = focused ? 'history' : 'history-outline';
              } else if (rn === setari) {
                iconName = focused ? 'settings' : 'settings-outline';
              }



              // You can return any component that you like here!
            // return <Ionicons name={iconName} size={size} color={color} />;
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
          <Tab.Screen name={addProduct} component={AddProduct} options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                // disabled={isAdmin ? false : true}
                style={{ left:90,opacity: 1 }}
              />
            ),
          }}/>
          <Tab.Screen name={history} component={History} options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                disabled={false}
                style={{left:150, opacity: 1 }}
              />
            ),
          }}/>
          <Tab.Screen name={setting} component={Setting} options={{
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

   else if(isClient)
   {
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
              } else if (rn === addProduct) {
                iconName = focused ? 'add' : 'add-outline';
              } else if (rn === history) {
                iconName = focused ? 'history' : 'history-outline';
              } else if (rn === setari) {
                iconName = focused ? 'settings' : 'settings-outline';
              }
  
  
  
              // You can return any component that you like here!
             // return <Ionicons name={iconName} size={size} color={color} />;
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
          <Tab.Screen name={addProduct} component={AddProduct} options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                disabled={true}
                style={{ left:90,opacity: 0.3 }}
              />
            ),
          }}/>
          <Tab.Screen name={history} component={History} options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                disabled={false}
                style={{left:150, opacity: 1 }}
              />
            ),
          }}/>
          <Tab.Screen name={setting} component={Setting} options={{
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

   else {
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
              } else if (rn === addProduct) {
                iconName = focused ? 'add' : 'add-outline';
              } else if (rn === history) {
                iconName = focused ? 'history' : 'history-outline';
              } else if (rn === setari) {
                iconName = focused ? 'settings' : 'settings-outline';
              }
  
  
  
              // You can return any component that you like here!
             // return <Ionicons name={iconName} size={size} color={color} />;
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
          <Tab.Screen name={addProduct} component={AddProduct} options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                disabled={true}
                style={{ left:90,opacity: 0.3 }}
              />
            ),
          }}/>
          <Tab.Screen name={history} component={History} options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                disabled={true}
                style={{left:150, opacity: 0.3 }}
              />
            ),
          }}/>
          <Tab.Screen name={setting} component={Setting} options={{
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
}

export default MainContainer;