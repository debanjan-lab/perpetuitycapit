import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './routes/authStack';
import AppStackNavigator from './routes/appStack';
import DrawerkNavigator from './routes/drawerNavigation';
import { checkAuth } from './redux/actions/AuthActions';
import SplashScreen from 'react-native-splash-screen'
const App = () => {
  const authState = useSelector((state) => state.auth)
  console.log("auth================", authState)

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
    setTimeout(() => {
      SplashScreen.hide()
      setLoading(false)
    }, 1000)
  }, [dispatch])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={"#1A5632"} size={"large"} />
      </View>

    )
  }
  return (
    // <NavigationContainer>
    //   {authState.api_token == null ? <AuthStackNavigator /> : <DrawerkNavigator />}
    // </NavigationContainer>
    <NavigationContainer>
    {authState.api_token == null ? <DrawerkNavigator /> : <DrawerkNavigator />}
  </NavigationContainer>
  );
};
export default App;