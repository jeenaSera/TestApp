import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../colors/Colors';
import IconForm from '../../icon/IconForm';
import TextLabel from '../labels/TextLabel';
import ButtonPress from '../buttons/ButtonPress';

type Props = {
  text: string;
  onPress?: Function;
};

function SimpleHeader(props: Props) {
  const {text, onPress} = {
    ...props,
  };

  return (
    <View
      style={[
        styles.mainView,
        {justifyContent: onPress ? 'flex-start' : 'center'},
      ]}>
      {onPress && (
        <ButtonPress
          Icon={
            <IconForm name={'chevron-left'} size={16} color={Colors.darkBlue} />
          }
          onPress={() => onPress()}
        />
      )}
      <TextLabel
        title={text}
        textStyle={[styles.titleStyle, {width: onPress ? '90%' : 'auto'}]}
      />
    </View>
  );
}
export default SimpleHeader;
const styles = StyleSheet.create({
  mainView: {
    width: '95%',
    margin: '2.5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    fontWeight: '700',
    color: Colors.darkBlue,
    textAlign: 'center',
  },
});
