import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../colors/Colors';
import TextLabel from '../labels/TextLabel';
type Props = {
  title: string;
  value: string;
};
function TextForm(props: Props) {
  const {title, value} = {
    ...props,
  };

  return (
    <View style={styles.colView}>
      <TextLabel title={title} textStyle={[styles.normalText]} />
      <TextLabel
        title={value}
        textStyle={[
          styles.normalText,
          {fontSize: 12, color: Colors.grey, paddingBottom: 10},
        ]}
      />
    </View>
  );
}

export default TextForm;

const styles = StyleSheet.create({
  colView: {
    width: '25%',
    flexDirection: 'column',
  },
  normalText: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
    paddingTop: 10,
  },
});
