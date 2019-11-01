
// 请把生产环境的 redirect_url，client_id 和 client_secret 中的 "****", 换成自己创建的 OAuth App 的具体参数即可。
const config = {
  'oauth_uri': 'https://github.com/login/oauth/authorize',
  'redirect_uri': 'http://www.xingxing2019.cn/user/getUser',
  'client_id': '4b8e4dd18ee36f991386',
  'client_secret': '117548602c30104262bc7c8ffb9e37f319a031a5',
};

// 本地开发环境下 （参数可以直接用）
if (process.env.NODE_ENV === 'development') {
  config.redirect_uri = "http://localhost:3001/user/getUser"
  config.client_id = "4b8e4dd18ee36f991386"
  config.client_secret = "117548602c30104262bc7c8ffb9e37f319a031a5"
}
export default config;
