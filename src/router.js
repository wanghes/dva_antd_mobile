import React from 'react';
import { Router, Route } from 'dva/router';
import PropTypes from 'prop-types'
import layoutPage from './routes/layoutPage';


const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}



function RouterConfig({ history, app }) {
	const routes = [
		{
		  	path: '/',
		  	component: layoutPage,
            name: 'IndexPage',
		  	getIndexRoute(location, callback) {
		    	require.ensure([],  (require)=> {	
		      		callback(null, {component:require('./routes/IndexPage')})
		    	})
		  	},
		  	childRoutes:[
				{
				  	path: 'list',
				  	getComponent(location, callback) {
				    	require.ensure([], require => {
                            registerModel(app, require('./models/example'))
                            callback(null, require('./routes/ListPage'));
				    	})
				  	}
				},
				{
		  			path: 'books',
				   	getComponent(location, callback) {
				    	require.ensure([], require => {
					    	registerModel(app, require('./models/books'))
                            callback(null, require('./routes/booksPage'))
                          
				    	})
				  	}
			  	},
			  	{
		  			path: 'listView',
				   	getComponent(location, callback) {
				    	require.ensure([], require => {
					    	registerModel(app, require('./models/message'))
                            callback(null, require('./routes/listViewPage'))
				    	})
				  	}
			  	},
				{
		  			path: 'index',
				   	getComponent(location, callback) {
				    	require.ensure([], require => {
                            callback(null, require('./routes/index'))
				    	})
				  	}
			  	}  ,
                {
                    path: 'refreshList',
                    getComponent(location, callback) {
                        require.ensure([], require => {
                            callback(null, require('./routes/refreshList'))
                        })
                    }
			  	},
                {
                    path: 'cardList',
                    getComponent(location, callback) {
                        require.ensure([], require => {
                            registerModel(app, require('./models/cards'))
                            callback(null, require('./routes/CardListPage'))
                        })
                    }
			  	},
                {
                    path: 'cardAdd',
                    getComponent(location, callback) {
                        console.log(11);
                        require.ensure([], require => {
                            registerModel(app, require('./models/addedCards.js'))
                            callback(null, require('./routes/CardAddPage'))
                        })
                    }
			  	}  					    
		  	]
		}
	];
  	return <Router history={history} routes={routes} />;
}

RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default RouterConfig;
