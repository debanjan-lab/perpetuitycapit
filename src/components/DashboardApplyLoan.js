import React from 'react';
import { View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'

const DashboardApplyLoan =({navigation}) =>{
  return (
    // navigation.navigate('ApplyScreen1')
    <View style={styles.wrapper2}>
    
    <TouchableOpacity onPress={() => navigation.navigate('ApplyScreen1')}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <View><Text style={{color:Colors.mainTextColor}}>Apply for Loan</Text></View>
           <View style={{marginTop:4}}><AntDesign name='rightcircle' style={{color:Colors.greenColor}} size={14}/></View>
           </View>
           </TouchableOpacity>
           </View>
    
  )
}

export default DashboardApplyLoan;


const styles = StyleSheet.create({
 wrapper2:{
    padding:10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginTop:20,
    width:155,
    marginLeft:31
    
 },
  
})