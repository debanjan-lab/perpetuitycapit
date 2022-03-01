import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DashboardCard from "./DashboardCard";
import Colors from "../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import PieChart from "./PieChart";

const DashboardProfile = (props) => {
  return (
    <View style={{ marginTop: 17 }}>
      <DashboardCard color={Colors.greenColor}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ color: Colors.subTextColor }}>Hello,</Text>
            <Text style={{ color: Colors.subTextColor, fontSize: 22 }}>
              Raichand
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ProfileDetailsScreen1")}
            >
              <View style={{ flexDirection: "row", marginTop: 12 }}>
                <View>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      marginRight: 7,
                      fontSize: 10,
                    }}
                  >
                    complete your profile
                  </Text>
                </View>
                <View style={{ marginTop: 2 }}>
                  <AntDesign
                    name="rightcircle"
                    size={10}
                    style={{ color: Colors.whiteColor }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 5, marginRight: 5 }}>
            <PieChart />
            <View>
              <Text
                style={{
                  color: Colors.subTextColor,
                  fontSize: 8,
                  marginLeft: 6,
                }}
              >
                Complete
              </Text>
            </View>
          </View>
        </View>
      </DashboardCard>
    </View>
  );
};
export default DashboardProfile;
