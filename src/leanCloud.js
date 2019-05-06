let  AV = require('leancloud-storage');

const APP_ID = 'srRRFpIqgAj7JxkRmHgfa1UY-gzGzoHsz';
const APP_KEY = 'TP7ldeFDxBpqpj111hPnskSc';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV
