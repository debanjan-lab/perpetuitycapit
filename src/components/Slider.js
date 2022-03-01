// import React from 'react';
// import { View,Text } from 'react-native';

// const App = () =>{
//     return(
//     <View>
//     <Text>tajesh</Text>
//     </View>
//     )
// }

// export default App

// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import React, { useState } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";

//import AppIntroSlider to use it
import AppIntroSlider from "react-native-app-intro-slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";

const Slider = (props) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  //console.log("navigation", props.navigation);

  const userRegistration = () => {
    if (name == "" || email == "" || phone == "") {
      Toast.show("Cannot leave a blank field");
    } else {
      let obj = {
        name: name,
        email: email,
        country_code: "+91",
        terms_and_condition: 1,
        mobile: phone,
        device_token: deviceToken,
        type: 1,
        social_id: "1",
      };
      // console.log("obj", obj)
      props.doRegister(obj).then(() => {
        console.log("---------------", props);

        props.navigation.navigate("OtpScreen", { navigation: obj });
      });
    }
  };
  const RenderItem = ({ item }) => {
    console.log("iitem", item);
    if (item.key == "1" || item.key == "2" || item.key == "3") {
      return (
        <View>
          <Image style={styles.introImageStyle} source={item.image} />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.greenColor,
                fontSize: 20,
              }}
            >
              SIGN UP
            </Text>
          </View>
          <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: "row", marginLeft: 40 }}>
              <View style={{ marginRight: 5 }}>
                <FontAwesome name="user-o" size={18} color="green" />
              </View>
              <View>
                <Text>Name(as per PAN Card)</Text>
              </View>
            </View>
            <View style={{ marginLeft: 56, marginRight: 40 }}>
              <TextInput
                placeholder="Enter name"
                style={[styles.input, { color: "black" }]}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: "row", marginLeft: 40 }}>
              <View style={{ marginRight: 5 }}>
                <Fontisto name="email" size={18} color="green" />
              </View>
              <View>
                <Text>Email</Text>
              </View>
            </View>
            <View style={{ marginLeft: 56, marginRight: 40 }}>
              <TextInput
                placeholder="Enter email"
                style={[styles.input, { color: "black" }]}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: "row", marginLeft: 40 }}>
              <View style={{ marginRight: 5 }}>
                <Feather name="phone" size={18} color="green" />
              </View>
              <View>
                <Text>Phone no</Text>
              </View>
            </View>
            <View style={{ marginLeft: 56, marginRight: 40 }}>
              <TextInput
                placeholder="Enter Phonne no"
                style={[styles.input, { color: "black" }]}
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => userRegistration()}
          >
            <Text style={{ color: Colors.whiteColor }}>GET OTP</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
  };

  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        showNextButton={false}
        showDoneButton={false}
        activeDotStyle={styles.activeDotStyle}
      />
      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: -20 }}
      >
        <Text>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("PhoneScreen")}
        >
          <Text style={{ color: "green" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  introImageStyle: {
    width: 300,
    height: 300,
    marginLeft: 55,
    marginTop: 10,
  },
  input: {
    borderBottomColor: "#05375a",
    borderBottomWidth: 0.25,
    paddingBottom: -5,
    paddingVertical: 6,
  },
  btn: {
    backgroundColor: Colors.greenColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 150,
    borderRadius: 5,
    marginTop: 50,
  },
  activeDotStyle: {
    backgroundColor: Colors.greenColor,
  },
});

const slides = [
  {
    key: "1",
    text: "Best Recharge offers",
    title: "Mobile Recharge",
    image: require("../images/onboarding.jpg"),
    backgroundColor: "#20d2bb",
  },
  {
    key: "2",
    title: "Flight Booking",
    text: "Upto 25% off on Domestic Flights",
    image: require("../images/onboarding.jpg"),
    backgroundColor: "#febe29",
  },
  {
    key: "3",
    title: "Great Offers",
    text: "Enjoy Great offers on our all services",
    image: require("../images/onboarding.jpg"),
    backgroundColor: "#22bcb5",
  },
  {
    key: "4",
    title: "Best Deals",
    text: " Best Deals on all our services",
    image: require("../images/onboarding.jpg"),
    backgroundColor: "#3395ff",
  },
];
