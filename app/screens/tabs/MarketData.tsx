import { SafeAreaView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomStackParamList } from "../../navigation/BottomNavigation";
import Colors from "../../colors/Colors";

type Props = NativeStackScreenProps<BottomStackParamList, "marketData">;

export default function MarketData(props: Props) {
  return <SafeAreaView style={styles.main}></SafeAreaView>;
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.white,
  },
});
