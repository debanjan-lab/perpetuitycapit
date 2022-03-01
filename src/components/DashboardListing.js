import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

const DashboardListing = ({heading,data}) => {
    return (
            <View style={styles.listmargin}>
                <Text style={{ color: '#2F4F4F' }}>{heading}</Text>
                <Text style={{ color: Colors.mainTextColor }}>{data}</Text>
            </View>
    )
}

export default DashboardListing;


const styles = StyleSheet.create({
    listmargin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.greyColor,
        paddingVertical: 10
    }

})