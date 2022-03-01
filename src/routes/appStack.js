import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../containers/Dashboard';
import DashboardScreen1 from '../containers/Dashboard1';
import ProfileScreen from '../containers/Profile';
import ProfileDetailsScreen from '../containers/Profile/details';
import ProfileDetailsScreen1 from '../containers/Profile/details1';
import ProfileEditScreen from '../containers/Profile/edit';


import CalculateEmiScreen1 from '../containers/Emi/calculator1';
import CalculateEmi1Screen1 from '../containers/Emi1/calculator1';
import CalculateEmiScreen2 from '../containers/Emi/calculator2';
import LoanApplyScreen1 from '../containers/Loan/Apply/screen1';
import ApplyScreen1 from '../containers/Loan/Apply/page1';
import LoanApplyScreen2 from '../containers/Loan/Apply/screen2';
import ApplyScreen2 from '../containers/Loan/Apply/page2';
import LoanApplyScreen3 from '../containers/Loan/Apply/screen3';
import ApplyScreen3 from '../containers/Loan/Apply/page3';
import LoanApplyScreen4 from '../containers/Loan/Apply/screen4';
import ApplyScreen4 from '../containers/Loan/Apply/page4';
import LoanApplyScreen5 from '../containers/Loan/Apply/screen5';
import LoanApplyScreen6 from '../containers/Loan/Apply/screen6';
import LoanApplyScreen7 from '../containers/Loan/Apply/screen7';
import LoanApplyScreen8 from '../containers/Loan/Apply/screen8';
import LoanApplyFinalScreen from '../containers/Loan/Apply/final';
// import DrawerkNavigator from './drawerNavigation';
import TemporarySavedLoan from '../containers/Loan/temporary';
import AppliedLoan from '../containers/Loan/applied';
import ApprovedLoan from '../containers/Loan/approved';
import LoanDetails from '../containers/Loan/loandetails';
import LoanDetails1 from '../containers/Loan/loandetails1';
import ActiveLoanDetails from '../containers/Loan/ActiveLoanDetails';
import MyLoan from '../containers/Loan/MyLoan';
import TransactionHistory from '../containers/Loan/transactionHistory';
import IndividualTransaction from '../containers/Loan/individualTransaction';

import AboutUs from '../containers/AboutUs';
import AboutUs1 from '../containers/AboutUs1';
import HowItWorks from '../containers/HowItWorks';
import ContactUs from '../containers/ContactUs';
import ContactUs1 from '../containers/ContactUs1';

import TermsConditions from '../containers/TermsConditions';
import PrivacyPolicy from '../containers/PrivacyPolicy';


const Stack = createNativeStackNavigator();

import { TransitionPresets } from '@react-navigation/stack';
import Pay from '../pay';
import NotificationScreen from '../components/notificationScreen';
const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    headerShown: false
};
const AppStackNavigator = () => {
    return (
        // <Stack.Navigator
        //     initialRouteName="DashboardScreen"
        //     screenOptions={TransitionScreenOptions}
        // >
        <Stack.Navigator
        initialRouteName="DashboardScreen1"
        screenOptions={TransitionScreenOptions}
    >
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="DashboardScreen1" component={DashboardScreen1} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
            <Stack.Screen name="ProfileDetailsScreen1" component={ProfileDetailsScreen1} />
            <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
            <Stack.Screen name="CalculateEmiScreen1" component={CalculateEmiScreen1} />
            <Stack.Screen name="CalculateEmi1Screen1" component={CalculateEmi1Screen1} />
            <Stack.Screen name="CalculateEmiScreen2" component={CalculateEmiScreen2} />
            <Stack.Screen name="LoanApplyScreen1" component={LoanApplyScreen1} />
            <Stack.Screen name="ApplyScreen1" component={ApplyScreen1} />
            <Stack.Screen name="LoanApplyScreen2" component={LoanApplyScreen2} />
            <Stack.Screen name="ApplyScreen2" component={ApplyScreen2} />
            <Stack.Screen name="LoanApplyScreen3" component={LoanApplyScreen3} />
            <Stack.Screen name="ApplyScreen3" component={ApplyScreen3} />
            <Stack.Screen name="LoanApplyScreen4" component={LoanApplyScreen4} />
            <Stack.Screen name="ApplyScreen4" component={ApplyScreen4} />
            <Stack.Screen name="LoanApplyScreen5" component={LoanApplyScreen5} />
            <Stack.Screen name="LoanApplyScreen6" component={LoanApplyScreen6} />
            <Stack.Screen name="LoanApplyScreen7" component={LoanApplyScreen7} />
            <Stack.Screen name="LoanApplyScreen8" component={LoanApplyScreen8} />
            <Stack.Screen name="LoanApplyFinalScreen" component={LoanApplyFinalScreen} />

            <Stack.Screen name="TemporarySavedLoan" component={TemporarySavedLoan} />
            <Stack.Screen name="AppliedLoan" component={AppliedLoan} />
            <Stack.Screen name="ApprovedLoan" component={ApprovedLoan} />
            <Stack.Screen name="LoanDetails" component={LoanDetails} />
            <Stack.Screen name="LoanDetails1" component={LoanDetails1} />
            <Stack.Screen name="ActiveLoanDetails" component={ActiveLoanDetails} />
            <Stack.Screen name="MyLoan" component={MyLoan} />

            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="AboutUs1" component={AboutUs1} />
            <Stack.Screen name="HowItWorks" component={HowItWorks} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="ContactUs1" component={ContactUs1} />

            <Stack.Screen name="TermsConditions" component={TermsConditions} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
            <Stack.Screen name="IndividualTransaction" component={IndividualTransaction} />
            <Stack.Screen name="Pay" component={Pay} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
              
        </Stack.Navigator>
    );
};
export default AppStackNavigator;

