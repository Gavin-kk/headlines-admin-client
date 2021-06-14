import { saga as loginSaga } from '@pages/login/store';
import { saga as adminSaga } from '@pages/layout/store';
import { saga as articleSaga } from '@pages/article/store';
import { saga as publishSaga } from '@pages/publish/store';

const sagaArr:(() => Generator)[] = [loginSaga, adminSaga, articleSaga, publishSaga];
export default sagaArr;
