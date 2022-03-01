import React, { Component } from 'react';
import { View,Text,StyleSheet,Image,TextInput,ScrollView, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';
import AppHeaderUpper from '../../../components/AppHeaderUpper';
import { Button } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DashboardHeader from '../../../components/DashboardHeader';
import DashboardHeaderInner from '../../../components/DashboardHeaderInner';
import DashboardCard from '../../../components/DashboardCard';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LoanPagination from '../../../components/LoanPagination';




const Card = (props) =>{
    return(
       
        <View style={{padding:10,marginBottom:10}}>
        <View style={{flexDirection:'row'}}>
        {props.children}
        <Text style={{marginLeft:props.leftmargin ? props.leftmargin : 8,color:Colors.mainTextColor}}>{props.name}</Text>
        </View>
        <View style={{marginTop:-10,paddingLeft:21}}>
        <TextInput
        onChangeText={props.onChangeText}
        placeholder={props.plcholder}
        style={props.breadth ? [styles.txtinput,{width:props.breadth}] : styles.txtinput}
        />
      
        </View>
        </View>
      
    )
}



class ApplyScreen2 extends Component{
    constructor(props){
        super(props);
        this.state={
            name:null,
            adhaar:null
        }
    }

    onChangeHandler = (field, value) =>{
        console.log('field',field)
        console.log('value',value)
        this.setState({
            [field]: value
        })
    }
    render(){
        return(
            <View style={styles.container}>
             <DashboardHeader navigation={this.props.navigation}/>
             <ScrollView  contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
             <LoanPagination status = {1}/>
             <DashboardHeaderInner
             headerText="Personal Details"
             navigation={this.props.navigation}
             goBack={true}
             />
             <DashboardCard>
         <Card name='Name' plcholder ='Enter your name' props={this.props} onChangeText={(v) => this.onChangeHandler('Name',v)}>
         <Ionicons name='person-outline' size={18}/>
         </Card>


         <View style={{padding:10,marginBottom:10}}>
         <View style={{flexDirection:'row'}}>
         <MaterialIcons name='date-range' size={18}/>
         <Text style={{marginLeft:8,color:Colors.mainTextColor}}>D.O.B</Text>
         </View>
         <View style={{flexDirection:'row',paddingLeft:25}}>
         <TextInput
         placeholder='dd'
         style={[styles.txtinput,{width:38,marginRight:15}]}
         />
         <TextInput
         placeholder='mm'
         style={[styles.txtinput,{width:38,marginRight:15}]}
         />
         <TextInput
         placeholder='yyyy'
         style={[styles.txtinput,{width:38,marginRight:15}]}
         />
         </View>
         </View>


         <Card name='Aadhaar number' plcholder ='Enter Aadhaar Number' props={this.props} onChangeText={(v) => this.onChangeHandler('adhaar',v)}>
         <FontAwesome name='id-card-o' size={18}/>
         </Card>
         </DashboardCard>
         <DashboardCard>
         <Card  name='Address' plcholder ='Enter Address' props={this.props}>
         <Ionicons name='location-outline' size={18}/>
         </Card>
         <Card  name='Pincode' plcholder ='Enter Pincode' props={this.props}>
         <FontAwesome name='pencil-square-o' size={18}/>
         </Card>
         <View style={{flexDirection:'row'}}>
         <Card  name='State' plcholder ='AUTOFILL' props={this.props} breadth={120}>
         <MaterialIcons name='location-searching' size={18}/>
         </Card>
         <Card  name='City' plcholder ='AUTOFILL' props={this.props} breadth={120} leftmargin = {25}/>
         </View>
         </DashboardCard>
         <View style={{justifyContent:'center',flexDirection:'row',marginTop:10}}>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('ApplyScreen3')}>
         <Text style={styles.btn}>Continue</Text>
         </TouchableOpacity>
         </View>
         </ScrollView>
            </View>
        )
    }
}
export default ApplyScreen2;


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
// import { View,Text,StyleSheet,Image,TextInput,ScrollView, TouchableOpacity} from 'react-native';
// import Colors from '../../../constants/Colors';
// import LoanPagination from './components/loanPagination';
// import AppHeaderUpper from '../../../components/AppHeaderUpper';
// import { Button } from 'react-native-paper';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';






// class ApplyScreen2 extends Component{
//     constructor(){
//         super();
//         this.state={
//             list:null,
//             selectedDate:new Date(),
//             showPicker:false,
//             date:'dd mm yyyy'
//         }
//     }

