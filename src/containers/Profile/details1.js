import React, { Component, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import DashboardCard from "../../components/DashboardCard";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardHeaderInner from "../../components/DashboardHeaderInner";
import Colors from "../../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
const Card = (props) => {
  return (
    <View style={{ padding: 10, marginBottom: 10 }}>
      <View style={{ flexDirection: "row" }}>
        {props.children}
        <Text
          style={{
            marginLeft: props.leftmargin ? props.leftmargin : 8,
            color: Colors.mainTextColor,
          }}
        >
          {props.name}
        </Text>
      </View>
      <View style={{ marginTop: -10, paddingLeft: 21 }}>
        <TextInput
          value={props.value}
          placeholder={props.plcholder}
          style={
            props.breadth
              ? [styles.txtinput, { width: props.breadth, color: "black" }]
              : [
                  styles.txtinput,
                  {
                    borderBottomWidth:
                      props.name == "E-mail" ||
                      "Phone no" ||
                      "Name(as per PAN Card)"
                        ? 0
                        : 1,
                    color: "black",
                  },
                ]
          }
        />
      </View>
    </View>
  );
};
class ProfileDetails1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      phone: null,
      adhaar: null,
      address: null,
      pincode: null,
      state: null,
      city: null,
      dob: null,
    };
  }
  componentDidMount = () => {
    const authState = this.props.auth;
    console.log("authState", authState);
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();

    var config = {
      method: "get",
      url: "https://foure.nodejsdapldevelopments.com/perpetuitycapital/public/api/v1/Auth/profile",
      headers: {
        Authorization: "Bearer " + authState.api_token,
        Accept: "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("dataaa", JSON.stringify(response.data));
        this.setState({
          name: response.data.data.name,
          email: response.data.data.email,
          pincode: response.data.data.pincode,
          state: response.data.data.state_id,
          city: response.data.data.city_id,
          phone: response.data.data.country_code + response.data.data.mobile,
        });
        console.log("hello", this.state.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <DashboardHeader navigation={this.props.navigation} />
          <DashboardHeaderInner
            headerText="My Profile"
            navigation={this.props.navigation}
            goBack={true}
          />
          <DashboardCard>
            <View style={{ padding: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: Colors.mainTextColor,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Personal Details
                  </Text>
                  <Text style={{ color: "red", fontSize: 10 }}>
                    Your Profile is incomplete
                  </Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text style={{ color: "black" }}>Edit information</Text>
                </View>
              </View>
              <View
                style={{
                  width: 325,
                  backgroundColor: Colors.subTextColor,
                  height: 1,
                  marginTop: 10,
                }}
              />
            </View>
            <Card
              name="Name(as per PAN Card)"
              props={this.props}
              value={this.state.name}
            >
              <Ionicons name="person-outline" size={18} color="green" />
            </Card>
            <Card name="E-mail" props={this.props} value={this.state.email}>
              <Fontisto name="email" size={18} color="green" />
            </Card>
            <Card name="Phone no" props={this.props} value={this.state.phone}>
              <Feather name="phone" size={18} color="green" />
            </Card>
            <View style={{ padding: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons name="date-range" size={18} color="green" />
                <Text style={{ marginLeft: 8, color: Colors.mainTextColor }}>
                  D.O.B
                </Text>
              </View>
              <View style={{ flexDirection: "row", paddingLeft: 25 }}>
                <TextInput
                  placeholder="dd"
                  style={[styles.txtinput, { width: 38, marginRight: 15 }]}
                />
                <TextInput
                  placeholder="mm"
                  style={[styles.txtinput, { width: 38, marginRight: 15 }]}
                />
                <TextInput
                  placeholder="yyyy"
                  style={[styles.txtinput, { width: 38, marginRight: 15 }]}
                />
              </View>
            </View>

            <Card name="Address" plcholder="Enter Address" props={this.props}>
              <Ionicons name="location-outline" size={18} color="green" />
            </Card>
            <Card
              name="Aadhaar number"
              plcholder="Enter Aadhaar Number"
              props={this.props}
            >
              <FontAwesome name="id-card-o" size={18} color="green" />
            </Card>
            <Card
              name="PAN number"
              plcholder="Enter PAN Number"
              props={this.props}
            >
              <AntDesign name="idcard" size={18} color="green" />
            </Card>
            <Card
              name="Pincode"
              plcholder="Enter Pincode"
              props={this.props}
              value={this.state.pincode}
            >
              <FontAwesome name="pencil-square-o" size={18} color="green" />
            </Card>
            <View style={{ flexDirection: "row" }}>
              <Card
                name="State"
                plcholder="AUTOFILL"
                props={this.props}
                breadth={120}
                value={this.state.state}
              >
                <MaterialIcons
                  name="location-searching"
                  size={18}
                  color="green"
                />
              </Card>
              <Card
                name="City"
                plcholder="AUTOFILL"
                props={this.props}
                breadth={120}
                leftmargin={25}
                value={this.state.city}
              />
            </View>
          </DashboardCard>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(ProfileDetails1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  txtinput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.subTextColor,
    paddingBottom: 0,
  },
});
