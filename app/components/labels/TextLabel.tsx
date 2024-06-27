import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import Colors from "../../colors/Colors";
type Props = {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

function TextLabel(props: Props) {
  const { title, textStyle, numberOfLines } = { ...props };
  return (
    <Text
      numberOfLines={numberOfLines ? numberOfLines : 10}
      adjustsFontSizeToFit
      style={[styles.text, textStyle]}
    >
      {title}
    </Text>
  );
}

export default TextLabel;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "left",
    color: Colors.black,
    fontFamily: "Roboto-Regular",
  },
});
