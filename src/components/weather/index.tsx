import React, { FC, ReactElement, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spin } from 'antd';
import Skycons, { SkyconsType } from 'react-skycons';

import { IRootReducer } from '@src/store/types/root-reducer.interface';

import { weatherIconArr } from '@src/config/weather.config';
import { getWeatherInfoAction } from '@components/weather/store/actions';
import { WeatherWrapper } from './style';

const Weather: FC = (): ReactElement => {
  const [whetherLoading, setWhetherLoading] = useState<boolean>(true);
  const [weatherIcon, setWeatherIcon] = useState<SkyconsType>(SkyconsType.CLEAR_DAY);
  const [color, setColor] = useState<string>('rgb(255,180,38)');

  const { weatherInfo } = useSelector((state: IRootReducer) => ({
    weatherInfo: state.weather.weatherInfo,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const time = setInterval(() => {
      if (window.BMap) {
        clearInterval(time);
        // 使用地理位置并获取天气信息
        console.log();
        // dispatch(getWeatherInfoAction());
      }
    }, 100);
    return () => {
      clearInterval(time);
    };
  }, []);

  useEffect(() => {
    if (weatherInfo) {
      setWhetherLoading(false);
    }
  }, [weatherInfo]);

  useEffect(() => {
    if (weatherInfo) {
      weatherIconArr.forEach((item) => {
        const doesItContain = weatherInfo?.forecasts[0].dayWeather.indexOf(item.title);
        if (doesItContain !== -1) {
          setColor(item.color);
          setWeatherIcon(item.type);
        }
      });
    }
  }, [weatherInfo]);

  const city: string | undefined = weatherInfo?.city;
  const dayTemperature: number | undefined = weatherInfo?.forecasts[0].dayTemp;
  const nightTemperature: number | undefined = weatherInfo?.forecasts[0].nightTemp;
  const dayWeather: string | undefined = weatherInfo?.forecasts[0].dayWeather;
  const nightWeather: string | undefined = weatherInfo?.forecasts[0].nightWeather;

  return (
    <Spin size="small" spinning={whetherLoading}>
      <WeatherWrapper>
        <span className="city">{city || '北京'}</span>
        <Skycons color={color} type={weatherIcon} animate size={24} resizeClear className="weather" />
        <span className="nightTemperature">{`${nightTemperature || 0} ℃` || '0 ℃'}</span>
        <span className="gap">-</span>
        <span className="dayTemperature">{`${dayTemperature || 0} ℃` || '0 ℃'}</span>
        <span className="weather">
          <em> 白天天气：</em>
          {dayWeather || '晴'}
        </span>
        <span className="weather">
          <em>夜间天气：</em>
          {nightWeather || '晴'}
        </span>
      </WeatherWrapper>
    </Spin>
  );
};

export default memo(Weather);
