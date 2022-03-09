import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";
import { useFonts } from "expo-font";
import * as WebBrowser from "expo-web-browser";
import image42 from "../assets/42-white.png";
import { CheckAccess, getAccess } from "../actions/userApi";

export default function LoginScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function test() {
      if (await CheckAccess()) {
        return navigation.replace("search");
      } else {
        setIsLoading(false);
      }
    }
    test();
  }, []);

  if (isLoading) {
    return null;
  }
  let url =
    "https://api.intra.42.fr/oauth/authorize?client_id=897ad82467da0b23311fe619b9f9f0fb8f608bc98dc97a748ae73f00842acc97&redirect_uri=exp%3A%2F%2F10.12.2.4%3A19000&response_type=code";
  const _handlePressButtonAsync = async () => {
    WebBrowser.openBrowserAsync(url);
    Linking.addEventListener("url", async (event) => {
      let data = Linking.parse(event.url);
      code = data.queryParams.code;
      if (Platform.OS == "android") {
        if (await getAccess(code)) {
          return navigation.replace("search");
        }
      } else {
        if (!code) WebBrowser.dismissBrowser();
        else {
          if (await getAccess(code)) {
            WebBrowser.dismissBrowser();
            navigation.replace("search");
          }
        }
        WebBrowser.dismissBrowser();
      }
    });
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
      <Image style={styles.logo} source={image42} />
      <TouchableNativeFeedback onPress={() => _handlePressButtonAsync()}>
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
    fontSize: 20,
  },
});
