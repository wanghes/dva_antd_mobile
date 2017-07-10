import { query,deleteItem,addItem } from '../services/addedCards'
import qs from 'qs';

export default {
    namespace: 'addedCards',
    state: {
        title:"油卡列表"
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
        },
        *deleteItem({payload},{call,put}){
            const data = yield call(deleteItem,payload)
            console.log(data);
        },
        *addItem({payload},{call,put}){
            const data = yield call(addItem,payload)
            console.log(data);
        }
    },
    subscriptions: {
        setup({dispatch,history}){
            history.listen(location=>{
                if(location.pathname="/cardAdd"){
                    dispatch({
                        type:"query",
                        payload:{
                            urlParams:qs.stringify({
                                _page:1,
                                _sort:"time",
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
};
