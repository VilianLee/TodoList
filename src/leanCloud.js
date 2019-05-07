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

export function getCurrentUser(){
  let user = AV.User.current();
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}

export function signIn(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}

export function signOut(){
  AV.User.logOut();
  return undefined
}

export function errorMsg(error) {
  let resMsg = "";
  switch (error.code){
    case 100 :
      resMsg = "无法连接到服务器";
      break;
    case 200 :
      resMsg = "用户名不能为空";
      break;
    case 201 :
      resMsg = "密码不能为空";
      break;
    case 202 :
      resMsg = "用户名已经被占用";
      break;
    case 203 :
      resMsg = "该邮箱已注册";
      break;
    case 210 :
      resMsg = "用户名与密码不匹配";
      break;
    case 211 :
      resMsg = "找不到用户";
      break;
    default :
      resMsg = "发生未知错误";
      break;
  }
  return resMsg
}
