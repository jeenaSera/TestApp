import {
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import React from 'react';
import TextLabel from '../labels/TextLabel';

type Props = {
  Icon?: JSX.Element;
  text?: any;
  disabled?: boolean;
  onPress: Function;
  btnStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function ButtonPress(props: Props) {
  const {text, onPress, disabled, btnStyle, textStyle, Icon} = {
    ...props,
  };
  return (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
      style={[styles.buttonView, btnStyle]}
      disabled={disabled}>
      {Icon ? <>{Icon}</> : <TextLabel title={text} textStyle={textStyle} />}
    </TouchableOpacity>
  );
}
export default ButtonPress;

const styles = StyleSheet.create({
  buttonView: {
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
  },
});
