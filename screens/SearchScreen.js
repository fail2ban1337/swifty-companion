import {
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { client_id } from "@env";

import { useState } from "react";

import { useFonts } from "expo-font";

import bgimg from "../assets/42.png";

export default function SearchScreen({ navigation }) {
  // console.log(client_id);
  const [text, setText] = useState("");
  const [loaded] = useFonts({
    SmoochSansMedium: require("../assets/fonts/SmoochSans-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <ImageBackground
      source={require("../assets/back42.jpg")}
      style={styles.background}
    >
      <StatusBar
        backgroundColor="white"
        hidden={false}
        barStyle={"light-content"}
      />
      <Image source={bgimg} style={{ width: 200, height: 200 }} />
      <View
        style={{
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 10,
          paddingHorizontal: 40,
          paddingVertical: 10,
          alignSelf: "stretch",
          marginHorizontal: 60,
        }}
      >
        <TextInput
          maxLength={10}
          style={{
            fontSize: 20,
            color: "white",
            fontFamily: "SmoochSansMedium",
          }}
          placeholder={"Entre username"}
          placeholderTextColor="white"
          onChange={(value) => setText(value.nativeEvent.text)}
        />
      </View>
      <View
        style={{
          marginTop: 25,
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 30,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{ fontSize: 20, fontFamily: "SmoochSansMedium" }}
          onPress={() =>
            navigation.navigate("profile", {
              name: text,
            })
          }
        >
          Search
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
