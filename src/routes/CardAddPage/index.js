import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import QueueAnim from 'rc-queue-anim';
import qs from 'qs';
import uuid from 'node-uuid'
import {  WingBlank,SwipeAction,List,Toast,Modal,Flex,Icon,Button } from 'antd-mobile';
import './index.less';


class CardAdd extends React.Component {

    constructor(props, context){
        super(props)
        this.state = {
            list:[]
        };
        console.log(this.props.list)
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.list !== this.props.list) {
            let list = [ ...this.state.list, ...nextProps.list ]

            this.setState({
                list:list
            });

        }
    }

    deleteAction(id){
        let index;
    
        this.state.list.forEach(function(item,idx){
            if(item.id==id) index = idx;
        })
        this.state.list.splice(index,1);
        this.setState({
            list:this.state.list
        })
    }

    deleleClick(id){
        const alert = Modal.alert
        const alertInstance = alert('删除', '确定删除么???', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => {
                this.deleteAction(id);
                alertInstance.close();
                this.props.dispatch({
                    type:"addedCards/deleteItem",
                    payload:{
                        urlParams:{
                            id:id
                        },
                        params:{
                            method: 'DELETE'
                        }
                    }
                })
        }, style: { fontWeight: 'bold' } },
        ]);

    };

    addCard(){
        let str = '';
        let arr = [0,1,2,3,4,5,6,7,8,9];
        let cards = ["记账卡","加油卡","撬装卡","加油员卡"];
        let data = null;
        for(let i =0; i<16; i++){
            let index = Math.floor(Math.random()*10)
            if((i)%4==0){
                str+=' ';
            }
            str += arr[index]
        }
        let card_type = cards[Math.floor(Math.random()*4)]
        str = str.substr(-19)
        data = {
            id:uuid.v4(),
            vice_no:str,
            time:Date.now(),
            card_type:card_type
        }

        this.state.list.unshift(data);
        this.setState({
            list:this.state.list
        })

        this.props.dispatch({
            type:"addedCards/addItem",
            payload:{
                params:{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:qs.stringify(data)
                }
            }
        })
    }

    render(){
        const {jump_action}= this.props
         let jumpDirection = "left";
        if(jump_action=="POP"){
            jumpDirection = "left";
        }else{
            jumpDirection = "right";
        }

        return(
            <QueueAnim    style={{height:"100%"}} className="added_cards" duration="1500" type={jumpDirection}>
                <QueueAnim  key="inner" component="List" type={['right', 'left']} leaveReverse>
                    { 
                        this.state.list.map((item)=>{
                            return (
                                <SwipeAction key={item.id}
                                style={{ borderBottom: '1px solid #dfdfdf' }}
                                autoClose
                                right={[
                                    {
                                        text: '取消',
                                        onPress: () => console.log('cancel'),
                                        style: { backgroundColor: '#ddd', color: 'white' },
                                    },
                                    {
                                        text: '删除',
                                        onPress: () => {this.deleleClick(item.id)},
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                    },
                                ]}
                                
                                onOpen={() => console.log('global open')}
                                onClose={() => console.log('global close')}
                                ><List.Item
                                    extra={item.card_type}
                                >
                                {item.vice_no}
                            </List.Item></SwipeAction>
                            )
                        })
                    }
                
                </QueueAnim>
                <Flex className="circle_wrap" direction="column" justify="center" align="center">
                    <div className="circle_btn" onClick={this.addCard.bind(this)}>
                        <Icon type={require('../../svg/plus.svg')} />
                    </div>
                    <span>添加油卡</span>
                </Flex>
                <Flex className="btn_wrap" justify="center" align="center">
                    <Button size="large" inline across onClick={()=>{}}>取消</Button>
                    <Button size="large" inline across type="primary" onClick={()=>{}}>添加</Button>
                </Flex>
            </QueueAnim>
        )
    }
}



CardAdd.propTypes = {
    jump_action:PropTypes.string
};


function mapStateToProps(state) {
    let jump_action = state.routing.locationBeforeTransitions.action
    let {list=[],title} = state.addedCards
    return {
        jump_action,
        list,
        title
    };
}

export default connect(mapStateToProps)(CardAdd)