import { saga as loginSaga } from '@pages/login/store';
import { saga as adminSaga } from '@pages/layout/store';

const sagaArr:(() => Generator)[] = [loginSaga, adminSaga];
export default sagaArr;
