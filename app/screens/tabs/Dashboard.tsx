import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomStackParamList} from '../../navigation/BottomNavigation';
import Colors from '../../colors/Colors';
import Header from '../../components/headers/Header';
import Lexicons from '../../lexicons/Lexicons';
import TextLabel from '../../components/labels/TextLabel';
import TextForm from '../../components/forms/TextFrom';
import {useEffect, useState} from 'react';
import ColInfo from '../../components/forms/ColInfo';
import IP from '../../data/IPAddress/useIP';
import {APIDto} from '../../data/IPAddress/ip';
import Loading from '../../components/loadings/Loading';
import Carousel from 'react-native-snap-carousel';
import ImageCard from '../../components/cards/ImageCard';
import {NetworkInfo} from 'react-native-network-info';
import ErrorMessage from '../../components/messages/ErrorMessage';

type Props = NativeStackScreenProps<BottomStackParamList, 'dashboard'>;
const {width} = Dimensions.get('window');

export default function Dashboard(props: Props) {
  const [ipAddress, setIpAddress] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [data, setData] = useState<APIDto>();
  const [images] = useState([
    {
      image: require('../../assets/image1.jpg'),
    },
    {
      image: require('../../assets/image2.jpg'),
    },
    {
      image: require('../../assets/image3.jpg'),
    },
  ]);

  //get current IP address
  NetworkInfo.getIPAddress().then(ipAddress => {});

  const load = async () => {
    setLoading(true);
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
      <Header text={Lexicons.dashboard} />
      <ScrollView style={styles.scroll}>
        <View style={styles.view}>
          <TextLabel title={Lexicons.ipTracker} textStyle={styles.text} />
          <TextForm
            placeholder={Lexicons.ipPlaceHeader}
            updateValue={(x: string) => setIpAddress(x)}
            textValue={ipAddress!}
            onPress={() => setIpAddress(ipAddress)}
          />
        </View>
        {data && !loading ? (
          <View
            style={[
              styles.view,
              {backgroundColor: Colors.black, flexDirection: 'row'},
            ]}>
            <ColInfo
              title={Lexicons.ipAddress}
              value={ipAddress ? ipAddress : data.ip}
            />
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
        <View style={styles.subView}>
          <Carousel
            layout={'default'}
            vertical={false}
            containerCustomStyle={styles.continerStyle}
            data={images}
            loop={false}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            activeSlideAlignment={'start'}
            sliderWidth={(width * 100) / 100}
            itemWidth={(92.5 * width) / 100}
            renderItem={({item}) => (
              <ImageCard image={item.image} clickable={true} />
            )}
          />
        </View>
      </ScrollView>
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
  scroll: {
    width: '100%',
    height: '100%',
  },
  view: {
    width: '100%',
    backgroundColor: Colors.darkBlue,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginTop: '10%',
    marginBottom: '6%',
  },
  subView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: '10%',
  },
  continerStyle: {
    padding: 1,
    alignContent: 'flex-start',
  },
});
