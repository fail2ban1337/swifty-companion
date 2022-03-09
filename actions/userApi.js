const axios = require("axios");
import {
  BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uri,
  grant_type,
} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CheckAccess = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@user_access");
    const jsonResult = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (!jsonResult || jsonResult.expires_in < 1) return false;
    await axios.get(`${BASE_URL}/oauth/token/info`, {
      headers: {
        Authorization: `Bearer ${jsonResult.access_token}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getAccess = async (code) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/oauth/token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirect_uri,
        grant_type: grant_type,
        code: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonValue = JSON.stringify(result.data);
    await AsyncStorage.setItem("@user_access", jsonValue);
    return true;
  } catch (error) {
    const jsonValue = await AsyncStorage.getItem("@user_access");
    const jsonResult = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (!jsonValue || jsonResult.expires_in < 1) return false;
    else return true;
  }
};

export const getInfoLoggedUser = async (username) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@user_access");
    const jsonResult = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (!jsonResult || jsonResult.expires_in < 1) return false;
    const result = await axios.get(`${BASE_URL}/v2/users/${username}`, {
      headers: {
        Authorization: `Bearer ${jsonResult.access_token}`,
      },
    });
    return result.data;
  } catch (error) {
    return false;
  }
};
