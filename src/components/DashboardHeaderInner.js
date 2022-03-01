import React from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import Colors from '../constants/Colors';

 const DashboardHeaderInner = ({navigation,goBack,headerText}) => {
  return (
   
    // <View style={{flexDirection:'row',marginTop:20,marginLeft:38}}>
    //    <TouchableOpacity onPress={() => goBack ? navigation.goBack() : navigation.navigate('DashboardScreen1')}>
    //    <View style={{marginTop:8}}><Feather name='chevron-left' size={22}/></View>
    //    </TouchableOpacity>
    //  <View style={{marginLeft:80}}>
    //  <Text style={{color:Colors.mainTextColor,fontSize:25,fontWeight:'bold'}}>{headerText}</Text>
    //  </View>
    // </View>
      <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:'space-between',marginTop:25}}>
       <TouchableOpacity onPress={() => goBack ? navigation.goBack() : navigation.navigate('DashboardScreen1')}>
       <View style={{marginLeft:20}}><Feather name='chevron-left' size={22}/></View>
       </TouchableOpacity>
     <View style={{flex:1,alignItems:'center',marginLeft:-20,marginTop:-8}}>
     <Text style={{color:Colors.mainTextColor,fontSize:25,fontWeight:'bold'}}>{headerText}</Text>
     </View>
    </View>

  )
}

export default DashboardHeaderInner
