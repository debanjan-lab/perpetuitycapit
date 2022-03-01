import React from 'react'
import { View,Text,StyleSheet,Image} from 'react-native'
import DashboardHeader from '../../components/DashboardHeader'
import DashboardHeaderInner from '../../components/DashboardHeaderInner'
import Colors from '../../constants/Colors'

const ContactUs1 = (props) =>{
    return(
        <View style={styles.container}>
        <DashboardHeader navigation={props.navigation}/>
        <DashboardHeaderInner
       headerText="Contact Us"
       navigation={props.navigation}
       goBack={true}/>
       <View style={{flexDirection:'row',justifyContent:'center',marginVertical:30}}>
       <Image source={require('../../images/contact_us.png')} />
       </View>
   <View style={{paddingHorizontal:40}}>
   <View style={{marginTop:40}}>
   <View style={{flexDirection:'row'}}>
   <Image source={require('../../images/call_us.png')}  style={{width:18,height:18}}/>
   <View><Text style={{color:Colors.mainTextColor,opacity:.9,marginLeft:15,marginTop:-3}}>+91 33 4603 4963</Text></View>
   </View>
   </View>

   <View style={{marginTop:40}}>
   <View style={{flexDirection:'row'}}>
   <Image source={require('../../images/email_us.png')} />
   <View><Text style={{color:Colors.mainTextColor,opacity:.9,marginLeft:15,marginTop:-3}}>contact@perpetuitycapital.in</Text></View>
   </View>
   </View>

   <View style={{marginTop:40}}>
   <View style={{flexDirection:'row'}}>
   <Image source={require('../../images/locate_us.png')} />
   <View><Text style={{color:Colors.mainTextColor,opacity:.9,marginLeft:15,marginTop:-3}}>Chatterjee International Center 33A, Jawaharlal Nehru Road, 20th Floor, Suit A3 Kolkata- 700071</Text></View>
   </View>
   </View>

   <View style={{marginTop:40}}>
   <View style={{flexDirection:'row'}}>
   <Image source={require('../../images/locate_us.png')} />
   <View><Text style={{color:Colors.mainTextColor,opacity:.9,marginLeft:15,marginTop:-3}}>A-34, Shyam Enclave, NITCO Gali, Chikamberpur, Ghaziabad, UP- 201005</Text></View>
   </View>
   </View>
   </View>
        </View>
    )
}

export default ContactUs1


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },

})