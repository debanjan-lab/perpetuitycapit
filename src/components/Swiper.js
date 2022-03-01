import React from 'react'
import { Text, View,} from 'react-native'
import TreeHeader from './TreeHeader';
import Colors from '../constants/Colors';
import Slider from './Slider';

export const Swiper = ({navigation}) => {
  return (
   <>
   <TreeHeader/>
   <View style={{marginTop:80,alignItems:'center',}}>
   <Text style={{fontSize:20,color:'black',fontWeight: "bold"}}>Welcome to</Text>
   <Text style={{fontSize:20,color:'black',fontWeight: "bold"}}>Perpetuity Capital</Text>
   </View>
   <View style={{alignItems:'center',marginTop:5,}}>
   <Text style={{color:Colors.greenColor}}>Instant Approval For Commercial Loan</Text>
   </View>
    <Slider
    navigation={navigation}
    />
       <View style={{flexDirection:'row',justifyContent:'center'}}>
       <Text></Text>
       <Text ></Text>
       <Text></Text>
       <Text ></Text>
       </View>
   </>
  )
}

export default Swiper;

