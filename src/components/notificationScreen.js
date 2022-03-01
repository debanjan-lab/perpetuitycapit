import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import DashboardCard from './DashboardCard';
import DashboardHeader from './DashboardHeader';
import DashboardHeaderInner from './DashboardHeaderInner';


 const notificationScreen =(props) => {
  return (
    <View style={styles.container}>
    <DashboardHeader  navigation1={props.navigation}/>
    <DashboardHeaderInner
    headerText="Notification"
    navigation={props.navigation}
    goBack={true}/>
 
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:40,marginVertical:20}}>
    <Text>New</Text>
    <Text>Clear All</Text>
    </View>
    <DashboardCard>
    <Text>Apply for commercial line today</Text>
    </DashboardCard>
    
    <DashboardCard>
    <View style={{backgroundColor:Colors.greenColor}}>
    </View>
    </DashboardCard>
    
    </View>
  )
}
export default notificationScreen;


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.whiteColor,
    },

})


// <View style={{flexDirection:'row',justifyContent:'center',marginVertical:20}}>
// <Text style={{color:Colors.mainTextColor,fontWeight:'bold',fontSize:20}}>Notification</Text>
// </View>