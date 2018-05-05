import { stringify } from 'qs';
import request from '../utils/request';

// 账号密码登录
export async function basicLogin(params) {
    return request('/app/authorize/base', {
        method: 'POST',
        body: params,
    });
}

// 短信登录
export async function smsLogin(params) {
    return request('/app/authorize/sms', {
        method: 'POST',
        body: params,
    });
}

// 获取登录短信验证码
export async function loginCaptcha(params) {
    return request('/app/sms/login', {
        method: 'POST',
        body: params,
    });
}