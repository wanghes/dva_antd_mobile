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
// app.use({});
app.use(createLoading());

// 3. Model
app.model(require('./models/example'));
app.model(require('./models/books'));
app.model(require('./models/message'));
app.model(require('./models/cards'));
app.model(require('./models/addedCards'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
