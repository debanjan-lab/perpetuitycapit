import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import RegistrationScreen from './src/screens/login/RegistrationScreen';
import OtpScreen from './src/screens/login/OtpScreen';
import PersonalDetailsScreen from './src/screens/applyloan/PersonalDetailsScreen';
import ApplyLoanScreen from './src/screens/applyloan/ApplyLoanScreen';
import { DrawerContent } from './src/screens/applyloan/DrawerContentScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  const DrawerStack = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        initialRouteName="ApplyLoanScreen"
      >
        <Drawer.Screen name="ApplyLoanScreen" component={ApplyLoanScreen} options={{
          headerShown: false,
        }} />
        {/* <Drawer.Screen name="AccountScreen" component={AccountScreen} options={{
                headerShown: false,
            }} />
            <Drawer.Screen name="BookingHistoryScreen" component={BookingHistoryScreen} options={{
                headerShown: false,
            }} /> */}
      </Drawer.Navigator>
    );
  };


  const ApplyLoanStack = () => {
    return (
      <Stack.Navigator initialRouteName="PersonalDetailsScreen">
        <Stack.Screen
          name="PersonalDetailsScreen"
          component={PersonalDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DrawerStack"
          component={DrawerStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ApplyLoanStack"
          component={ApplyLoanStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
