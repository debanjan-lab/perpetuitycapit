import React from 'react';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DashboardCard from './DashboardCard';



const  DashboardMyLoan =({navigation}) => {
  return (
    <View>
    <DashboardCard>
    <TouchableOpacity onPress={() => navigation.navigate('MyLoan')}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View  style={{flexDirection:'row'}}>
    <View>
    <Text style={{fontSize:19,color:Colors.mainTextColor,marginRight:8}}>My Loans</Text>
    </View>
    <View style={{marginTop:6}}>
    <AntDesign name='rightcircle' style={{color:Colors.greenColor}} size={14}/>
    </View>
    </View>
    <View style={{flexDirection:'row',marginRight:10}}>
    <View style={{marginRight:40}}>
    <View style={{height:35,width:35,borderRadius:35,backgroundColor:Colors.greyColor,justifyContent:'center',alignItems:'center'}}><Text style={{color:Colors.greenColor,fontWeight:'500'}}>2</Text></View>
    <View style={{justifyContent:'center',alignItems:'center'}}><Text  style={{color:Colors.mainTextColor,fontSize:10}}>Active</Text><Text  style={{color:Colors.mainTextColor,fontSize:10}} >Loan</Text></View>
    </View>
    <View>
    <View style={{height:35,width:35,borderRadius:35,backgroundColor:Colors.greyColor,justifyContent:'center',alignItems:'center'}}><Text style={{color:Colors.greenColor,fontWeight:'500'}}>1</Text></View>
    <View style={{justifyContent:'center',alignItems:'center'}}><Text  style={{color:Colors.mainTextColor,fontSize:10}}>Applied</Text><Text  style={{color:Colors.mainTextColor,fontSize:10}}>Loan</Text></View>
    </View>
    </View>
    </View>
    </TouchableOpacity>
    </DashboardCard>
    
    </View>
  )
}
export default DashboardMyLoan