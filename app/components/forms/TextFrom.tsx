import React from 'react';
import {TextInput, StyleSheet, View, Platform} from 'react-native';
import Colors from '../../colors/Colors';
import ButtonPress from '../buttons/ButtonPress';
import IconForm from '../../icon/IconForm';

type Props = {
  placeholder: string;
  updateValue: Function;
  textValue: string;
  onPress: Function;
};
function TextForm(props: Props) {
  const {placeholder, updateValue, textValue, onPress} = {
    ...props,
  };

  return (
    <View style={styles.textView}>
      <TextInput
        style={styles.inputText}
        allowFontScaling={false}
        onChangeText={async text => {
          updateValue(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={Colors.grey}
        value={textValue ? textValue : ''}
      />
      <ButtonPress
        onPress={() => onPress()}
        Icon={
          <IconForm size={18} name={'chevron-right'} color={Colors.white} />
        }
        btnStyle={styles.btn}
      />
    </View>
  );
}

export default TextForm;

const styles = StyleSheet.create({
  textView: {
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginTop: '2.5%',
    marginBottom: '10%',
  },
  inputText: {
    width: '80%',
    borderRadius: 10,
    padding: Platform.OS == 'ios' ? 15 : 5,
  },
  btn: {
    width: '20%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.black,
  },
});
