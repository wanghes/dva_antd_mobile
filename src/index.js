import dva from 'dva';
import { browserHistory,hashHistory } from 'dva/router'
import createLoading from 'dva-loading';
import {Toast} from 'antd-mobile';
import './index.less';


function showToast(error) {
	Toast.fail(error, 1);
}

// 1. Initialize
const app = dva({
    ...createLoading({
        effects: true,
    }),
    history: browserHistory,
    onError(e){
  	    showToast(e);
    }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
let models = require('./models/index');
for(var i in models){
	app.model(models[i]);
}

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
