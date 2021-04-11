/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-10 17:32:37
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-11 15:01:57
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0
  }
}
