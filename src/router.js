import React from 'react';
import { Router, Route, IndexRoute, Link, Redirect } from 'dva/router';
import PropTypes from 'prop-types';
import layoutPage from './routes/layoutPage';
import IndexPage from './routes/IndexPage';
import ListPage from './routes/ListPage';
import booksPage from './routes/booksPage';
import listViewPage from './routes/listViewPage';
import index from './routes/index';
import refreshList from './routes/refreshList';
import CardListPage from './routes/CardListPage';
import CardAddPage from './routes/CardAddPage';

function RouterConfig({ history, app }) {
  	return (
  		<Router history={history}>
		  	<Route path="/" component={layoutPage}>
			    <IndexRoute component={IndexPage}/>
			    <Route path="index" component={index} />			   
			    <Route path="books" component={booksPage}/>
			    <Route path="listView" component={listViewPage}/>
			    <Route path="list" component={ListPage}/>
			    <Route path="refreshList" component={refreshList}/>
			    <Route path="cardList" component={CardListPage}/>
			    <Route path="cardAdd" component={CardAddPage}/>
		  	</Route>
		</Router>
	);
}

RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default RouterConfig;
