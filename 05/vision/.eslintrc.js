/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-09 10:22:34
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-09 11:00:29
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
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
