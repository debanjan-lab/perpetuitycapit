import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthRegistrationScreen from '../containers/Auth/registration';
import AuthLoginScreen from '../containers/Auth/login';
import AuthLoginScreen1 from '../containers/Auth/login1';
import AuthOtpScreen from '../containers/Auth/otp';
import OtpScreen from '../containers/Auth/otpscreen';
import PhoneScreen from '../containers/Auth/phonescreen';
import UploadImage from '../containers/Test/uploadImage';
import UploadFile from '../upload';
import Slider from '../components/Slider';
import Swiper from '../components/Swiper';
const Stack = createNativeStackNavigator();
const AuthStackNavigator = () => {
  return (
    // <Stack.Navigator
    //   initialRouteName="AuthLoginScreen"
    //   screenOptions={{ headerShown: false }}
    // >
    <Stack.Navigator
      initialRouteName="AuthLoginScreen1"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthRegistrationScreen" component={AuthRegistrationScreen} />
      <Stack.Screen name="AuthLoginScreen" component={AuthLoginScreen} />
      <Stack.Screen name="AuthLoginScreen1" component={AuthLoginScreen1} />
      <Stack.Screen name="AuthOtpScreen" component={AuthOtpScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
      <Stack.Screen name="UploadImage" component={UploadImage} />
      <Stack.Screen name="UploadFile" component={UploadFile} />
      <Stack.Screen name="Slider" component={Slider} />
      <Stack.Screen name="Swiper" component={Swiper} />
      
      
    </Stack.Navigator>
  );
};
export default AuthStackNavigator;

