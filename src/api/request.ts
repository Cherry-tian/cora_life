// 在请求中加入 header 字段
import  * as utils  from '@/utils/utils';
import Taro from '@tarojs/taro';
import { localStorageKey, errCode } from '@/const';

export const request = async (params: any) => {
    // 获取 jwt 的值
    const jwt = await utils.getLocalStorage(localStorageKey.jwt).catch(err => {
        console.log(err);
    })
    // 将该值加入 header 中
    const { header = {} } = params;
    header.jwt = jwt;
    params.header = header;
    return Taro.request(params).then(res => {
        if (res.data.code === errCode.errLoginFail) {
            const currPath = Taro.getCurrentInstance().router.path
            if (currPath !== '/pages/login/index') {
                Taro.navigateTo({
                    url: '/pages/login/index'
                })
            }
            throw new Error('未登录');
        } else {
            return res;
        }
    })
}