import React from 'react';
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
import fontSelector from '../constants/FontSelectors';
import Colors from '../constants/Colors';
const ButtonUtil = ({ label, loading, onPress, icon, textDecorationLine, active, lesspadding, lesspaddingWithIcon, rightIcon, leftIcon }) => {
  if (icon) {
    return (
      <TouchableOpacity
        style={styles.btnWrapperIcon}
        onPress={() => onPress()}
      >
        <Image source={icon} style={styles.icon} />
        <View style={{ margin: 5 }} />
        <Text style={styles.btnTextIcon}>{label}</Text>
      </TouchableOpacity>
    );
  }
  if (textDecorationLine) {
    return (
      <TouchableOpacity
        style={styles.btnWrapperTextDecorationLine}
        onPress={() => onPress()}
      >
        <Text style={styles.btnTextDecorationLine}>{label}</Text>
      </TouchableOpacity>

    );
  }
  if (lesspadding) {
    return (
      <TouchableOpacity
        style={styles.btnWrapperActiveLessPadding}
        onPress={() => onPress()}
      >
        <Text style={[styles.btnText, { paddingLeft: wp(10), paddingRight: wp(10), padding: 10 }]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  if (lesspaddingWithIcon) {
    return (
      <TouchableOpacity
        style={label ? styles.btnWrapperActiveLessPaddingWithIcon : styles.btnWrapperActiveLessPaddingWithIconWithoutLabel}
        onPress={() => onPress()}
      >
        {
          leftIcon &&
          <>
            <Image
              source={leftIcon}
              style={styles.icon}
            />
            <View style={{ margin: 5 }} />
          </>
        }

        {
          label && <Text style={styles.btnText}>{label}</Text>
        }

        {
          rightIcon &&
          <>
            <View style={{ margin: 5 }} />
            <Image
              source={rightIcon}
              style={styles.icon}
            />
          </>
        }

      </TouchableOpacity>
    );
  }


  return (
    <TouchableOpacity
      style={!active ? styles.btnWrapperInactive : styles.btnWrapperActive}
      onPress={() => onPress()}
      disabled={!active}
    >
      <Text style={styles.btnText}>{label}</Text>
      {loading && <><View style={{ margin: 5 }} /><ActivityIndicator color={'#FFF'} /></>}
    </TouchableOpacity>
  );
};

export default ButtonUtil;
const styles = StyleSheet.create({
  btnWrapperTextDecorationLine: {
    alignSelf: 'center',

  },
  btnWrapperIcon: {
    borderColor: Colors.greenColor,
    borderWidth: 1,
    padding: wp(3),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnWrapperActive: {
    backgroundColor: Colors.greenColor,
    padding: wp(3),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnWrapperActiveLessPadding: {
    backgroundColor: Colors.greenColor,
    alignSelf: 'center',
    borderRadius: 20,
  },
  btnWrapperActiveLessPaddingWithIcon: {
    backgroundColor: Colors.greenColor,
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    paddingLeft: wp(10),
    paddingRight: wp(10),
    padding: 10
  },
  btnWrapperActiveLessPaddingWithIconWithoutLabel: {
    backgroundColor: '#EEF9EF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    //paddingLeft: wp(4),
    // paddingRight: wp(4),
    //padding: 10,
    height: wp(20),
    width: wp(20),
    borderRadius: wp(20)
  },
  btnWrapperInactive: {
    backgroundColor: Colors.greenColorInactive,
    padding: wp(3),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: Colors.whiteColor,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: fontSelector('regular')
  },
  btnTextIcon: {
    color: Colors.mainTextColor,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: fontSelector('regular')
  },
  icon: {
    height: wp(8),
    width: wp(8),
    resizeMode: 'contain'
  },
  btnTextDecorationLine: {
    fontFamily: fontSelector('medium'),
    fontSize: wp(3.8),
    color: Colors.greenColor,
    textDecorationLine: 'underline'
  }
});