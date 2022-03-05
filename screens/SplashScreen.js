import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from "react-native";
import backimg from "../assets/back42.jpg";
import imagesch from "../assets/42-white.png";
export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace("login");
  }, 3000);
  return (
    <ImageBackground
      source={backimg}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <StatusBar hidden={true} />
      <Image source={imagesch} style={styles.image} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
