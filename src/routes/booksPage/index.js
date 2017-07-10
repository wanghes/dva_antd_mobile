import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import QueueAnim from 'rc-queue-anim';
import { Button ,WingBlank, WhiteSpace, Icon, Card} from 'antd-mobile';
import styles from './index.less';
import Spinner from '../../components/spinner/Spinner.js';

const  BooksPage =({dispatch,list=[],location,loading})=>{
  	const { query={}, pathname } = location
  	const jumpList = (key) => {
    	dispatch(routerRedux.push({
      		pathname:"/list"
    	}))
  	}
  	return (
        <QueueAnim  duration="500" type="right">
            <Spinner loading={loading} />
            <div key="books">
                <WhiteSpace size="sm" />
                <WingBlank size="sm">
                    {
                        list.map(function (item) {
                            return (
                                <Card className={styles.mB} key={item.id}>
                                    <Card.Header 
                                        title={item.name}
                                        thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                                        extra={<span>页数&nbsp;{item.pages}</span>}
                                    />
                                    <Card.Body>
                                        <div>{item.body}</div>
                                    </Card.Body>
                                    <Card.Footer content={'作者：'+item.author} extra={<div>作者：{item.publish}</div>} />
                                </Card>
                            )
                        })
                    }
                    <WhiteSpace size="sm" />
                    <Button type="primary" onClick={jumpList}>按钮</Button>
                </WingBlank>
            </div>
        </QueueAnim>
	);
}

BooksPage.propTypes = {
   	books: PropTypes.object,
    loading: PropTypes.bool
};


function mapStateToProps(state) {
    const { list=[],title } = state.books;
    return {
        loading: state.loading.global,
        list,
        title
    };
}

export default connect(mapStateToProps)(BooksPage);
