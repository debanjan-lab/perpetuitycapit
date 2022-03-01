import React from 'react'
import { View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native'
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const List = (props) =>{
  return(
    <View style={{flexDirection:'row',borderTopWidth:0.5,paddingVertical:15,paddingHorizontal:30,borderColor:Colors.lightGreen}}>
    {props.children}
    <Text style={{color:Colors.whiteColor,marginLeft:15,fontSize:16,fontWeight:'300'}}>{props.name}</Text>
    </View>
  )
}
const CustomDrawer1 = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor:Colors.greenColor}}>
   <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:32}}>
   <View>
   <TouchableOpacity>
   <Ionicons name='md-notifications-outline' color='white' size={19}/>
   </TouchableOpacity>
   </View>
   <View style={{marginRight:20,marginTop:-5,marginLeft:10}}>
   <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
   <Feather name='x' size={30} color={Colors.whiteColor}/>
   </TouchableOpacity>
   </View>
   </View>

   <View style={{flexDirection:'row',marginTop:10,marginLeft:10}}>
   <Image
    source={require('../images/passport_photo.jpg')}
    style={{ height: 62, width: 62,borderRadius:62}}
    />
    <View style={{justifyContent:'center',marginLeft:10}}><Text style={{color:Colors.whiteColor,fontWeight:'300',fontSize:18}}>Hi Raichand</Text></View>
   </View>
   <View style={{marginTop:20}}>
   <View>
  <TouchableOpacity onPress={() => props.navigation.navigate('ProfileDetailsScreen1')}>
  <List name='My Profile'>
  <Ionicons name='person-outline' size={21} color={Colors.whiteColor}/>
  </List>
  </TouchableOpacity>
  <List name='My Loans'>
  <FontAwesome5 name='money-bill-wave' size={18} color={Colors.whiteColor}/>
  </List>
  <List name='How it Works'>
  <SimpleLineIcons name='question' size={24} color={Colors.whiteColor}/>
  </List>
  <List name='Our Policy'>
  <AntDesign name='copy1' size={24} color={Colors.whiteColor}/>
  </List>
  <TouchableOpacity onPress={() => props.navigation.navigate('ContactUs1')}>
  <List name='Help'>
  <AntDesign name='exclamationcircleo' size={25} color={Colors.whiteColor}/>
  </List>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => props.navigation.navigate('AboutUs1')}>
  <List name='About Us'>
  <MaterialCommunityIcons name='home-city-outline' size={25} color={Colors.whiteColor}/>
  </List>
  </TouchableOpacity>
  <List name='Log Out'>
  <SimpleLineIcons name='logout' size={25} color={Colors.whiteColor}/>
  </List>
   </View>

   </View>
    </View>
  )
}
export default CustomDrawer1

const styles = StyleSheet.create({
  icon: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
      backgroundColor:Colors.greenColor
  },
 
});