import React, { Component } from 'react';
import { View, StyleSheet, Text ,ScrollView} from 'react-native';
import DashboardCard from '../../components/DashboardCard';



import DashboardHeader from '../../components/DashboardHeader';
import Colors from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import PieChart from '../../components/PieChart';
import DashboardProfile from '../../components/DashboardProfile';
import DashboardMyLoan from '../../components/DashboardMyLoan';
import DashboardCalculator from '../../components/DashboardCalculator';
import DashboardApplyLoan from '../../components/DashboardApplyLoan';
import UpcomingPayment from '../Loan/UpcomingPayment';



class DashboardScreen1 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
   
            <View style={styles.container}>
                <DashboardHeader navigation={this.props.navigation} />
               <ScrollView  contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
               <DashboardProfile navigation={this.props.navigation} />
               <DashboardMyLoan navigation={this.props.navigation} />
               <View style={{ flexDirection: 'row' }}>
                   <DashboardCalculator navigation={this.props.navigation}  />
                   <DashboardApplyLoan navigation={this.props.navigation} />
               </View>
               <UpcomingPayment props={this.props}/>
               </ScrollView>
                
            </View>
            

        )
    }
}

export default DashboardScreen1;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },

})


