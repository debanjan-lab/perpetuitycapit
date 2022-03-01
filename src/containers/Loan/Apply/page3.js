import React, { Component } from 'react';
import { View,Text,StyleSheet,Image,TextInput,ScrollView,TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';
import AppHeaderUpper from '../../../components/AppHeaderUpper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import DashboardHeader from '../../../components/DashboardHeader';
import DashboardHeaderInner from '../../../components/DashboardHeaderInner';
import DashboardCard from '../../../components/DashboardCard';
import ModalDropdown from 'react-native-modal-dropdown';
import LoanPagination from '../../../components/LoanPagination';



const Card = ({heading,plcHolder}) =>{
    return(
        <View style={{paddingHorizontal:5,paddingVertical:5}}>
        <View>
        <Text style={{marginLeft:4,marginBottom:-6}}>{heading}</Text>
       <View>
       <TextInput
       placeholder={plcHolder} style={styles.txtinput}/>
       </View>
        </View>
        </View>
    )
}

const Dropdown = (props) =>{
    console.log('dsvghsadgd',props)
    return(
        <View style={{paddingHorizontal:5,paddingVertical:15}}>
        <View>
             <Text style={{marginLeft:4,marginBottom:-12}}>{props.name}</Text>
         </View>
          <View style={styles.pickerWrapper}>
         <Picker
         selectedValue={props.status}
         mode={"dialog"}
         style={{marginBottom:-15,color:Colors.subTextColor}}
         onValueChange= {props.onValueChange}
         >
        {props.children}
         </Picker>
         </View>
         </View>
    )
}

class ApplyScreen3 extends Component{
    constructor(props){
        super(props);
        this.state={
            status1:null,
            status2:null,
            status3:null,
            status4:null,
            status5:null,
            minTenure: 0,
            maxTenure: 24,
            loanTenure:0,
        }
    }

    _calculateEMI = (value, field) => {
       this.setState({[field]:value})
    }
    render(){
        console.log('loanTenure',this.state.loanTenure)
        return(
            <View style={styles.container}>
            
            <DashboardHeader navigation={this.props.navigation}/>
            <ScrollView  contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
            <LoanPagination status = {2}/>
            <DashboardHeaderInner
            headerText="Loan Details"
            navigation={this.props.navigation}
            goBack={true}
            />
            <DashboardCard>
            <Card heading='Loan Amount' plcHolder = 'Enter loan Amount'/>
            <Dropdown 
            name='Loan Type'
            status={this.state.status1}
            onValueChange={(itemValue) => this.setState({ status1: itemValue })}
              >
            <Picker.Item label="Select type of loan" value="" />
            <Picker.Item label="Car Loans" value="Car Loans" />
            <Picker.Item label="Two-Wheeler Loans" value="Two-Wheeler Loans" />
            <Picker.Item label="Commercial Vehicle Loans (Taxi)" value="Commercial Vehicle Loans (Taxi)" />
            <Picker.Item label="Commercial Vehicle Loans (Truck)" value="Commercial Vehicle Loans (Truck)" />
            </Dropdown>

            <View style={{margin:5}}>
            <Text style={{marginLeft:4}}>Loan Tenure</Text>
            <Slider
             thumbTintColor="#1A5632"
             minimumValue={this.state.minTenure}
             maximumValue={this.state.maxTenure}
             minimumTrackTintColor="#1A5632"
             maximumTrackTintColor="#000000"
             onSlidingComplete={value => this._calculateEMI(value, 'loanTenure')}
             step={6}
             />
             <View  style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
             <Text style={{color:Colors.mainTextColor}}>{this.state.loanTenure} Month</Text>
             </View>
             
            </View>
            </DashboardCard>
            <DashboardCard>
            <Dropdown name='Type of Vehicle' status={this.state.status2}  onValueChange={(itemValue) => this.setState({ status2: itemValue })}>
            <Picker.Item label="Select type of Vehicle" value="" />
               <Picker.Item label="Brand New" value="Brand New" />
                 <Picker.Item label="Used" value="Used" />
            </Dropdown>
            <Dropdown name='Brand' status={this.state.status3}  onValueChange={(itemValue) => this.setState({ status3: itemValue })}>
            <Picker.Item label="Select brand of Vehicle" value="" />
    
            </Dropdown>
            <Dropdown name='Model' status={this.state.status4}  onValueChange={(itemValue) => this.setState({ status4: itemValue })}>
                   <Picker.Item label="Select Model no" value="" />
                
           </Dropdown>
           <Card heading='Vehicle Price' plcHolder = 'Enter Vehicle Price'/>
            </DashboardCard>
            <View style={{justifyContent:'center',flexDirection:'row',marginTop:10}}>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('ApplyScreen4')}>
         <Text style={styles.btn}>Continue</Text>
         </TouchableOpacity>
         </View>
         </ScrollView>
            </View>
        )
    }
}

