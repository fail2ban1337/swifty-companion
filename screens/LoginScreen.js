import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import * as Linking from "expo-linking";

import { useFonts } from "expo-font";
import * as WebBrowser from "expo-web-browser";

import image42 from "../assets/42-white.png";

export default function LoginScreen() {
  const [loaded] = useFonts({
    SmoochSansMedium: require("../assets/fonts/SmoochSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }
  let url =
    "https://api.intra.42.fr/oauth/authorize?client_id=897ad82467da0b23311fe619b9f9f0fb8f608bc98dc97a748ae73f00842acc97&redirect_uri=exp%3A%2F%2F172.20.10.14%3A19000&response_type=code";
  const _handlePressButtonAsync = async () => {
    WebBrowser.openBrowserAsync(url);
    Linking.addEventListener("url", async (event) => {
      let data = Linking.parse(event.url);
      code = data.queryParams.code;
      const token = await SecureStore.getItemAsync("secure_token");
      if (!code || token) WebBrowser.dismissBrowser();
      await SecureStore.setItemAsync("secure_token", code);
      console.log(token);
    });
  };
  return (
    <ImageBackground
      source={require("../assets/back42.jpg")}
      style={styles.background}
    >
      <Image style={styles.logo} source={image42} />
      <TouchableNativeFeedback onPress={_handlePressButtonAsync}>
        <View style={styles.loginwrap}>
          <Text style={styles.loginwrapText}>Login with 42</Text>
        </View>
      </TouchableNativeFeedback>
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
