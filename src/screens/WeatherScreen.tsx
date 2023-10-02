import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from './constants';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '.';
import {fetchWeather} from '../store/weather/actions';
import {connect} from 'react-redux';
import {StateType} from '../store/reducers';
import Status from '../types/Status';
import {weatherType} from '../types/Weather';

type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;

type StateProps = {
  weather: weatherType;
  status: Status;
  error: string;
};

type DispatchProps = {
  fetchWeather: typeof fetchWeather;
};

type Props = StateProps & DispatchProps;

function WeatherScreen(props: Props) {
  const {fetchWeather, status, error, weather} = props;
  const route = useRoute<WeatherScreenRouteProp>();
  const {goBack} = useNavigation();

  useEffect(() => {
    fetchWeather(route.params.latitude, route.params.longitude);
  }, [fetchWeather, route.params.latitude, route.params.longitude]);

  return (
    <View style={styles.container} testID="weather-screen">
      <TouchableOpacity
        testID="weather-screen-go-back"
        style={styles.back}
        onPress={goBack}>
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>
      {status === Status.LOADING && (
        <ActivityIndicator
          size="large"
          color="black"
          testID="weather-screen-loader"
        />
      )}

      {status === Status.FAILURE && <Text style={styles.error}>{error}</Text>}
      {status === Status.SUCCESS && (
        <>
          <View style={styles.head}>
            {weather.icon && (
              <Image
                testID="weather-screen-icon"
                style={styles.icon}
                source={{uri: weather.icon}}
              />
            )}
            <Text style={styles.city}>{weather.city}</Text>
            {weather.description && (
              <Text
                testID="weather-screen-description"
                style={styles.description}>
                {weather.description}
              </Text>
            )}
          </View>
          <View style={styles.stats}>
            <Text style={styles.statsTitle}>Stats</Text>
            <View
              testID="weather-screen-temperature"
              style={[styles.card, styles.cardNegative]}>
              <Text style={styles.cardTextNegative}>Temperature</Text>
              <Text style={styles.cardTextNegative}>
                {Math.round(weather.temperature)}°C
              </Text>
            </View>

            <View testID="weather-screen-wind" style={[styles.card]}>
              <Text style={styles.cardText}>Wind Speed</Text>
              <Text style={styles.cardText}>
                {Math.round(weather.windSpeed)}m/s
              </Text>
            </View>

            <View
              testID="weather-screen-humidity"
              style={[styles.card, styles.cardNegative]}>
              <Text style={styles.cardTextNegative}>Humidity</Text>
              <Text style={styles.cardTextNegative}>
                {Math.round(weather.humidity)}%
              </Text>
            </View>

            <View testID="weather-screen-pressure" style={[styles.card]}>
              <Text style={styles.cardText}>Pressure</Text>
              <Text style={styles.cardText}>
                {Math.round(weather.pressure)} hPa
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.WHITE,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backText: {
    fontSize: 24,
  },
  error: {
    color: Colors.ERROR,
    textAlign: 'center',
  },
  head: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 200,
  },
  description: {
    fontSize: 24,
    textTransform: 'capitalize',
  },
  city: {
    fontSize: 48,
  },
  stats: {
    paddingHorizontal: '10%',
  },
  statsTitle: {
    fontSize: 13,
    color: Colors.LIGHTER_GRAY,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
  },
  cardNegative: {
    backgroundColor: Colors.BLUE,
  },
  cardTextNegative: {
    color: Colors.WHITE,
  },
  cardText: {
    color: Colors.LIGHTER_GRAY,
  },
});

export default connect<StateProps, DispatchProps, {}, StateType>(
  (state) => ({
    status: state.weather.status,
    weather: state.weather.weather,
    error: state.weather.error,
  }),
  {
    fetchWeather,
  },
)(WeatherScreen);