export default ApplyScreen3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    txtinput:{
        borderBottomWidth:1,
        borderBottomColor:Colors.subTextColor,
        paddingBottom:0,
    },
    pickerWrapper: {
                borderBottomWidth: wp(0.1),
               // alignItems: 'center',
          },
          btn:{
            backgroundColor:Colors.greenColor,
            paddingHorizontal:25,
            paddingVertical:8,
            borderRadius:5,
            color:Colors.whiteColor,
            marginTop:5
        },
})























// import React, { Component } from 'react';
// import { View,Text,StyleSheet,Image,TextInput,ScrollView} from 'react-native';
// import Colors from '../../../constants/Colors';
// import LoanPagination from './components/loanPagination';
// import AppHeaderUpper from '../../../components/AppHeaderUpper';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { Picker } from '@react-native-picker/picker';
// import { Button } from 'react-native-paper';
// import Slider from '@react-native-community/slider';

// class ApplyScreen3 extends Component{
//     constructor(){
//         super();
//         this.state={
//             status:null,
//             minTenure: 0,
//             maxTenure: 24,
//         }
//     }

//     _calculateEMI = (value, field) => {
//         console.log('valueee',value)
//         console.log('fielddd',field)
//     }
//     render(){
//         return(
//             <View style={styles.container}>
//             <View style={styles.successRow}>
//             <View style={{backgroundColor: '#1A5632',paddingVertical:15,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
//             <Image
//                 source={require('../../../images/side_menu_logo.png')}
//                 style={{ height:40, width: 40, resizeMode: 'contain',marginLeft:35 }}
//             />
//             </View>
//             </View>
//             <ScrollView>
//             <View style={{justifyContent:'center',alignItems:'center',marginVertical:30}}>
//             <Text>Lorem ipsum dollar sit amet</Text>
//             <Text>Consetetur sadipscing elitr,sed diam</Text>
//             </View>
            
//            <View>
//            <LoanPagination total={4} active={1} />
//            </View>
//            <AppHeaderUpper
//            headerText="Loan Details"
//            navigation={this.props.navigation}
//            goBack={true}
//        />
//        <View style={{ paddingHorizontal:20 }}>
//        <View style={styles.wrapper}>
//        <View style={{marginBottom:25}}>
//        <View>
//        <Text>Loan amount</Text>
//        </View>
//        <View>
//        <TextInput
//        placeholder='Enter Loan amount'
//        style={styles.input}
//        />
//        </View>
//        </View>

//        <View style={{marginBottom:25}}>
//        <View>
//        <Text>Loan Tenure</Text>
//        </View>
//        <View style={{margin:5}}>
//        <Slider
//                             thumbTintColor="#1A5632"
//                             minimumValue={this.state.minTenure}
//                             maximumValue={this.state.maxTenure}
//                             minimumTrackTintColor="#1A5632"
//                             maximumTrackTintColor="#000000"
//                             onSlidingComplete={value => this._calculateEMI(value, 'tenureValue')}
//                             step={6}
//                         />
//        </View>
//        <View style={styles.headerWrapper}>
//        <Text style={styles.inActiveText}>{this.state.minTenure}</Text>
//        <View style={styles.footerRightWrapper}>
//            <Text style={styles.inActiveText}>{this.state.maxTenure}</Text>
//        </View>
//    </View>
//        </View>
          
// <View style={{marginBottom:25}}>
// <View>
// <View style={{marginBottom:-5}}>
// <Text>Loan Type</Text>
// </View>
// <View style={styles.pickerWrapper}>
// <Picker
// selectedValue={this.state.status}
// style={{ flex: 1,marginBottom:-15,color:Colors.subTextColor,fontSize:20}}
// mode={"dialog"}
// onValueChange={(itemValue) => this.setState({ status: itemValue })

