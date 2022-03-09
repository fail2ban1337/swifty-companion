import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const PercentageBar = ({ percentage = 0.0 }) => {
  const [getPercentage, setPercentage] = useState(percentage);
  var split_looptijden_1 = percentage.toString().split(".");
  // const percen = `${split_looptijden_1[1]} %`;
  let percen;
  if (split_looptijden_1[1] <= 9 && split_looptijden_1[1] >= 1) {
    percen = `${split_looptijden_1[1] * 10}%`;
  } else {
    percen = `${split_looptijden_1[1]} %`;
  }
  return (
    <View>
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            width: "100%",
            height: 40,
            borderRadius: 5,
            borderColor: "#00babc",
            borderWidth: 1,
          }}
        />
        <Text
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 50,
            color: "white",
            fontSize: 20,
            zIndex: 9999,
          }}
        >
          {getPercentage}
        </Text>
        <View
          style={{
            width: percen ? percen : 0,
            height: 40,
            borderRadius: 5,
            backgroundColor: "#00babc",
            position: "absolute",
            bottom: 40,
          }}
        />
        <View
          style={{
            width: percen ? percen : 0,
            height: 40,
            bottom: 10,
          }}
        ></View>
      </View>
    </View>
  );
};
export default PercentageBar;
