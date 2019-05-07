let  AV = require('leancloud-storage');

const APP_ID = 'srRRFpIqgAj7JxkRmHgfa1UY-gzGzoHsz';
const APP_KEY = 'TP7ldeFDxBpqpj111hPnskSc';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username, password, successFn, errorFn){
  // 新建 AVUser 对象实例
  let user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  // 设置邮箱
  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  });
  return undefined
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}
