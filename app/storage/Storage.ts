import AsyncStorage from "@react-native-async-storage/async-storage";

const getValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    // console.log(error);
  }
};

const storeValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};
const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};
export default { getValue, storeValue, removeValue };
