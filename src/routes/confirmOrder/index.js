import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import styles from './index.less';

import {InputItem, List} from 'antd-mobile';
import { createForm } from 'rc-form';

class ConfirmOrder extends React.Component {
    constructor(props) {
        // console.log('props1',props);
        super(props);
        this.state = {
     
        };
    }

    render() {
        return (
            <QueueAnim  duration="500" type="right" style={{height:'100%',width:'100%'}}>
                <List>
                
                </List>
            </QueueAnim>
        )
    }

}