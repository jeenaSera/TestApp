import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TextLabel from '../labels/TextLabel';
import Colors from '../../colors/Colors';
import Modal from 'react-native-modal';
import ButtonPress from '../buttons/ButtonPress';
import IconForm from '../../icon/IconForm';

type Props = {
  message: string;
  updateMessage: Function;
};

function ErrorMessage(props: Props) {
  const [visible, setVisble] = useState(false);
  const {message, updateMessage} = {
    ...props,
  };
  const onClose = async () => {
    setVisble(!visible);
  };
  useEffect(() => {
    if (message) {
      setVisble(true);
    }
    setTimeout(async () => {
      updateMessage();
      setVisble(false);
    }, 5000);
  }, [message]);

  return (
    <Modal
      isVisible={visible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      hasBackdrop={false}
      onBackdropPress={() => onClose()}
      style={styles.modal}>
      <View
        style={[
          styles.mainView,
          {
            backgroundColor: Colors.darkBlue,
          },
        ]}>
        <TextLabel
          title={message}
          textStyle={[{color: Colors.white}, styles.titleText]}
        />
        <ButtonPress
          Icon={<IconForm name={'close'} color={Colors.white} size={26} />}
          onPress={() => onClose()}
        />
      </View>
    </Modal>
  );
}
export default ErrorMessage;
const styles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    padding: 10,
    top: 50,
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal: {
    maxHeight: '10%',
    width: '100%',
    backgroundColor: Colors.transparent,
    margin: 0,
  },
  titleText: {width: '80%', fontSize: 14},
});
