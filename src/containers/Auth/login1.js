import React, { Component } from 'react';
import { Text, View} from 'react-native';
import Swiper from '../../components/Swiper';
import Colors from '../../constants/Colors';



class LoginScreen1 extends Component{
    constructor(props){
        super(props);
        this.state={
            list:null
        }
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:Colors.whiteColor}}>
           <Swiper
           navigation={this.props.navigation}
           />
            </View>
        )
    }
}

export default LoginScreen1

