import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ApplyLoanScreen from './ApplyLoanScreen';
// import AccountScreen from './AccountScreen';
// import BookingHistoryScreen from './BookingHistoryScreen';
import { DrawerContent } from './DrawerContentScreen';


const Drawer = createDrawerNavigator();

export default function App() {
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
}