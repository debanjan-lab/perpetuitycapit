import React, { FC } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Image
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const LoanPagination = ({ total, active }) => {
    let arr = [...Array(3).keys()]
    //console.log("arr", arr)
    let activeIndex = active - 1;
    return (
        <View style={styles.container}>
            {
                arr.map((value, key) => {
                    return (
                        <View key={key} style={activeIndex == value ? styles.activeDot : styles.inActiveDot} />
                    )

                })
            }

        </View>

    );
};

export default LoanPagination;


const styles = StyleSheet.create({
    container: {
        // height: 50,
        // paddingLeft: wp(5),
        // paddingRight: wp(5),
        alignItems: 'center',
         justifyContent: 'space-around',
        flexDirection: 'row',
    },
    activeDot: {
        height: 10,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#1A5632'
    },
    inActiveDot: {
        height: 15,
        width: 15,
        borderRadius: 10,
        backgroundColor: '#E8E8E8'
    },
});