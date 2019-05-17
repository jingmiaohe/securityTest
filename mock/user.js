import { param2Obj } from './utils'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': { // TOKEN
    roles: ['teacher'],
    sex: '男',
    grade: '五年级二班',
    name: '华小丰',
    studentId: '116546154535',
    school: '丰台区实验小学'
  },
  'editor-token': { // TOKEN
    roles: ['student'],
    sex: '女',
    grade: '五年级二班',
    name: '华小华',
    studentId: '116546154536',
    school: '丰台区实验小学'
  }
}

export default {
  login: res => {
    const { username } = JSON.parse(res.body)
    const data = tokens[username]

    if (data) {
      return {
        code: 20000,
        data
      }
    }
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  },
  getInfo: res => {
    const { token } = param2Obj(res.url)
    const info = users[token]

    if (info) {
      return {
        code: 20000,
        data: info
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  logout: () => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}
