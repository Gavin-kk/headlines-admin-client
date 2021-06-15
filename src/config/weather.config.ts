import { SkyconsType } from 'react-skycons';

type IWeatherIconType = {
  title: string;
  type: SkyconsType;
  color: string;
};

export const weatherIconArr: IWeatherIconType[] = [
  {
    title: '晴',
    type: SkyconsType.CLEAR_DAY,
    color: 'rgb(255,153,0)',
  },
  {
    title: '云',
    type: SkyconsType.CLOUDY,
    color: 'rgb(194,192,188)',
  },
  {
    title: '雨',
    type: SkyconsType.RAIN,
    color: 'rgb(97,237,248)',
  },
  {
    title: '雪',
    type: SkyconsType.SNOW,
    color: 'rgb(198,227,243)',
  },
  {
    title: '风',
    type: SkyconsType.WIND,
    color: 'rgb(208,204,185)',
  },
  {
    title: '雾',
    type: SkyconsType.FOG,
    color: 'rgb(169,164,158)',
  },
];
