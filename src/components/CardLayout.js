import React from 'react';
import { Text, View,StyleSheet,SafeAreaView } from 'react-native';
import TreeHeader from './TreeHeader';


export const CardLayout = (props) => {
    return(
        <View>
        <TreeHeader/>
        <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
      <View style={{
          marginTop:175,
          height:props.height ? props.height : 310,
          width:330,
          borderRadius:10,
         backgroundColor:'white',elevation:5}}>
         {props.children}
        </View>
        </View>
        </View>
  )
}
export default CardLayout

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor:'white',
        justifyContent:'center,',
        alignItems:'center'

    },
  
})