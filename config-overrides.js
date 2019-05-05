const { override, fixBabelImports } = require('customize-cra');

module.exports = function override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  })
)
