import React from 'react';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'


const DashboardCalculator = ({navigation}) => {
  return (
   
    <View style={styles.wrapper1}>
    <TouchableOpacity onPress={() => navigation.navigate('CalculateEmi1Screen1')}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View><Text style={{color:Colors.mainTextColor}}>EMI Calculator</Text></View>
    <View style={{marginTop:3}}><AntDesign name='rightcircle' style={{color:Colors.greenColor}} size={14}/></View>
    </View>
    </TouchableOpacity>
   </View>

  )
}

export default DashboardCalculator;


const styles = StyleSheet.create({
 wrapper1:{
    padding:12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginLeft:36,
    marginTop:20,
    width:155
    
 },
})
