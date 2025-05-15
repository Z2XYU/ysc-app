export default {
  // 开启命名空间
  namespaced: true,

  // 数据
  state: () => ({
    token: uni.getStorageSync('token') || '',
    
    //登陆状态
    loginState:uni.getStorageSync('loginState')||'',
    // 用户的信息对象
    // userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    userinfo: uni.getStorageSync('userInfo') || '{}',
    // 重定向的 Object 对象
    redirectInfo: null
  }),

  // 方法
  mutations: {
    updateLoginState(state,loginState){
      state.loginState=loginState
      this.commit('m_user/saveLoginStateToStorage')
    },
    saveLoginStateToStorage(state){
      uni.setStorageSync('loginState',state.loginState)
    },
    removeLoginState(){
      uni.removeStorageSync('loginState')
    },
    
    
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userInfo', state.userInfo)
    },
    removeUserInfoStorage() {
      uni.removeStorageSync('userInfo')
    },
    
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
      // console.log(state.redirectInfo)
    }
  },
}
