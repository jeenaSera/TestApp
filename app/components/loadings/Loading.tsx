import {
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Colors from '../../colors/Colors';



type Props = {
  backgroundColor?: string;
  Color?: string;
  Style?: StyleProp<ViewStyle>;
};

function Loading(props: Props) {
  const {backgroundColor, Color, Style} = props;

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor: backgroundColor ? backgroundColor : Colors.white,
        },
        Style,
      ]}>
      <ActivityIndicator size="large" color={Color ? Color : Colors.blue} />
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.white,
  },
});
