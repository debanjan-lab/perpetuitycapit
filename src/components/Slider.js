// import React from 'react';
// import { View,Text } from 'react-native';


// const App = () =>{
//     return(
//     <View>
//     <Text>tajesh</Text>
//     </View>
//     )
// }

// export default App

// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView
} from 'react-native';
import Colors from '../constants/Colors';

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'

const Slider = ({navigation}) => {

console.log('navigation',navigation)
  const RenderItem = ({item}) => {
      console.log('iitem',item)
      if(item.key == '1' || item.key == '2' || item.key == '3' || item.key == '4'){
        return (
            <View >
              <Image
                style={styles.introImageStyle}
                source={item.image} />
               <View style={{flexDirection:'row',justifyContent:'center'}}>
               <Text style={{fontSize:20,fontWeight:'bold',color:Colors.mainTextColor}}>{item.title}</Text>
               </View>
               <View style={{paddingHorizontal:65}}>
               <Text style={{textAlign:'center'}}>{item.text}</Text>
               </View>
            </View>
          );
      }
      else{
        return (
            <ScrollView>
            <View style={{justifyContent:'center',alignItems:'center',marginVertical:20,}}>
            <Text style={{fontWeight:'bold',color:Colors.greenColor,fontSize:20}}>SIGN UP</Text>
            </View>
            <View style={{marginBottom:30}}>
            <View style={{flexDirection:'row',marginLeft:40}}>
            <View style={{marginRight:5}}><FontAwesome name='user-o' size={18}/></View>
            <View><Text>Name(as per PAN Card)</Text></View>
            </View>
            <View style={{marginLeft:56,marginRight:40}}><TextInput placeholder='Enter name' style={styles.input}/></View>
            </View>

            <View style={{marginBottom:30}}>
            <View style={{flexDirection:'row',marginLeft:40}}>
            <View style={{marginRight:5}}><Fontisto name='email' size={18}/></View>
            <View><Text>Email</Text></View>
            </View>
            <View style={{marginLeft:56,marginRight:40}}><TextInput placeholder='Enter email' style={styles.input}/></View>
            </View>

            <View style={{marginBottom:30}}>
            <View style={{flexDirection:'row',marginLeft:40}}>
            <View style={{marginRight:5}}><Feather name='phone' size={18}/></View>
            <View><Text>Phone no</Text></View>
            </View>
            <View style={{marginLeft:56,marginRight:40}}><TextInput placeholder='Enter Phonne no' style={styles.input}/></View>
            </View>
           <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('OtpScreen')}>
           <Text style={{color:Colors.whiteColor}}>GET OTP</Text>
           </TouchableOpacity>
            
         </ScrollView>
          );
      }
   
  };

  return (
    <>
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          showNextButton={false}
          showDoneButton={false}
          activeDotStyle={styles.activeDotStyle}
          
        />
        <View style={{flexDirection:'row',justifyContent:'center',padding:-20}}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PhoneScreen')}><Text style={{color:'green'}}>Login</Text></TouchableOpacity>
        </View>
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
 

  introImageStyle: {
    width: 300,
    height: 300,
    marginLeft:55,
    marginTop:10
  },
  input:{
    borderBottomColor:'#05375a',
    borderBottomWidth:0.25,
    paddingBottom:-5,
    paddingVertical:6,
},
btn:{
    backgroundColor:Colors.greenColor,
    justifyContent:'center',
    alignItems:'center',
    padding:8,
    marginHorizontal:150,
    borderRadius:5,
    marginTop:50
},
activeDotStyle:{
    backgroundColor:Colors.greenColor
}
});

const slides = [
  {
    key: '1',
    text: 'We provide loans ranging from Rs. 50,000-Rs. 10 Lakhs',
    title: `We're flexible`,
    image: require('../images/hands_give.png'),
    backgroundColor: '#20d2bb',
  },
  {
    key: '2',
    title:  `We're Fast`,
    text: 'We process,approve and disburse loans within 72 hours',
    image: require('../images/Hands_Phone.png'),
    backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: `We're Friendly`,
    text: 'Upload all necessary information from the comfort of your home',
    image: require('../images/Sitting_On_Floor.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: '4',
    title: `We're Affordable`,
    text: 'We offer responsible credit with interest rates ranging from 9.5% - 14% flat',
    image: require('../images/Hands_Grip.png'),
    backgroundColor: '#3395ff',
  },
  {
    key: '5',
    title: 'Best Deals',
    text: ' Best Deals on all our services',
    image: require('../images/onboarding.jpg'),
    backgroundColor: '#3395ff',
  },
];