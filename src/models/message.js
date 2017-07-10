import { query } from '../services/message'
import qs from 'qs';

export default {
    namespace: 'settings',
    state: {
        title:"消息设置列表"
    },

    subscriptions: {
        setup({ dispatch, history }) {      
            history.listen( location=>{
                if(location.pathname=="/listView"){
                    dispatch({type:"query",payload:{  
                        urlParams:qs.stringify({
                            _page:1,
                            _sort:"id",
                            _order:"desc",
                            _limit:20
                        }),
                        params:{
                            method: 'GET'
                        }
                    }});
                }
            })
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            yield put({ type: 'save' });  
        },
        *query({payload},{call,put}){
        const data = yield call(query, payload);
        if(data){
                yield put({
                    type: 'querySuccess',
                    payload:{
                        list:data.data
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
