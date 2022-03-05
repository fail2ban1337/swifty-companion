import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";

export default function ProfileScreen() {
  const [loaded] = useFonts({
    SmoochSansMedium: require("../assets/fonts/SmoochSans-Medium.ttf"),
  });
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.userPhoto}></View>
        <Text style={styles.userName}>Ayoub Belomari</Text>
        <View style={styles.userInfo}>
          <View style={styles.userInfoPresRow}>
            <Text style={styles.userinfoPres}>Wallet:</Text>
            <Text style={styles.userinfoPresValue}>169 ₳</Text>
          </View>
          <View style={styles.userInfoPresRow}>
            <Text style={styles.userinfoPres}>Evaluation Points:</Text>
            <Text style={styles.userinfoPresValue}>1 </Text>
          </View>
          <View style={styles.userInfoPresRow}>
            <Text style={styles.userinfoPres}>Grade:</Text>
            <Text style={styles.userinfoPresValue}>Member</Text>
          </View>
          <View style={styles.userInfoPresRow}>
            <Text style={styles.userinfoPres}>Email:</Text>
            <Text style={styles.userinfoPresValue}>
              ayoubbelomari@icloud.com
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.pojectsContainer}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    backgroundColor: "#01a2a4",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 40,
  },
  userPhoto: {
    width: 150,
    height: 150,
    backgroundColor: "#00babc",
    borderRadius: 150 / 2,
    marginTop: 50,
  },
  userName: {
    fontFamily: "SmoochSansMedium",
    color: "white",
    fontSize: 30,
  },
  userInfo: {
    backgroundColor: "rgba(32, 32, 38, 0.85)",
    alignSelf: "stretch",
    marginTop: 40,
    marginHorizontal: 5,
    borderRadius: 20,
    flexDirection: "column",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  userInfoPresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userinfoPres: {
    color: "#02cdd1",
    fontSize: 25,
    fontFamily: "SmoochSansMedium",
  },
  userinfoPresValue: {
    color: "white",
    fontSize: 25,
    fontFamily: "SmoochSansMedium",
  },
  pojectsContainer: {
    alignSelf: "stretch",
    height: 400,
    backgroundColor: "red",
  },
});
