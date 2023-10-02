import {takeLatest, call, put} from 'redux-saga/effects';
import {
  Actions,
  WEATHER_START_TYPE,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from './actions';
import WeatherService from '../../services/WeatherService';

export default function* saga() {
  yield takeLatest(Actions.START, weatherStartWorker);
}

export function* weatherStartWorker(actions: WEATHER_START_TYPE) {
  try {
    const weather = yield call(
      WeatherService.fetchCurrentWeather,
      actions.payload.latitude,
      actions.payload.logitude,
    );
    yield put(fetchWeatherSuccess(weather));
  } catch (err) {
    yield put(fetchWeatherFailure(err.message));
  }
}
