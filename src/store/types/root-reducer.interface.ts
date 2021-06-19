import { IWeatherState } from '@src/components/weather/types/state.interface';
import { LoginStateInterface } from '@src/pages/login/types/state.interface';
import { IAdminState } from '@pages/layout/types/state.interface';
import { IArticleState } from '@pages/article/types/state.interface';
import { IPublishState } from '@pages/publish/types/state.interface';
import { IMaterialState } from '@pages/material/types/state.interface';
import { IDiscussState } from '@src/pages/discuss/types/state.interface';

export interface IRootReducer {
  auth: LoginStateInterface;
  weather: IWeatherState;
  admin: IAdminState;
  article: IArticleState;
  publish: IPublishState;
  material: IMaterialState;
  discuss: IDiscussState;
}
