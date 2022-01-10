import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthRegistrationScreen from '../containers/Auth/registration';
import AuthLoginScreen from '../containers/Auth/login';
import AuthOtpScreen from '../containers/Auth/otp';
import UploadImage from '../containers/Test/uploadImage';
import UploadFile from '../upload';
const Stack = createNativeStackNavigator();
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthLoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthRegistrationScreen" component={AuthRegistrationScreen} />
      <Stack.Screen name="AuthLoginScreen" component={AuthLoginScreen} />
      <Stack.Screen name="AuthOtpScreen" component={AuthOtpScreen} />
      <Stack.Screen name="UploadImage" component={UploadImage} />
      <Stack.Screen name="UploadFile" component={UploadFile} />
    </Stack.Navigator>
  );
};
export default AuthStackNavigator;

