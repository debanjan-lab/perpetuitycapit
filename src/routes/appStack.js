import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../containers/Dashboard';
import ProfileScreen from '../containers/Profile';
import ProfileDetailsScreen from '../containers/Profile/details';
import ProfileEditScreen from '../containers/Profile/edit';


import CalculateEmiScreen1 from '../containers/Emi/calculator1';
import CalculateEmiScreen2 from '../containers/Emi/calculator2';
import LoanApplyScreen1 from '../containers/Loan/Apply/screen1';
import LoanApplyScreen2 from '../containers/Loan/Apply/screen2';
import LoanApplyScreen3 from '../containers/Loan/Apply/screen3';
import LoanApplyScreen4 from '../containers/Loan/Apply/screen4';
import LoanApplyScreen5 from '../containers/Loan/Apply/screen5';
import LoanApplyScreen6 from '../containers/Loan/Apply/screen6';
import LoanApplyScreen7 from '../containers/Loan/Apply/screen7';
import LoanApplyScreen8 from '../containers/Loan/Apply/screen8';
import LoanApplyFinalScreen from '../containers/Loan/Apply/final';
// import DrawerkNavigator from './drawerNavigation';
import TemporarySavedLoan from '../containers/Loan/temporary';
import AppliedLoan from '../containers/Loan/applied';
import ApprovedLoan from '../containers/Loan/approved';


const Stack = createNativeStackNavigator();

import { TransitionPresets } from '@react-navigation/stack';
const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    headerShown: false
};
const AppStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="DashboardScreen"
            screenOptions={TransitionScreenOptions}
        >
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
            <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
            <Stack.Screen name="CalculateEmiScreen1" component={CalculateEmiScreen1} />
            <Stack.Screen name="CalculateEmiScreen2" component={CalculateEmiScreen2} />
            <Stack.Screen name="LoanApplyScreen1" component={LoanApplyScreen1} />
            <Stack.Screen name="LoanApplyScreen2" component={LoanApplyScreen2} />
            <Stack.Screen name="LoanApplyScreen3" component={LoanApplyScreen3} />
            <Stack.Screen name="LoanApplyScreen4" component={LoanApplyScreen4} />
            <Stack.Screen name="LoanApplyScreen5" component={LoanApplyScreen5} />
            <Stack.Screen name="LoanApplyScreen6" component={LoanApplyScreen6} />
            <Stack.Screen name="LoanApplyScreen7" component={LoanApplyScreen7} />
            <Stack.Screen name="LoanApplyScreen8" component={LoanApplyScreen8} />
            <Stack.Screen name="LoanApplyFinalScreen" component={LoanApplyFinalScreen} />

            <Stack.Screen name="TemporarySavedLoan" component={TemporarySavedLoan} />
            <Stack.Screen name="AppliedLoan" component={AppliedLoan} />
            <Stack.Screen name="ApprovedLoan" component={ApprovedLoan} />

        </Stack.Navigator>
    );
};
export default AppStackNavigator;

