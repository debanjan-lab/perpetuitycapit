import React, { Component } from 'react';
import { View,Text,StyleSheet,TextInput,ScrollView } from 'react-native';
import DashboardCard from '../../components/DashboardCard';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardHeaderInner from '../../components/DashboardHeaderInner';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'

const Card = (props) =>{
    return(
       
        <View style={{padding:10,marginBottom:10}}>
        <View style={{flexDirection:'row'}}>
        {props.children}
        <Text style={{marginLeft:props.leftmargin ? props.leftmargin : 8,color:Colors.mainTextColor}}>{props.name}</Text>
        </View>
        <View style={{marginTop:-10,paddingLeft:21}}>
        <TextInput
        placeholder={props.plcholder}
        style={
            props.breadth ?
             [styles.txtinput,{width:props.breadth}] :
              [styles.txtinput,{borderBottomWidth:props.name == 'E-mail' || 'Phone no' || 'Name(as per PAN Card)' ? 0 :1 }]}
        />
      
        </View>
        </View>
      
    )
}
class ProfileDetails1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:null
        }
    }
    render(){
        return(
            <View style={styles.container}>
            <ScrollView  contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
            <DashboardHeader navigation={this.props.navigation} />
            <DashboardHeaderInner
            headerText="My Profile"
            navigation={this.props.navigation}
            goBack={true}/>
            <DashboardCard>
            <View style={{padding:5}}>
            <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
            <Text style={{color:Colors.mainTextColor,fontSize:15,fontWeight:'bold'}}>Personal Details</Text>
            <Text style={{color:'red',fontSize:10}}>Your Profile is incomplete</Text>
            </View>
            <View style={{justifyContent:'center'}}><Text>Edit information</Text></View>
            </View>
            <View style={{width:325,backgroundColor:Colors.subTextColor,height:1,marginTop:10}}/>
            </View>
            <Card name='Name(as per PAN Card)'  props={this.props}>
            <Ionicons name='person-outline' size={18}/>
            </Card>
            <Card name='E-mail'  props={this.props}>
            <Fontisto name='email' size={18}/>
            </Card>
            <Card name='Phone no'  props={this.props}>
            <Feather name='phone' size={18}/>
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
           
            <Card  name='Address' plcholder ='Enter Address' props={this.props}>
         <Ionicons name='location-outline' size={18}/>
         </Card>
         <Card name='Aadhaar number' plcholder ='Enter Aadhaar Number' props={this.props}>
         <FontAwesome name='id-card-o' size={18}/>
         </Card>
         <Card name='PAN number' plcholder ='Enter PAN Number' props={this.props}>
              <AntDesign name='idcard' size={18}/>
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
            </ScrollView>
            </View>
        )
    }
}

export default ProfileDetails1;


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    txtinput:{
        borderBottomWidth:1,
        borderBottomColor:Colors.subTextColor,
        paddingBottom:0,
    },

})