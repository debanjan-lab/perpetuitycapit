import React from 'react'
import { View,StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const  DashboardCard =(props) => {
  return (
    <View style={{ paddingHorizontal:35 }}>
    <View style={[styles.wrapper,{ backgroundColor: props.color ? props.color : Colors.whiteColor,}]}>
     {props.children}
    </View>
    </View>

  )
}

export default DashboardCard;


const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        padding:10,
        borderRadius: 10,
        elevation: 3,

    },
  
})