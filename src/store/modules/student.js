import{login, logout, getInfo} from "../../api/login";
const student = {
  state: {
    // token: getToken(),
    token: '',
    name: '',
    grade: '',
    school: '',
    sex: '',
    studentNumber: '',
    studentData: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_GRADE: (state, grade) => {
      state.grade = grade
    },
    SET_SEX: (state, sex) => {
      state.sex = sex
    },
    SET_SCHOOL: (state, school) => {
      state.school = school
    },
    SET_STUDENTNUMBER: (state, studentNumber) => {
      state.studentNumber = studentNumber
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_STUDENTDATA: (state, obj) => {
      state.studentData = obj
    }
  },

  actions: {
    // 登录 学生端
    Login({ commit }, userInfo) {
      const name = userInfo.name;
      return new Promise((resolve, reject) => {
        login(name, userInfo.studentNumber).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息 学生端
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        getInfo().then(response => {
          const data = response.data;
          commit('SET_NAME', data.name);
          commit('SET_GRADE', data.clazz);
          commit('SET_SEX', data.sex);
          commit('SET_SCHOOL', data.school);
          commit('SET_STUDENTNUMBER', data.studentNumber);
          commit('SET_STUDENTDATA', data);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出 学生端
    LogOut({ commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_NAME', '');
          commit('SET_GRADE', '');
          commit('SET_SEX', '');
          commit('SET_SCHOOL', '');
          commit('SET_STUDENTNUMBER', '');
          commit('SET_STUDENTDATA', '');
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出 学生端
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '')
        // removeToken()
        resolve()
      })
    }
  }
}

export default student
