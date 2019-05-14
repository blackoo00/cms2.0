import {
  queryFakeList,
  queryProdList,
  queryCatgList,
  queryOrderList,
  removeFakeList,
  addFakeList,
  updateFakeList,
} from '@/services/api';

export default {
  namespace: 'list',

  state: {
    list: [],
    prodlist: [],
    catelist: [],
    orderlist: [],
  },

  effects: {
    *fetchProds({ payload }, { call, put }) {
      const response = yield call(queryProdList, payload);
      yield put({
        type: 'queryProdList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetchCates({ payload }, { call, put }) {
      const response = yield call(queryCatgList, payload);
      yield put({
        type: 'queryCatgList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetchOrders({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload);
      yield put({
        type: 'queryOrderList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryProdList(state, action) {
      return {
        ...state,
        list: action.payload,
        prodlist: action.payload,
      };
    },
    queryCatgList(state, action) {
      return {
        ...state,
        catelist: action.payload,
      };
    },
    queryOrderList(state, action) {
      return {
        ...state,
        orderlist: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