// }
// >
// <Picker.Item label="Select type of loan" value="" />
// <Picker.Item label="Car Loans" value="Car Loans" />
// <Picker.Item label="Two-Wheeler Loans" value="Two-Wheeler Loans" />
// <Picker.Item label="Commercial Vehicle Loans (Taxi)" value="Commercial Vehicle Loans (Taxi)" />
// <Picker.Item label="Commercial Vehicle Loans (Truck)" value="Commercial Vehicle Loans (Truck)" />
// </Picker>
// </View>
// </View>
// </View>

//        </View>
//        </View>

//        <View style={{ paddingHorizontal:20 }}>
//        <View style={styles.wrapper}>
       
//        <View style={{marginBottom:25}}>
//        <View>
//        <View style={{marginBottom:-5}}>
//        <Text>Type of Vehicle</Text>
//        </View>
//        <View style={styles.pickerWrapper}>
//        <Picker
//        selectedValue={this.state.status}
//        style={{ flex: 1,marginBottom:-15}}
//        mode={"dialog"}
//        onValueChange={(itemValue) => this.setState({ status: itemValue })}
//        >
//        <Picker.Item label="--Select type of Vehicle--" value="" />
//        <Picker.Item label="Brand New" value="Brand New" />
//        <Picker.Item label="Used" value="Used" />
//        </Picker>
//        </View>
//        </View>
//        </View>

//        <View style={{marginBottom:25}}>
//        <View>
//        <View style={{marginBottom:-5}}>
//        <Text>Brand</Text>
//        </View>
//        <View style={styles.pickerWrapper}>
//        <Picker
//        selectedValue={this.state.status}
//        style={{ flex: 1,marginBottom:-15}}
//        mode={"dialog"}
//        onValueChange={(itemValue) => this.setState({ status: itemValue })}
//        >
//        <Picker.Item label="--Select brand of vehicle--" value="" />
//        {
//            this.state.brands?.map((value, key) => {
//                return (
//                    <Picker.Item key={key} label={value.brand_name} value={value.id} />
//                )
//            })
//        }
//        </Picker>
//        </View>
//        </View>
//        </View>

//        <View style={{marginBottom:25}}>
//        <View>
//        <View style={{marginBottom:-5}}>
//        <Text>Model</Text>
//        </View>
//        <View style={styles.pickerWrapper}>
//        <Picker
//        selectedValue={this.state.status}
//        style={{ flex: 1,marginBottom:-15}}
//        mode={"dialog"}
//        onValueChange={(itemValue) => this.setState({ status: itemValue })}
//        >
//        <Picker.Item label="--Select Model no--" value="" />
//        {
//            this.state.models?.map((value, key) => {
//                return (
//                    <Picker.Item key={key} label={value.model_name} value={value.id} />
//                )
//            })
//        }
//        </Picker>
//        </View>
//        </View>
//        </View>

//        <View style={{marginBottom:25}}>
//        <View>
//        <Text>Vehicle Price</Text>
//        </View>
//        <View>
//        <TextInput
//        placeholder='Enter Vehicle price'
//        style={styles.input}
//        />
//        </View>
//        </View>

//        </View>
//        <View style={{paddingHorizontal:130,marginVertical:20}}>
//        <Button mode="contained" style={styles.btn} onPress={() => this.props.navigation.navigate('ApplyScreen4')}>
//        Contiune
//      </Button>
//        </View>
//        </View>
//        </ScrollView>
//             </View>
//         )
//     }
// }

// export default ApplyScreen3;

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
//         backgroundColor:'#696969'
//     },  
//     icon: {
//         height: wp(4),
//         width: wp(4),
//         resizeMode: 'contain',
//         marginLeft:10,
//         // marginRight:2,
//         // marginTop:4
//     },
//     pickerWrapper: {
//         flexDirection: 'row',
//         borderBottomWidth: wp(0.1),
//         // alignItems: 'center',
//     },
//     inActiveText: {
//         fontSize: 15,
//         fontWeight: '700',
//         color: '#C7C7C7'
//     },
//     headerWrapper: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingLeft: 10,
//         paddingRight: 10,
//     },
//     footerRightWrapper: {
//         paddingRight: 10
//     },
// })