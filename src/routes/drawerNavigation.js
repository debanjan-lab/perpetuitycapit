import * as React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import {
    View,
} from 'react-native';
// import DashboardScreen from '../containers/Dashboard';
import AppStackNavigator from './appStack';
import CustomDrawer from '../components/CustomDrawer';
import CustomDrawer1 from '../components/CustomDrawer1';
const Drawer = createDrawerNavigator();
const DrawerkNavigator = () => {
    return (
        // <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Navigator screenOptions={{ headerShown: false ,drawerPosition:"right"}} drawerContent={(props) => <CustomDrawer1 {...props} />}>
            <Drawer.Screen name="AppStackNavigator" component={AppStackNavigator} />
        </Drawer.Navigator>
    );
}
export default DrawerkNavigator;