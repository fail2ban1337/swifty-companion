import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import bgimg from "../assets/42.png";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />
      <Image source={bgimg} style={{ width: 100, height: 100 }} />
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
          style={{ fontSize: 20 }}
          placeholder={"Entre username"}
          placeholderTextColor="white"
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
        <Text style={{ fontSize: 20 }}>Search</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
