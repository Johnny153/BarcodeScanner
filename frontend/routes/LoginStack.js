// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
import React from 'react';
import Home from '../screens/home';
import HomeLogin from '../screens/homeLogin';
import Login from '../screens/login';
import Register from '../screens/register';
import Info from '../screens/info';
import InfoUser from '../screens/infoUser';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

// inside your component
export default function LoginScreen({ navigation }) {

  return(
        <>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="InfoUser" component={InfoUser} />
          <Stack.Screen name="HomeLogin" component={HomeLogin} />
        </Stack.Navigator>
        </>
  );
}
