import { axiosClient } from './axiosClient';

const apiAuth = {
  login: async ({ username, password }: any) => {
    console.log(`username = ${username}, password = ${password}`);
    try {
      const res = await axiosClient.post('/login', { username, password });
      return res;
    } catch (err: any) {
      throw new Error('Tên tài khoản hoặc mật khẩu không đúng');
    }
  },
  register: async ({ username, password, email }: any) => {
    try {
      const res = await axiosClient.post('/register', {
        username,
        password,
        email,
      });
      return res;
    } catch (err: any) {
      // const customError = new Error();
      // customError.message = err.response.data.msg;
      // console.log(customError);
      // Phải có dòng throw error, không có dòng này
      // thì Tanstack không bắt được sự kiện error
      throw new Error(err.response.data.msg);
    }
  },
  logout: async () => {
    const res = await axiosClient.post('/logout', null);
    return res;
  },
};

export default apiAuth;
