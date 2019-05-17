import{tLogin, getTInfo, tLogout} from "../../api/tLogin";
const teacher = {
  state: {},
  mutations: {

  },
  actions: {
    TLogin({ commit }, userInfo) {
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        tLogin(userInfo.name, userInfo.pwd).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息 学生端
    GetTInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        getTInfo().then(response => {
          const data = response.data;
          commit('SET_NAME', data.name);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    TLogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        tLogout().then(() => {
          // commit('SET_TOKEN', '')
          // commit('SET_ROLES', [])
          // removeToken()
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default teacher
