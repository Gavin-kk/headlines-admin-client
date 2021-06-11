import { saga as loginSata } from '@pages/login/store';

const sagaArr:(() => Generator)[] = [loginSata];
export default sagaArr;
