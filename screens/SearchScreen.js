import {
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  ImageBackground,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import bgimg from "../assets/42-white.png";
import { CheckAccess, getInfoLoggedUser } from "../actions/userApi";
export default function SearchScreen({ navigation }) {
  const [text, setText] = useState("");
  const [TextError, setTextError] = useState(false);
  const [loaded] = useFonts({
    SmoochSansMedium: require("../assets/fonts/SmoochSans-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const _handleSearchButton = async () => {
    const result = await CheckAccess();
    if (!result) {
      return navigation.navigate("login");
    } else {
      let result;
      if (
        (result = await getInfoLoggedUser(text.toLocaleLowerCase())) &&
        text.trim() !== ""
      ) {
        navigation.navigate("profile", {
          name: text,
          result: result,
        });
      } else {
        setTextError(true);
      }
    }
  };
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
        style={[
          styles.SearchBar,
          TextError ? styles.textinvalid : styles.textvalid,
        ]}
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
          onChange={(value) => {
            setText(value.nativeEvent.text);
            setTextError(false);
          }}
        />
      </View>
      <TouchableNativeFeedback onPress={() => _handleSearchButton()}>
        <View style={styles.searchButton}>
          <Text
            style={{ fontSize: 20, fontFamily: "SmoochSansMedium" }}
            // onPress={() =>
            //   navigation.navigate("profile", {
            //     name: text,
            //   })
            // }
          >
            Search
          </Text>
        </View>
      </TouchableNativeFeedback>
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
  searchButton: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  SearchBar: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: "stretch",
    marginHorizontal: 60,
  },
  textinvalid: {
    borderColor: "red",
  },
  textvalid: {
    borderColor: "white",
  },
});
