import { IActionType } from '@src/store/types/action.interface';
import { ActionType } from '@pages/discuss/store/constant';

export type ChangePageInfoLoadType = { pageNum: number; pageSize: number };

export type CommentSwitchAction = IActionType<ActionType.COMMENT_SWITCH, { id: number }>;

export type ReducerActionType = CommentSwitchAction;
