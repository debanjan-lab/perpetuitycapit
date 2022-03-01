import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import Pie from 'react-native-pie'
import Colors from '../constants/Colors';

const  PieChart = ({radius,innerRadius,daysLeft}) => {
  return (
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <Pie
    radius={radius ? radius : 23}
    innerRadius={innerRadius ? innerRadius : 20}
    sections={[
      {
        percentage: 67,
        color:radius ? Colors.greenColor : Colors.whiteColor
      },
    ]}
    backgroundColor={ radius ? Colors.whiteColor :Colors.greenColor}
  />
  <View
    style={styles.gauge}
  >
    <Text
      style={radius ? styles.gaugeText1 : styles.gaugeText}
    >
      {daysLeft ? daysLeft : '67%' }
    </Text>
  </View>
</View>
  )
}

export default PieChart;

const styles = StyleSheet.create({
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: Colors.whiteColor,
    fontSize: 15,
    marginBottom:6,
    marginRight:2
  },
  gaugeText1: {
    color: Colors.mainTextColor,
    fontSize: 8,
    fontWeight:'bold',
    marginRight:3
  },
})
