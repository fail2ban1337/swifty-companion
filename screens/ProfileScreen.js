import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  SectionList,
} from "react-native";
import { Header, ListItem, Avatar } from "react-native-elements";

import { useEffect } from "react";
import { useFonts } from "expo-font";
import { getInfoLoggedUser } from "../actions/userApi";
import PercentageBar from "../lib/Level-bar.component";
import PercentageBarSkill from "../lib/Percentage-bar.component";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ route, navigation }) {
  const [loaded] = useFonts({
    SmoochSansMedium: require("../assets/fonts/SmoochSans-Medium.ttf"),
  });

  const { result } = route.params;
  let cursus_users = {};
  result.cursus_users.forEach((element) => {
    if (element.grade == "member") {
      cursus_users = element;
    } else if (element.grade != null || result.cursus_users.length == 1) {
      cursus_users = element;
    }
  });
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.userPhoto}>
            <Image
              source={{ uri: result.image_url }}
              style={{ width: "100%", height: "100%", borderRadius: 150 / 2 }}
            />
          </View>
          <Text style={styles.userName}>{result.usual_full_name}</Text>
          <View style={styles.userInfo}>
            <View style={styles.userInfoPresRow}>
              <Text style={styles.userinfoPres}>Wallet:</Text>
              <Text style={styles.userinfoPresValue}>{result.wallet} ₳</Text>
            </View>
            <View style={styles.userInfoPresRow}>
              <Text style={styles.userinfoPres}>Evaluation Points:</Text>
              <Text style={styles.userinfoPresValue}>
                {result.correction_point}
              </Text>
            </View>
            <View style={styles.userInfoPresRow}>
              <Text style={styles.userinfoPres}>location:</Text>
              <Text style={styles.userinfoPresValue}>
                {result.location ? result.location : "Unavailable"}
              </Text>
            </View>
            <View style={styles.userInfoPresRow}>
              <Text style={styles.userinfoPres}>Email:</Text>
              <Text style={styles.userinfoPresValue}>{result.email}</Text>
            </View>
            <View style={styles.userInfoPresRow}>
              <Text style={styles.userinfoPres}>level:</Text>
              <Text style={styles.userinfoPresValue}>{cursus_users.level}</Text>
            </View>
            <View style={{ alignSelf: "stretch", marginTop: 20 }}>
              <PercentageBar percentage={cursus_users.level} />
            </View>
          </View>
        </View>
        <View style={styles.pojectsContainer}>
          <View
            style={{
              backgroundColor: "#01a2a4",
              paddingBottom: 5,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                alignSelf: "center",
                paddingVertical: 15,
                paddingHorizontal: 40,
                borderRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: 200,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  color: "black",
                  fontFamily: "SmoochSansMedium",
                }}
              >
                Projects
              </Text>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {result.projects_users.map((r, key) => {
              if (r.status == "finished")
                return (
                  <View style={styles.userProjectsRow} key={key}>
                    <Text style={styles.userProjPres}>{r.project.name}</Text>
                    <View style={{ alignContent: "center" }}>
                      <Text style={styles.userProjPresValue}>
                        {r.final_mark}
                        {r["validated?"] ? (
                          <Ionicons
                            name="md-checkmark-circle"
                            size={30}
                            color="#01a2a4"
                          />
                        ) : (
                          <Ionicons
                            name="close-circle"
                            size={30}
                            color="#D8636F"
                          />
                        )}
                      </Text>
                    </View>
                  </View>
                );
            })}
          </ScrollView>
        </View>
        <View style={styles.pojectsContainer}>
          <View
            style={{
              backgroundColor: "#01a2a4",
              paddingBottom: 5,
              justifyContent: "center",
              height: 100,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                alignSelf: "center",
                paddingVertical: 15,
                paddingHorizontal: 40,
                borderRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: 200,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  color: "black",
                  fontFamily: "SmoochSansMedium",
                }}
              >
                Skills
              </Text>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {cursus_users.skills !== undefined &&
            cursus_users.skills.length != 0
              ? cursus_users.skills.map((r, i) => (
                  <ListItem key={i} bottomDivider>
                    <ListItem.Content style={styles.userSkillsCol}>
                      <ListItem.Title style={styles.userProjPres}>
                        {r.name}
                      </ListItem.Title>
                      <ListItem.Subtitle style={styles.userProjPresValue}>
                        {r.level}
                      </ListItem.Subtitle>
                      <PercentageBarSkill percentage={r.level} />
                    </ListItem.Content>
                  </ListItem>
                ))
              : null}
          </ScrollView>
        </View>
      </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    backgroundColor: "white",
  },
  userProjectsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  userProjPres: {
    color: "#02cdd1",
    fontSize: 25,
    fontFamily: "SmoochSansMedium",
  },
  userProjPresValue: {
    color: "#02cdd1",
    fontSize: 25,
    fontFamily: "SmoochSansMedium",
  },
  userSkillsCol: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
