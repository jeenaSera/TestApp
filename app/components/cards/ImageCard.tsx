import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {BottomStackParamList} from '../../navigation/BottomNavigation';
let SCREEN_width = Math.round(Dimensions.get('window').width);
let screenHeight = Math.round(Dimensions.get('window').height);

type Props = {
  image: ImageSourcePropType;
  clickable: boolean;
};

function ImageCard(props: Props) {
  const {image, clickable} = {...props};
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomStackParamList>>();

  return (
    <>
      {clickable ? (
        <TouchableOpacity
          style={styles.mainview}
          onPress={() =>
            navigation.navigate('profile', {image: image} as never)
          }>
          <View style={styles.buttonView}>
            <Image style={styles.image} source={image} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.mainview}>
          <View style={styles.buttonView}>
            <Image style={styles.image} source={image} />
          </View>
        </View>
      )}
    </>
  );
}
export default ImageCard;
const styles = StyleSheet.create({
  mainview: {
    width: (SCREEN_width * 90) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: (screenHeight * 20) / 100,
    borderRadius: 10,
    marginLeft: (SCREEN_width * 5) / 100,
  },
  buttonView: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
});
