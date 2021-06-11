import { Dispatch } from 'redux';
import { message } from 'antd';

import { ActionType } from './constant';
import { IWeatherInfo } from '../types/response.interface';
import { ChangeWeatherInfoAction } from '../types/action.type';

export const changeWeatherInfoAction = (info:IWeatherInfo):ChangeWeatherInfoAction => ({
  type: ActionType.CHANGE_WEATHER_INFO,
  data: info,
});

export const getWeatherInfoAction = ():any => (dispatch:Dispatch<any>) => {
  try {
    const geoc = new window.BMap.Geocoder();
    const geolocation = new window.BMap.Geolocation();
    geolocation.getCurrentPosition((r:any) => {
      geoc.getLocation(r.point, (rs:any) => {
        window.AMap.plugin('AMap.Weather', () => {
          // 创建天气查询实例
          const weather = new window.AMap.Weather();
          // 得到天气的城市信息
          const { city } = rs.addressComponents;
          // 执行实时天气信息查询
          weather.getForecast(city, (err:any, data:any) => {
            if (err) {
              message.error(err);
            } else {
              dispatch(changeWeatherInfoAction(data));
            }
          });
        });
      });
    });
  } catch (error) {
    message.error(`天气数据请求出错${error.message}`);
  }
};
