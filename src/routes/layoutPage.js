import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { WhiteSpace } from 'antd-mobile';

function LayoutPage(props) {
    const {location} = props;
    let title = "首页";
    switch(location.pathname){
        case "/":
        title = "首页";
        break;
        case "/list":
        title = "城市列表";
        break;
        case "/books":
        title = "购书列表";
        break;
    }

	return (
		<div style={{width:'100%',height:"100%"}}>
			{props.children}
		</div>
  	);
}

export default connect()(LayoutPage);
