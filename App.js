import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, } from 'react-native';
import ThreadMenu from './screens/ThreadMenu'
import Home from './screens/Home'
import NewThread from './screens/NewThread';
import Thread from './screens/Thread';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import React, { useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { io } from 'socket.io-client';



const Stack = createNativeStackNavigator();

function GlobalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        headerShown={false}
        options={{ headerMode: 'none', headerShown: false }}
      />
      <Stack.Screen
        name="Thread"
        component={Thread}
      />
      <Stack.Screen
              name="ThreadMenu"
              component={ThreadMenu}
            />
      <Stack.Screen
              name="Login" // Add this line
              component={LoginScreen} // Add this line
            />
    </Stack.Navigator>
  )
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}



const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
       <Drawer.Screen name="Home" component={Home}
       options={{
          drawerIcon: config => <Icon
            size={23}
            name={'home-outline'}></Icon>
          }}/>

      <Drawer.Screen name="Login" component={LoginScreen}
      options={{
          drawerIcon: config => <Icon
            size={23}
            name={'log-in-outline'}></Icon>
          }}/>
          <Drawer.Screen name="Register" component={RegisterScreen}
                options={{
                    drawerIcon: config => <Icon
                      size={23}
                      name={'ios-person-outline'}></Icon>
                    }}/>



    </Drawer.Navigator>
  );
}

export default function App() {

  return (

    <NavigationContainer>
      <GlobalStack />
    </NavigationContainer>


  );

}
