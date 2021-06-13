import { saga as loginSaga } from '@pages/login/store';
import { saga as adminSaga } from '@pages/layout/store';
import { saga as articleSaga } from '@pages/article/store';

const sagaArr:(() => Generator)[] = [loginSaga, adminSaga, articleSaga];
export default sagaArr;
