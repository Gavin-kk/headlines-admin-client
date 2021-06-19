import { saga as loginSaga } from '@pages/login/store';
import { saga as adminSaga } from '@pages/layout/store';
import { saga as articleSaga } from '@pages/article/store';
import { saga as publishSaga } from '@pages/publish/store';
import { saga as materialSaga } from '@pages/material/store';
import { saga as discussSaga } from '@pages/discuss/store';

const sagaArr: (() => Generator)[] = [loginSaga, adminSaga, articleSaga, publishSaga, materialSaga, discussSaga];

export default sagaArr;
