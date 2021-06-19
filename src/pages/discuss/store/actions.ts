import { ActionType } from '@pages/discuss/store/constant';
import { ChangePageInfoAction, ChangePageInfoLoadType, CommentSwitchAction } from '../types/action.type';
// 如果评论为关闭状态 派发此行为 会开启评论 反之 就会关闭评论
export const commentSwitch = (id: number): CommentSwitchAction => ({
  type: ActionType.COMMENT_SWITCH,
  data: {
    id,
  },
});

// 改变分页数据
export const changePageInfoAction = (data: ChangePageInfoLoadType): ChangePageInfoAction => ({
  type: ActionType.CHANGE_PAGE_INFO,
  data,
});
