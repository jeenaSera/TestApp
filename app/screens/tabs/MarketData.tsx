import {SafeAreaView, StyleSheet, Dimensions, ScrollView} from 'react-native';
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
import {LineChart} from 'react-native-chart-kit';
import {RatesDto} from '../../data/json/json';
import TextLabel from '../../components/labels/TextLabel';
import Rate from '../../data/Forex/useForex';
import Loading from '../../components/loadings/Loading';
import ErrorMessage from '../../components/messages/ErrorMessage';
type Props = NativeStackScreenProps<BottomStackParamList, 'marketData'>;
let Rates = require('../../data/json/Rates.json');

export default function MarketData(props: Props) {
  const ratesExchange: RatesDto = Rates[0];
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [data, setData] = useState<number[]>();
  const [label, setLabel] = useState<string[]>();
  const [prices, setPrices] = useState<RatesDto>();

  const navigation =
    useNavigation<NativeStackNavigationProp<BottomStackParamList>>();

  const load = async (ratesExchange: RatesDto) => {
    setLoading(true);
    let rates: number[] = [];
    let labels: string[] = [];
    ratesExchange.priceData.map(row => {
      rates.push(row.high);
      labels.push('');
    });
    if (ratesExchange.priceData.length === 0) {
      loadLocal();
    } else {
      setData(rates);
      setLabel(labels);
    }
    setLoading(false);
  };

  const loadLocal = async () => {
    setLoading(true);
    let rates: number[] = [];
    let labels: string[] = [];
    ratesExchange.priceData.map(row => {
      rates.push(row.high);
      labels.push('');
    });
    setData(rates);
    setLabel(labels);
    setLoading(false);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response: any = await Rate.getRate();
      setPrices(response[0]);
      load(response[0]);
      setLoading(false);
    } catch (err) {
      //use error message as defualt because i don't have api to send report.
      setErrorMessage(Lexicons.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // load(ratesExchange);
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <Header
          text={Lexicons.marketData}
          onPress={() => navigation.goBack()}
        />
        {data && label && !loading ? (
          <LineChart
            data={{
              labels: label!,
              datasets: [
                {
                  data: data!,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={300}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: Colors.blue,
              backgroundGradientFrom: Colors.lightBlue,
              backgroundGradientTo: Colors.lightBlue,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(157, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(157, 0, 255, ${opacity})`,
            }}
            bezier
            style={{
              marginVertical: 8,
            }}
          />
        ) : (
          <Loading />
        )}
        {prices && prices.priceData.length !== 0 && !loading ? (
          <>
            {prices.priceData.map(row => (
              <TextLabel
                title={
                  Rates[0].ticker +
                  ' | ' +
                  row.high.toFixed(2) +
                  ' | ' +
                  row.low.toFixed(2) +
                  ' | ' +
                  row.close.toFixed(2)
                }
                textStyle={styles.text}
              />
            ))}
          </>
        ) : ratesExchange && !loading ? (
          <>
            {ratesExchange.priceData.map(row => (
              <TextLabel
                title={
                  Rates[0].ticker +
                  ' | ' +
                  row.high.toFixed(2) +
                  ' | ' +
                  row.low.toFixed(2) +
                  ' | ' +
                  row.close.toFixed(2)
                }
                textStyle={styles.text}
              />
            ))}
          </>
        ) : (
          <Loading />
        )}
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
  text: {
    fontSize: 16,
  },
});
