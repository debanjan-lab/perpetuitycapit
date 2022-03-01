import React, { Component } from 'react';
import { View,Text,Image,StyleSheet,TouchableOpacity, ColorPropType,ScrollView} from 'react-native';
import Colors from '../../../constants/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeaderUpper from '../../../components/AppHeaderUpper';
import { Button } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import DashboardHeader from '../../../components/DashboardHeader';
import DashboardHeaderInner from '../../../components/DashboardHeaderInner';
import DashboardCard from '../../../components/DashboardCard';
import Feather  from 'react-native-vector-icons/Feather'
import LoanPagination from '../../../components/LoanPagination';

const Card = (props) =>{
    return(
        <View style={{padding:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View>
        <Text>{props.heading}</Text>
        <Text style={{fontSize:10}}>Support JPEG,PNG & PDF</Text>
        </View>
       
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity>
        <View style={styles.btn}>
        <Feather name='upload' size={18} color={Colors.greenColor}/>
        <Text style={{marginLeft:7,color:Colors.greenColor}}>Upload File</Text>
        </View>
        </TouchableOpacity>
        </View>
        
        </View>
        </View>
    )
}
 class ApplyScreen4 extends Component{
    constructor(props){
        super(props);
        this.state={
            checked1:false,
            checked2:false
        }
    }
    render(){

        return(
            <View style={styles.container}>
            <DashboardHeader navigation={this.props.navigation}/>
            <ScrollView  contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
            <LoanPagination status = {3}/>
            <DashboardHeaderInner
            headerText="Document Verification"
            navigation={this.props.navigation}
            goBack={true}
            />
            <DashboardCard>
            <Card heading='Upload Your Photo'/>
            </DashboardCard>

            <DashboardCard>
           <View>
           <View style={{flexDirection:'row',justifyContent:"space-around"}}>
           <View>
                    <RadioButton
          value="driving_license"
          color = {Colors.greenColor}
          uncheckedColor = {(!this.state.checked1 && this.state.checked2) ? Colors.subTextColor : Colors.greenColor}
        status={ this.state.checked1 === true ? 'checked' : 'unchecked' }
        
        />
        <TouchableOpacity 
        onPress={() =>  this.setState({checked1:!this.state.checked1,checked2:false}) }
        >
        <Text style={{color:(!this.state.checked1 && this.state.checked2) ? Colors.subTextColor : Colors.mainTextColor}}>Driving License</Text>
        </TouchableOpacity>
       </View>
       <View>
       <RadioButton
          value="adhaar_card"
          color = {Colors.greenColor}
          uncheckedColor = {(this.state.checked1 && !this.state.checked2) ? Colors.subTextColor : Colors.greenColor}
           onPress={() => this.setState({checked:'adhaar_card'})}
        status={ this.state.checked2 === true ? 'checked' : 'unchecked' }
        />
          <TouchableOpacity 
           onPress={() =>  this.setState({checked2:!this.state.checked2,checked1:false}) }
           >
           <Text style={{color:(this.state.checked1 && !this.state.checked2) ? Colors.subTextColor : Colors.mainTextColor}}>Adhaar Card</Text>
           </TouchableOpacity>
       </View>
       </View>
       {this.state.checked1 &&
        <Card heading='Driving Licence'/>
       }
      {
        this.state.checked2 &&
        <View>
        <Card heading='Adhaar Card- Front'/>
        <Card heading='Adhaar Card- Back'/>
        </View>
      }
       
           </View>
            </DashboardCard>

            <DashboardCard>
            <Card heading='Bank Statement'/>
            <Card heading='Upload PAN Card'/>
            </DashboardCard>
            <View>
            {
                (this.state.checked1 || this.state.checked2) &&
                <View style={{justifyContent:'center',flexDirection:'row',marginTop:10}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ApplyScreen4')}>
            <Text style={styles.btn2}>Submit</Text>
            </TouchableOpacity>
            </View>
            }
            </View>
            </ScrollView>
            </View>
        )
    }
}
export default ApplyScreen4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    btn:{
        flexDirection:'row',
        backgroundColor:Colors.whiteColor,
        paddingHorizontal:14,
        paddingVertical:5,
        borderRadius:6,
        borderColor:Colors.greenColor,
        borderWidth:1
    },
    btn2:{
        backgroundColor:Colors.greenColor,
        paddingHorizontal:25,
        paddingVertical:8,
        borderRadius:5,
        color:Colors.whiteColor,
        marginTop:15
    },

})







































// import React, { Component } from 'react';
// import { View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
// import Colors from '../../../constants/Colors';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import LoanPagination from './components/loanPagination';
// import AppHeaderUpper from '../../../components/AppHeaderUpper';
// import { Button } from 'react-native-paper';
// import { RadioButton } from 'react-native-paper';



// var radio_props = [
//     {label: 'param1', value: 0 },
//     {label: 'param2', value: 1 }
//   ];

// class ApplyScreen4 extends Component{
//     constructor(){
//         super();
//         this.state={
//             checked1:false,
//             checked2:false
//         }
//     }
//     render(){
//         console.log('listing',this.state.checked)
//         return(
//             <View style={styles.container}>
//             <View style={styles.successRow}>
//             <View style={{backgroundColor: '#1A5632',paddingVertical:15,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
//             <Image
//             source={require('../../../images/side_menu_logo.png')}
//             style={{ height:40, width: 40, resizeMode: 'contain',marginLeft:35 }}
//         />
//             </View>
//             </View>
//             <View style={{justifyContent:'center',alignItems:'center',marginVertical:30}}>
//             <Text>Lorem ipsum dollar sit amet</Text>
//             <Text>Consetetur sadipscing elitr,sed diam</Text>
//             </View>
            
//            <View>
//            <LoanPagination total={4} active={1} />
//            </View>

//            <AppHeaderUpper
//            headerText="Document Verfication"
//            navigation={this.props.navigation}
//            goBack={true}
//        />

//        <View style={{ paddingHorizontal:20 }}>
//        <View style={styles.wrapper}>
    
//        <View>
//        <View style={{flexDirection:'row'}}>
//        <View>
//        <Image
//        source={require('../../../images/calendar.png')}
//         style={styles.icon}
//           />
//        </View>
//        <View>
//        <Text>Upload Photo</Text>
//        </View>
//        </View>
//        <View>
//        <TouchableOpacity style={[styles.btn, {marginLeft:30,marginRight:200}]}>
//        <Text style={{color:'white'}}>Upload File</Text>
//        </TouchableOpacity>
//        </View>
//        </View>
//        <Text style={{marginLeft:32,fontSize:8}}>Support JPEG,PNG & PDF</Text>
//        </View>
//        </View>

//        <View style={{ paddingHorizontal:20 }}>
//        <View style={styles.wrapper}>
//        <View style={{flexDirection:'row',justifyContent:"space-around"}}>
//        <View>
//         <RadioButton
//           value="driving_license"
//         //   status={ this.state.checked === 'driving_license' ? 'checked' : 'unchecked' }
//         //   onPress={() => this.setState({checked:'driving_license'})}
//         status={ this.state.checked1 === true ? 'checked' : 'unchecked' }
//         onPress={() =>
//              this.setState({checked1:!this.state.checked1,checked2:false})
             
//             }
//         />
//         <Text>Driving License</Text>
//        </View>
//        <View>
//        <RadioButton
//           value="adhaar_card"
//         //   status={ this.state.checked === 'adhaar_card' ? 'checked' : 'unchecked' }
//         //   onPress={() => this.setState({checked:'adhaar_card'})}
//         status={ this.state.checked2 === true ? 'checked' : 'unchecked' }
//         onPress={() => 
//             this.setState({checked2:!this.state.checked2,checked1:false})
//         }
//         />
//           <Text>Adhaar Card</Text>
//        </View>
        
//       </View>
//        </View>
//        </View>

//        <View style={{ paddingHorizontal:20 }}>
//        <View style={styles.wrapper}>
//        <View>
//        <View>
//        <Text>Bank Statement</Text>
//        </View>
//        <View>
//        <TouchableOpacity style={[styles.btn,{ marginRight:230}]}>
//        <Text style={{color:'white'}}>Upload File</Text>
//        </TouchableOpacity>
//        </View>
//        <Text style={{marginLeft:7,fontSize:8}}>Support JPEG,PNG & PDF</Text>
//        </View>
//        <View>
//        <View style={{marginTop:20}}>
//        <Text>Upload PAN Card</Text>
//        </View>
//        <View>
//        <TouchableOpacity style={[styles.btn,{ marginRight:230}]}>
//        <Text style={{color:'white'}}>Upload File</Text>
//        </TouchableOpacity>
//        </View>
//        <Text style={{marginLeft:7,fontSize:8}}>Support JPEG,PNG & PDF</Text>
//        </View>
//        </View>
//        </View>

//             </View>
//         )
//     }
// }
// export default ApplyScreen4;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     successRow: {
//         backgroundColor: Colors.lightGreen,
//         marginTop: 50,
//         // padding: 20,
//         borderRadius: 10,
//     },
//     wrapper: {
//         backgroundColor: Colors.whiteColor,
//         marginTop: 20,
//         padding: 20,
//         borderRadius: 10,
//         elevation: 3,

//     },
//     input:{
//         paddingLeft:10,
//         color:'#05375a',
//         borderBottomColor:'#05375a',
//         borderBottomWidth:0.25,
//         paddingBottom:-5
//     },
//     btn:{
//         backgroundColor:'#696969',
//         paddingVertical:6,
//         paddingLeft:15,
//         fontWeight:2,
//         borderRadius:4,
//         paddingRight:-10,
        
//     },  
//     icon: {
//         height: wp(4),
//         width: wp(4),
//         resizeMode: 'contain',
//         marginLeft:10,
//         // marginRight:2,
//         // marginTop:4
//     },
// })