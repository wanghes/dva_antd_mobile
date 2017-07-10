import { query } from '../services/books'
export default {
  namespace: 'books',
  state: {
      title:"购书列表"
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
        history.listen( location=>{
             if(location.pathname=="/books"){
                dispatch({type:"query",payload:{
        a:1
      }})
            }
        })
      
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *query({payload},{call,put}){
       const data = yield call(query, payload)
       if(data.data.status){
          yield put({
             type: 'querySuccess',
             payload:{
               list:data.data.data
             }
          })
       }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    querySuccess(state,{payload}){
      const { list } = payload
      return {
        ...state,
        list
      }
    }
  },

};
