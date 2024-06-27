import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {BottomStackParamList} from '../../navigation/BottomNavigation';
import Colors from '../../colors/Colors';
import Header from '../../components/headers/Header';
import Lexicons from '../../lexicons/Lexicons';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ImageCard from '../../components/cards/ImageCard';
import ColInfo from '../../components/forms/ColInfo';
import Loading from '../../components/loadings/Loading';
import {APIDto} from '../../data/IPAddress/ip';
import IP from '../../data/IPAddress/useIP';
import ErrorMessage from '../../components/messages/ErrorMessage';

type Props = NativeStackScreenProps<BottomStackParamList, 'profile'>;

export default function Profile(props: Props) {
  const {route} = {...props};

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [data, setData] = useState<APIDto>();
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomStackParamList>>();

  const load = async () => {
    try {
      const response: any = await IP.getInfo();
      setData(response);
      setLoading(false);
    } catch (err) {
      //use error message as defualt because i don't have api to send report.
      setErrorMessage(Lexicons.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    load();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Header text={Lexicons.profile} onPress={() => navigation.goBack()} />
      <ImageCard
        image={
          route && route.params && route.params.image
            ? route.params.image
            : require('../../assets/image1.jpg')
        }
        clickable={false}
      />
      {data && !loading ? (
        <View
          style={[
            styles.view,
            {backgroundColor: Colors.black, flexDirection: 'row'},
          ]}>
          <ColInfo title={Lexicons.ipAddress} value={data.ip} />
          <ColInfo
            title={Lexicons.location}
            value={data.country + ',' + data.country_code + ',' + data.postal}
          />
          <ColInfo
            title={Lexicons.timeZone}
            value={'UTC ' + data.timezone.utc}
          />
          <ColInfo title={Lexicons.isp} value={data.connection.isp} />
        </View>
      ) : (
        <Loading />
      )}
       <ErrorMessage
        message={errorMessage!}
        updateMessage={() => setErrorMessage('')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
  },
  view: {
    width: '100%',
    marginTop: '5%',
    backgroundColor: Colors.darkBlue,
  },
});
