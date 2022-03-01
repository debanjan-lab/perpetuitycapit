import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";

const DashboardHeader = ({ navigation, navigation1 }) => {
  return (
    <View style={styles.successRow}>
      <View
        style={{
          backgroundColor: "#1A5632",
          paddingVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Image
            source={require("../images/side_menu_logo.png")}
            style={{
              height: 40,
              width: 40,
              resizeMode: "contain",
              marginLeft: 35,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, marginRight: 22 }}>
          <View style={{ marginTop: 6, marginRight: 8 }}>
            <TouchableOpacity
              onPress={() =>
                navigation1
                  ? navigation1.navigate("DashboardScreen1")
                  : navigation.navigate("NotificationScreen")
              }
            >
              <Ionicons
                name="md-notifications-outline"
                color="white"
                size={19}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation1
                  ? navigation1.dispatch(DrawerActions.toggleDrawer())
                  : navigation.dispatch(DrawerActions.toggleDrawer())
              }
            >
              <Ionicons name="md-menu-outline" color="white" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  successRow: {
    backgroundColor: Colors.lightGreen,
  },
});
