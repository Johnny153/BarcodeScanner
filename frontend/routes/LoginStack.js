// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
import React from 'react';
import Home from '../screens/home';
import HomeLogin from '../screens/homeLogin';
import Login from '../screens/login';
import Register from '../screens/register';
import ProductInfo from '../screens/productInfo';
import UserInfo from '../screens/userInfo';
import ManageProducts from '../screens/manageProducts';
import ModifyProduct from '../screens/modifyProduct';
import Setting from '../screens/setting';
import GenerateRaport from '../screens/generateRaport';
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
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="HomeLogin" component={HomeLogin} />
          <Stack.Screen name="ManageProducts" component={ManageProducts} />
          <Stack.Screen name="ModifyProduct" component={ModifyProduct} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="GenerateRaport" component={GenerateRaport} />
        </Stack.Navigator>
        </>
  );
}
