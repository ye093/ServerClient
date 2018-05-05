import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
// add
import { basicLogin, smsLogin, loginCaptcha } from '../services/ye-api';

export default {
  namespace: 'login',

  state: {
    code: undefined,
  },

  effects: {
    // *login({ payload }, { call, put }) {
    //   const response = yield call(fakeAccountLogin, payload);
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: response,
    //   });
    //   // Login successfully
    //   if (response.status === 'ok') {
    //     reloadAuthorized();
    //     yield put(routerRedux.push('/'));
    //   }
    // },

    *login({ payload }, { call, put }) {
      let serApi = basicLogin;
      if ( payload.type === 'mobile') {
        serApi = smsLogin;
      }
      const response = yield call(serApi, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: { ...response, type: payload.type},
      });
      // Login successfully
      if (response.code === 0) {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },

    //登录验证码
    *captcha({ payload }, {call, put}) {
      const response = yield call(loginCaptcha, payload);
      if (response.code === 0) {
        yield put({
          type: 'obainCaptcha',
          payload: { ...response },
        });
      }
      console.log(response.data);
    },

    // *logout(_, { put, select }) {
    //   try {
    //     // get location pathname
    //     const urlParams = new URL(window.location.href);
    //     const pathname = yield select(state => state.routing.location.pathname);
    //     // add the parameters in the url
    //     urlParams.searchParams.set('redirect', pathname);
    //     window.history.replaceState(null, 'login', urlParams.href);
    //   } finally {
    //     yield put({
    //       type: 'changeLoginStatus',
    //       payload: {
    //         status: false,
    //         currentAuthority: 'guest',
    //       },
    //     });
    //     reloadAuthorized();
    //     yield put(routerRedux.push('/user/login'));
    //   }
    // },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.code === 0) {
        setAuthority(payload.data.role);
      }
      return {
        ...state,
        code: payload.code,
        msg: payload.msg,
        type: payload.type,
      };
    },
    obainCaptcha(state, { payload }) {
      return {
        ...state,
        code: payload.code,
        msg: payload.msg,
        token: payload.data.token,
      };
    },
  },
};
