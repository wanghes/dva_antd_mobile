import { query } from '../services/cards'
import qs from 'qs';

export default {
    namespace: 'cards',
    state: {
        title:"管理油卡列表"
    },
    subscriptions: {
        setup({dispatch,history}){
            history.listen(location=>{
                if(location.pathname=="/cardList"){
                    dispatch({
                        type:"query",
                        payload:{
                            urlParams:qs.stringify({
                                _page:1,
                                _sort:"id",
                                _order:"desc",
                                _limit:20
                            }),
                            params:{
                                method: 'GET'
                            }
                        }
                    })
                }
            })
        }
    },
    reducers: {
        querySuccess(state,{payload}){
            const {list} = payload
            return{
                ...state,
                list
            }
        }
    },
    effects: {
        *query({payload},{call,put}){
            const data = yield call(query,payload)
            if(data){
                yield put({
                    type:"querySuccess",
                    payload:{
                        list:data.data
                    }
                })
            }
        }
    }
};