//     chooseDate = () =>{
//     this.setState({showPicker:true})
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
//             <View>
//            <LoanPagination total={4} active={1} />
//            </View>
//            <AppHeaderUpper
//            headerText="Personal Details"
//            navigation={this.props.navigation}
//            goBack={true}
//        />
//        <View style={{ paddingHorizontal:20 }}>
//        <View style={styles.wrapper}>
//        <View style={{marginBottom:25}}>
//        <View style={{flexDirection:'row',marginBottom:-10}}>
//        <View>
//        <Image
//        source={require('../../../images/calendar.png')}
//         style={styles.icon}
//           />
//        </View>
//        <View>
//        <Text>Name</Text>
//        </View>
//        </View>
//        <View>
//        <TextInput
//        placeholder='Enter your name'
//        style={styles.input}
//        />
//        </View>
//        </View>

//        <View style={{marginBottom:25}}>
//        <View style={{flexDirection:'row'}}>
//        <View>
//     <TouchableOpacity  onPress={this.chooseDate}>
//     <Image
//     source={require('../../../images/calendar.png')}
//      style={styles.icon}
    
//        />
//     </TouchableOpacity>
//        </View>
//        { this.state.showPicker &&
//         <DateTimePicker
//         testID="dateTimePicker"
//         value={this.state.selectedDate}
//         mode={"date"}
//         is24Hour={true}
//         display="default"
//         maximumDate={new Date()}
//         onChange={(event, selectedDat) => {
//         //   console.log(moment(selectedDate).format('L'));
//         //   setDate(moment(selectedDate).format('YYYY/MM/DD'));
//         this.setState({date:moment(selectedDat).format('DD MM YYYY'),showPicker:false});
          
//         }}
//       />
//        }
//        <View>
//        <Text>DOB</Text>
//        </View>
//        </View>
//      <Text>{this.state.date}</Text>
//        </View>

//        <View style={{marginBottom:10}}>
//        <View style={{flexDirection:'row',marginBottom:-10}}>
//        <View>
//        <Image
//        source={require('../../../images/calendar.png')}
//         style={styles.icon}
//           />
//        </View>
//        <View>
//        <Text>Adhaar number</Text>
//        </View>
//        </View>
//        <View>
//        <TextInput
//        placeholder='Enter Adhaar number'
//        style={styles.input}
//        />
//        </View>
//        </View>

//        </View>
//        </View>

//        <View style={{ paddingHorizontal:20 }}>
//        <View style={styles.wrapper}>
//        <View style={{marginBottom:25}}>
//        <View style={{flexDirection:'row',marginBottom:-10}}>
//        <View>
//        <Image
//        source={require('../../../images/calendar.png')}
//         style={styles.icon}
//           />
//        </View>
//        <View>
//        <Text>Address</Text>
//        </View>
//        </View>
//        <View>
//        <TextInput
//        placeholder='Enter Address'
//        style={styles.input}
//        />
//        </View>
//        </View>

//        <View style={{marginBottom:25}}>
//        <View style={{flexDirection:'row',marginBottom:-10}}>
//        <View>
//        <Image
//        source={require('../../../images/calendar.png')}
//         style={styles.icon}
//           />
//        </View>
//        <View>
//        <Text>Pincode</Text>
//        </View>
//        </View>
//        <View>
//        <TextInput
//        placeholder='Enter Pincode'
//        style={styles.input}
//        />
//        </View>
//        </View>

//        <View style={{marginBottom:20}}>
//        <View style={{flexDirection:'row',justifyContent:'flex-start',marginBottom:-10}}>
//        <View style={{flexDirection:'row',marginRight:100}}>
//        <View>
//        <Image
//        source={require('../../../images/calendar.png')}
//         style={styles.icon}
//           />
//        </View>
//        <View>
//        <Text>State</Text>
//        </View>
//        </View>
//        <View style={{flexDirection:'row'}}>
//        <View>
//        <Image
//        source={require('../../../images/calendar.png')}
//         style={styles.icon}
//           />
//        </View>
//        <View>
//        <Text>City</Text>
//        </View>
//        </View>
//        </View>
//       <View style={{flexDirection:'row',justifyContent:'flex-start',marginBottom:-10}}>
//       <View style={{marginLeft:10,marginRight:105}}>
//       <TextInput
//       placeholder='Autofill'
//       style={styles.input}
//       />
//       </View>
//       <View>
//       <TextInput
//       placeholder='Autofill'
//       style={styles.input}
//       />
//       </View>
//       </View>
//        </View>


       

       
//        </View>

       
//        </View>
//        <View style={{paddingHorizontal:150,marginVertical:15}}>
//    <Button mode="contained" style={styles.btn} onPress={() => this.props.navigation.navigate('ApplyScreen3')}>
//    Contiune
//  </Button>
//    </View>
//    </ScrollView>
//             </View>
//         )
//     }
// }
// export default ApplyScreen2;


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
//         borderBottomWidth:1,
//         paddingBottom:-5
//     },
//     icon: {
//         height: wp(4),
//         width: wp(4),
//         resizeMode: 'contain',
//         marginLeft:10,
//         // marginRight:2,
//         // marginTop:4
//     },
//     btn:{
//         backgroundColor:'#696969'
//     },  
// })