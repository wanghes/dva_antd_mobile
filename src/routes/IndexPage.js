import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './IndexPage.less';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import Spinner from '../components/spinner/Spinner.js';
import LineChart from '../components/chart/lineChart';
import { Button ,Accordion, List, WingBlank,WhiteSpace,NavBar, Icon} from 'antd-mobile';

function IndexPage(props) {
	const jumpList = (key) => {
		props.dispatch(routerRedux.push({
			pathname:"/list"
		}))
	}
	const jumpBooks = (key) => {
		props.dispatch(routerRedux.push({
			pathname:"/books"
		}))
	}

    const jumpListView = (key) => {
        props.dispatch(routerRedux.push({
            pathname:"/listView"
        }))
    }

    const jumpIndex = (key) => {
        props.dispatch(routerRedux.push({
            pathname:"/index"
        }))
    }
    
    const jumpDropDown = (key) => {
        props.dispatch(routerRedux.push({
            pathname:"/refreshList"
        }))
    }

     const jumpCardList = (key) => {
        props.dispatch(routerRedux.push({
            pathname:"/cardList"
        }))
    }

	return (
        <QueueAnim  duration="500" type="left" style={{height:'100%',width:'100%'}}>
            <Spinner loading={props.loading} />
            <div key="layout" className="layout">
                <WhiteSpace size="sm" />
                <WingBlank size="sm" className="Index_wrap">
                    <Button className="title"  inline type="primary" icon={require('../svg/city.svg')} onClick={jumpList}>城市列表</Button>              
                    <Button className="title" inline type="warning" icon={require('../svg/book.svg')} onClick={jumpBooks}>购书列表</Button> 
                    <Button className="title" inline type="ghost" icon={require('../svg/book.svg')} onClick={jumpListView}>ListView</Button>
                    <Button className="title" inline icon={require('../svg/book.svg')} onClick={jumpIndex}>首页</Button>
                    <Button className="title" inline type="primary" icon={require('../svg/book.svg')} onClick={jumpDropDown}>下拉刷新</Button>
                    <Button className="title" inline icon={require('../svg/card.svg')} onClick={jumpCardList}>管理油卡</Button>
                </WingBlank>
                <WhiteSpace size="sm" />
                <LineChart></LineChart>
            </div>
        </QueueAnim>
	);
}



IndexPage.propTypes = {
    loading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        loading: state.loading.global
    };
}

export default connect(mapStateToProps)(IndexPage);
