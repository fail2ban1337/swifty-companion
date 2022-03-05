import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";

import image42 from "../assets/42-white.png";

export default function LoginScreen() {
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
      <Image style={styles.logo} source={image42} />
      <View style={styles.loginwrap}>
        <Text style={styles.loginwrapText}>Login with 42</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  loginwrap: {
    backgroundColor: "white",
    alignSelf: "stretch",
    height: 50,
    marginHorizontal: 80,
    borderRadius: 10,
  },
  loginwrapText: {
    color: "black",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 50,
    fontSize: 30,
    fontFamily: "SmoochSansMedium",
  },
});
