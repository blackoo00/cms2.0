import { queryProdDetail } from "@/services/api";

export default {
    namespace: 'prod',
    state:{
        list:[],
        detail:null
    },
    effects: {
        *getDetail({ payload }, { call, put}){
            const data = yield call(queryProdDetail, payload)
            yield put({
                type: 'queryProdDetail',
                payload: data
            })
        }
    },
    reducers: {
        queryProdDetail(state, action) {
            return {
              ...state,
              detail: action.payload
            };
          },
    }
}