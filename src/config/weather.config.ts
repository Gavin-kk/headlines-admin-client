import { SkyconsType } from 'react-skycons';

type IWeatherIconType = {
    title: string,
    type: SkyconsType,
  color:string
}
export const weatherIconArr:IWeatherIconType[] = [
  {
    title: '晴',
    type: SkyconsType.CLEAR_DAY,
    color: 'rgb(255,153,0)',
  },
  {
    title: '云',
    type: SkyconsType.CLOUDY,
    color: 'rgb(255,153,0)',
  },
  {
    title: '雨',
    type: SkyconsType.RAIN,
    color: 'rgb(48,73,76)',
  },
  {
    title: '雪',
    type: SkyconsType.SNOW,
    color: 'rgb(35,168,242)',
  },
  {
    title: '风',
    type: SkyconsType.WIND,
    color: 'rgb(42,60,66)',
  },
  {
    title: '雾',
    type: SkyconsType.FOG,
    color: 'rgb(113,221,250)',
  },
];
