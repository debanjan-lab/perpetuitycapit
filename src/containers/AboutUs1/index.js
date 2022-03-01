import React from 'react'
import { View,StyleSheet,Text,Image,ScrollView} from 'react-native'
import DashboardHeader from '../../components/DashboardHeader';
import DashboardHeaderInner from '../../components/DashboardHeaderInner';
import Colors from '../../constants/Colors';

const AboutUs1 = (props) =>{
    return(
        <View style={styles.container}>
       <DashboardHeader navigation={props.navigation}/>
       <View>
       <ScrollView  contentContainerStyle={{flexGrow:1,paddingBottom:140,paddingHorizontal:25}}>
       <DashboardHeaderInner
       headerText="About Us"
       navigation={props.navigation}
       goBack={true}/>
       <View style={{margin:20}}>
       <Text>
       We are Kolkata based Company. We offer loans at a competitive rate with flexible repayment options. All our loans are collateralized and we offer loans upto 90% of the asset value. Borrowers can apply online in minutes, select desired repayment terms and receive funds in 3 days with minimal hassle. Perpetuity Capital is the trade name of Oracle Marketing Pvt. Ltd., a non-banking finance company (NBFC) registered with the RBI.
       </Text>
       </View>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
       <View style={{flexDirection:'column',alignItems:'center'}}>
       <Image source={require('../../images/taxi.png')}/>
       <Text>Taxi Loans</Text>
       </View>
       <View style={{flexDirection:'column',alignItems:'center'}}>
       <Image source={require('../../images/scooter.png')}/>
       <Text>2 Wheelers Loans</Text>
       </View>
       </View>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
       <View style={{flexDirection:'column',alignItems:'center'}}>
       <Image source={require('../../images/truck.png')}/>
       <Text>Truck Loans</Text>
       </View>
       <View style={{flexDirection:'column',alignItems:'center'}}>
       <Image source={require('../../images/small_car.png')}/>
       <Text>4 Wheelers Loans</Text>
       </View>
       </View>
       <View style={{flexDirection:'row',justifyContent:'center'}}>
       <Text style={{fontSize:24,color:Colors.mainTextColor,opacity:.9,marginTop:100,marginBottom:40}}>How It Works?</Text>
       </View>
       <View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:50}}>
        <Image source={require('../../images/application.png')} style={{width:60.86,height:64.98}}/>
        <View style={{paddingHorizontal:26}}>
        <Text style={{fontSize:16,color:Colors.mainTextColor}}>Fill out the Application form</Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:14,color:Colors.mainTextColor,opacity:.5}}>Fill out a 10 minute Application Form Online on our Mobile Application or Website</Text>
        </View>
        </View>
       </View>

       <View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:50}}>
       <Image source={require('../../images/documents.png')} style={{width:60.86,height:64.98}}/>
       <View style={{paddingHorizontal:26}}>
       <Text style={{fontSize:16,color:Colors.mainTextColor}}>Upload the required documents</Text>
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
       <Text style={{fontSize:14,color:Colors.mainTextColor,opacity:.5}}>Digitally upload all require documents</Text>
       </View>
       </View>
      </View>

      <View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:50}}>
      <Image source={require('../../images/hand.png')} style={{width:82.3,height:83.65}}/>
      <View style={{paddingHorizontal:26}}>
      <Text style={{fontSize:16,color:Colors.mainTextColor}}>Disbursal</Text>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:14,color:Colors.mainTextColor,opacity:.5}}>Loan are disbursed within 72 Hours</Text>
      </View>
      </View>
     </View>

     <View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:50}}>
     <Image source={require('../../images/loan.png')} style={{width:69.77,height:71.06}}/>
     <View style={{paddingHorizontal:30}}>
     <Text style={{fontSize:16,color:Colors.mainTextColor}}>Pay EMI</Text>
     <View style={{alignItems:'center',justifyContent:'center'}}>
     <Text style={{fontSize:14,color:Colors.mainTextColor,opacity:.5}}>EMIs directly deducted from bank account or payable online via Debit /Credit Cards PAYTM</Text>
     </View>
     </View>
    </View>
       </ScrollView>
       </View>
        </View>
    )
}

export default AboutUs1;


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },

})