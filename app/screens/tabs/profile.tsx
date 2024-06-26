import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomStackParamList} from '../../navigation/BottomNavigation';
import Colors from '../../colors/Colors';
import {RootStackParamList} from '../../navigation/Navigation';

type Props = NativeStackScreenProps<BottomStackParamList, 'profile'>;

export default function Profile(props: Props) {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Hello here</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.red,
  },
});
