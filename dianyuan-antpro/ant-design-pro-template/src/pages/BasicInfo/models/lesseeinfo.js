import { queryLessee, removeLessee, addLessee, updateLessee,searchLessee } from '@/services/api';

export default {
  namespace: 'lesseeinfo',

  state: [],

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryLessee, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      // console.log(1);
      // console.log(response);
    },

    // 新建
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addLessee, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // 删除
    *remove({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(removeLessee, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // 修改
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateLessee, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    // 查询
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchLessee, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return [
        action.payload,
      ];
    },
  },
};
