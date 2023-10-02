import Status from '../../types/Status';
import {nullWeather, weatherType} from '../../types/Weather';
import {ActionTypes, Actions} from './actions';

export type State = {
  status: Status;
  error: string;
  weather: weatherType;
};

const initialState: State = {
  status: Status.START,
  error: '',
  weather: nullWeather,
};

export default function (
  state = initialState,
  action: ActionTypes | {type: '@@INIT'},
): State {
  switch (action.type) {
    case Actions.START:
      return {
        ...state,
        status: Status.LOADING,
      };

    case Actions.SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        weather: action.payload.weather,
      };

    case Actions.FAILURE:
      return {
        ...state,
        status: Status.FAILURE,
        error: action.payload.error,
      };

    case Actions.RESET:
      return initialState;

    default:
      return state;
  }
}
