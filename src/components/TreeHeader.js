import React from 'react'
import { View,StyleSheet,Image} from 'react-native';
import Colors from '../constants/Colors';

const TreeHeader = () => {
    return(
        <View style={styles.successRow}>
        <View style={{backgroundColor: '#1A5632',paddingVertical:15}}>
        <Image
            source={require('../images/side_menu_logo.png')}
            style={{ height:40, width: 40, resizeMode: 'contain',marginLeft:35 }}
        />
        </View>
        </View>
        
    )
}

export default TreeHeader

const styles = StyleSheet.create({
    successRow: {
        backgroundColor: Colors.lightGreen,
    }
})