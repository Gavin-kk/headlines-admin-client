import { IChannel } from './response.interface';

export interface IPublishState {
  channelList: IChannel[];
  submissionStatus: boolean;
}
