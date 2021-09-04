import nookies from 'nookies'
import { toast } from 'react-toastify'
import Router from 'next/router'

const onLogin = (dispatch, toggleLoginMenu) => (res) => {
  if (res.status === 200) {
    if (res.data.error) throw res.data.error;

    let { ttbt_token } = res.data
    console.log('Login successfully!');

    // localStorage.setItem('token', res.data.token);

    nookies.set(null, 'ttbt_token', ttbt_token, {
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    toggleLoginMenu();

    dispatch({
      type: 'ON_LOGIN',
      user: res.data.user
    });

    toast("Mừng cậu đã đăng nhập thành công! Bọn tớ rất vui được đón tiếp cậu.🥰😘");

    Router.push('/welcome-page');
  }
}

export default onLogin