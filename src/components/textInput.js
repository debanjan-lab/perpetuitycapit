import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Image,
    TextInput
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontSelector from '../constants/FontSelectors';
import Colors from '../constants/Colors';
const TextInputUtil = ({ prefix,
    hasDevider,
    onChangeText,
    value,
    maxLength,
    keyboardType,
    placeHolder,
    rightIcon,
    onPressRightIcon,
    editable,
    autoCapitalize
}) => {
    return (
        <View style={styles.container}>
            {
                prefix &&
                <>
                    <View style={styles.prefixWrapper}>
                        <Text style={styles.prefixText}>+91</Text>
                    </View>
                    {hasDevider && <View style={{ height: wp(7), backgroundColor: Colors.subTextColor, width: wp(0.3), marginHorizontal: wp(3) }} />}
                </>
            }
            <TextInput
                defaultValue={value}
                onChangeText={onChangeText}
                placeholder={placeHolder}
                placeholderTextColor={Colors.subTextColor}
                keyboardType={keyboardType}
                style={styles.input}
                maxLength={maxLength}
                editable={editable}
                autoCapitalize={autoCapitalize}
            />

            {rightIcon && <TouchableOpacity onPress={() => onPressRightIcon()}><Image source={rightIcon} style={styles.icon} /></TouchableOpacity>}
        </View>
    );
};

export default TextInputUtil;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F1F6FC',
        borderRadius: wp(12),
        alignItems: 'center',
    },
    prefixWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: wp(5)
    },
    prefixText: {
        fontFamily: fontSelector('regular'),
        fontSize: wp(3.5),
        color: Colors.mainTextColor,
        marginRight: wp(2)
    },
    input: {
        flex: 1,
        color: Colors.mainTextColor,
        fontFamily: fontSelector('regular'),
        padding: 10,
        paddingRight: 20
    },
    icon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain',
        right: 10,
    },

});