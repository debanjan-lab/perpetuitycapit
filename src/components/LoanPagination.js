import React ,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../constants/Colors';
class loanPagination extends Component{
    constructor(props){
        super(props);
        this.state ={
            list:null
        }
    }
    render(){
        return(
            <View style={{alignItems:'center',marginVertical:30}}>
            <View style={{flexDirection:'row'}}>
           { this.props.status > 0  ? 
            <View>
             <AntDesign name='checkcircle' size={30} color={Colors.greenColor}/>
            </View>
            :
            <View style={{marginTop:3,marginRight:-2}}>
            <MaterialCommunityIcons name='checkbox-blank-circle' size={23} color={Colors.subTextColor}/>
            </View>
        }
            <View style={{borderWidth:0.6,borderColor:this.props.status > 1 ? Colors.greenColor :Colors.subTextColor,width:130,height:0,marginTop:14}}>
            </View>
           { this.props.status > 1  ?
            <View>
            <AntDesign name='checkcircle' size={30} color={Colors.greenColor}/>
           </View>
           :
           <View style={{marginTop:3,marginRight:-2}}>
           <MaterialCommunityIcons name='checkbox-blank-circle' size={23} color={Colors.subTextColor}/>
           </View>
        }
          
           <View  style={{borderWidth:0.6,borderColor:this.props.status ==  3 ? Colors.greenColor :Colors.subTextColor,width:130,height:0,marginTop:14}}>
           </View>
          {this.props.status === 3 ?
               <View>
             <AntDesign name='checkcircle' size={30} color={Colors.greenColor}/>
            </View>
        :
        <View style={{marginTop:3,marginRight:-2}}>
        <MaterialCommunityIcons name='checkbox-blank-circle' size={23} color={Colors.subTextColor}/>
        </View>
        }
            </View>
            </View>
        )
    }
}

export default loanPagination;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },

})