import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import QueueAnim from 'rc-queue-anim';
import qs from 'qs';
import { ListView,SearchBar,RefreshControl,Tag, WingBlank,SwipeAction,List,ActivityIndicator,Flex ,Button,Icon} from 'antd-mobile';
import styles from "./index.less";
import Item from "../../components/card/listItem"
import SidebarMenuEffects from "./tool";

console.log(SidebarMenuEffects)

let pageIndex = 1;
const NUM_ROWS  = 20;
const List_type =2;

function MyBody(props) {
    return (
        <div style={{padding:"0"}}>
            {props.children}
        </div>
    );
}

class CardList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
    
        this.state = {
            list:[],
            dataSource: dataSource.cloneWithRows(props.list),
            isLoading: true,
            hasMore:false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list !== this.props.list) {
            let list = [ ...this.state.list, ...nextProps.list ]
            let hasMore = false;
            if(nextProps.list.length<NUM_ROWS){
                hasMore = false
            }else{
                hasMore = true
            }
            this.setState({
                list:list,
                dataSource: this.state.dataSource.cloneWithRows(list),
                isLoading: false,
                hasMore:hasMore
            });
            pageIndex++;
        }
    }

    componentDidMount(){
        //alert(document.querySelector('.am-search').getAttribute('action'))
        SidebarMenuEffects();
    }

    showLayer(){

    }

    onEndReached = (event) => {
        if (!this.state.isLoading && !this.state.hasMore) {
            return;
        }
        
        this.props.dispatch({type:"cards/query",payload:{  
            urlParams:qs.stringify({
                _page:pageIndex,
                _sort:"id",
                _order:"desc",
                _limit:NUM_ROWS
            }),
            params:{
                method: 'GET'
            }
        }});

        this.setState({ isLoading: true });
            
    }

    jumpCardAdd(){
        console.log(11)
        this.props.dispatch(routerRedux.push({
            pathname:"/cardAdd"
        }))
    }

    render() {
        const {jump_action,title} =  this.props;
        
        let jumpDirection = "left";
        if(jump_action=="POP"){
            jumpDirection = "left";
        }else{
            jumpDirection = "right";
        }

        const row = (rowData, sectionID, rowID) => {
            return (
                <Item item={rowData}></Item>
            );
        };
        let loadingString = this.state.isLoading ? '' :'<ActivityIndicator text="正在加载..." />'
        return (
            <QueueAnim style={{height:"100%"}} id="st-container" className="st-container"  duration="500" type={jumpDirection}>
                <div className="st-menu st-effect-1">
                    <div className="filter_box">

                    </div>
                </div>
                <div className="st-pusher">
                    

                    <ListView ref="lv"
                        dataSource={this.state.dataSource}
                        renderHeader={() => <span>{title}</span>}
                        renderFooter={() => {
                            if(this.state.isLoading){
                                return (<div style={{display: 'flex',justifyContent:"center",alignItems:"center" }}>
                                    <ActivityIndicator text="正在加载..." />
                                </div>)
                            }else{
                                if(!this.state.hasMore){
                                    return (<div style={{textAlign: 'center' }}>数据已经全部加载</div>)
                                }
                                return (<div style={{textAlign: 'center' }}>加载完成</div>)
                            }
                        }}
                        renderBodyComponent={() => <MyBody />}
                        renderRow={row}
                        scrollerOptions={{ scrollbars: true }}
                        className="am-list card_list_page"
                        pageSize={NUM_ROWS}
                        useBodyScroll
                        useZscroller
                        onScroll={() => { }}
                        scrollRenderAheadDistance={100}
                        scrollEventThrottle={100}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={200}
                    
                    />
                    <div className="top_bar">
                        <div className="top">
                            <SearchBar placeholder="卡号后4位/车牌号" autoFocus  />
                            <div className="icon_wrap" onClick={this.showLayer.bind(this)}><Icon type={require('../../svg/qr.svg')} /></div>
                        </div>
                        {/*<Button type="primary"  onClick={this.jumpCardAdd.bind(this)} across>添加油卡</Button>*/}
                        <Flex className="show_account_box" direction="column">
                            <Flex justify="between" className="top_show_account_box">
                                <Flex direction="column">
                                    <span>可用升数</span>
                                    <span className="num">34340.00升</span>
                                </Flex>
                                <Flex direction="column">
                                    <span>可用余额</span>
                                    <span className="num">34340.00元</span>
                                </Flex>
                                <Flex direction="column">
                                    <span>油卡数量</span>
                                    <span className="num">34张</span>
                                </Flex>
                            </Flex>
                            <Flex justify="between" className="bot_show_account_box">
                                 <Flex direction="column">
                                    <Flex className="trade_time">最近交易时间<Icon type={require('../../svg/arrow_down.svg')} className="more_sx" /></Flex>
                                </Flex>
                                <Flex id="showFilter" data-effect="st-effect-1" className="filter_btn" align="center" direction="column">
                                    <Flex>筛选<Icon type={require('../../svg/filter.svg')} size="xs" /></Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                </div>
            </QueueAnim>
        );
  }
}

CardList.propTypes = {
    title: PropTypes.string,
    list:PropTypes.array,
    jump_action:PropTypes.string
};


function mapStateToProps(state) {
    let jump_action = state.routing.locationBeforeTransitions.action
    const {list=[],title} = state.cards
    return {
        jump_action,
        title,
        list
    };
}

export default connect(mapStateToProps)(CardList);
