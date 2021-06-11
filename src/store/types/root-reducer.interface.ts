import { IWeatherState } from '@src/components/weather/types/state.interface';
import { LoginStateInterface } from '@src/pages/login/types/state.interface';

export interface IRootReducer {
    auth: LoginStateInterface;
    weather: IWeatherState
}
