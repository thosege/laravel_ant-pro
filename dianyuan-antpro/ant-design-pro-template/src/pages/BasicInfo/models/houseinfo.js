import { queryHouse, removeHouse, addHouse, updateHouse,searchHouse } from '@/services/api';
import request from "../../../utils/request";

export default {
  namespace: 'houseinfo',

  state: [],

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryHouse, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      // console.log(1);
      // console.log(response);
    },

    // 新建
    *add({ payload,houseimage,callback }, { call, put }) {
      const response = yield call(addHouse, payload,houseimage);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // 删除
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeHouse, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // 修改
    *update({ payload,houseimage, callback }, { call, put }) {
      const response = yield call(updateHouse, payload,houseimage);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    // 查询
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchHouse, payload);
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
