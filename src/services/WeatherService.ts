import axios, {AxiosResponse} from 'axios';
import {weatherType} from '../types/Weather';
import {CurrentWeatherRawResponseDto} from './dto/weather-service.dto';

class WeatherService {
  private _baseUrl: string | undefined;

  constructor() {
    this._baseUrl = process.env.OPEN_WEATHER_URL;
  }

  get baseUrl(): string {
    return this._baseUrl || '';
  }

  static async fetchCurrentWeather(
    lat: number,
    lon: number,
  ): Promise<weatherType> {
    return axios
      .get<CurrentWeatherRawResponseDto>(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat,
            lon,
            appid: process.env.OPEN_WEATHER_URL,
            units: 'metric',
          },
        },
      )
      .then(this.formatCurrentWeatherResponse);
  }

  private static async formatCurrentWeatherResponse(
    response: AxiosResponse<CurrentWeatherRawResponseDto>,
  ): Promise<weatherType> {
    const {data} = response;
    const weather = data.weather[0];

    return {
      temperature: data.main.temp,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      icon: weather
        ? `http://openweathermap.org/img/wn/${weather.icon}@4x.png`
        : null,
      description: weather.description ?? null,
      city: data.name,
    };
  }
}

export default WeatherService;
