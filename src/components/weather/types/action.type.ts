import { IActionType } from '@src/store/types/action.interface';
import { ActionType } from '@components/weather/store/constant';
import { IWeatherInfo } from '@components/weather/types/response.interface';

export type ChangeWeatherInfoAction = IActionType<ActionType.CHANGE_WEATHER_INFO, IWeatherInfo>

export type ReducerActionType = ChangeWeatherInfoAction
