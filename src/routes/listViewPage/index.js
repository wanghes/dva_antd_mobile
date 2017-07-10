import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import QueueAnim from 'rc-queue-anim';
import qs from 'qs';
import { ListView,RefreshControl,Tag, WingBlank,SwipeAction,List,ActivityIndicator } from 'antd-mobile';
import styles from "./index.less";


const NUM_ROWS  = 20;
const List_type =2;

function MyBody(props) {
    return (
        <div style={{padding:"0"}}>
            {props.children}
        </div>
    );
}

class Message extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        
        this.state = {
            pageIndex:1,
            list:[],
            dataSource: dataSource.cloneWithRows(props.list),
            isLoading: true,
            hasMore:false
        };
        console.log(this.state.pageIndex);
    }

    componentWillUnmount() {     
       //this.props.list = [];
       console.log(this.props.list)
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
            this.state.pageIndex++;
        }
    }

    onEndReached = (event) => {
        if (!this.state.isLoading && !this.state.hasMore) {
            return;
        }
        
        this.props.dispatch({type:"settings/query",payload:{  
            urlParams:qs.stringify({
                _page:this.state.pageIndex,
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

     
    render() {
        const {jump_action,title} =  this.props;

        let jumpDirection = "left";
        if(jump_action=="POP"){
            jumpDirection = "left";
        }else{
            jumpDirection = "right";
        }


        const row = (rowData, sectionID, rowID) => {
            if(List_type==1){
                return (
                    <SwipeAction key={rowID}
                    style={{ borderBottom: '1px solid #dfdfdf' }}
                    autoClose
                    right={[
                        {
                        text: 'Cancel',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                        },
                        {
                        text: 'Delete',
                        onPress: () => console.log('delete'),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                    ]}
                    
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                    >
                    <List.Item
                        extra=""
                        arrow="horizontal"
                    >
                        <Tag selected data-seed={rowData.id}>{rowData.mating_system}</Tag> - {rowData.direction} - {rowData.id}
                    </List.Item>
                    </SwipeAction>
                );
            }else{
                 return (
                   <List.Item
                    arrow="horizontal"
                    multipleLine
                    onClick={() => {}}
                    platform="android"
                    style={{borderBottom:"1px solid #dfdfdf"}}>
                    <Tag selected data-seed={rowData.id}>{rowData.mating_system}</Tag> - {rowData.direction} - {rowData.id}
                    </List.Item>
                );
            }
        };
        let loadingString = this.state.isLoading ? '' :'<ActivityIndicator text="正在加载..." />'
        return (
            <QueueAnim style={{height:"100%"}}  duration="500" type={jumpDirection}>
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
                    className="am-list"
                    pageSize={NUM_ROWS}
                    useBodyScroll
                    useZscroller
                    onScroll={() => { }}
                    scrollRenderAheadDistance={200}
                    scrollEventThrottle={300}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10} 
                />
            </QueueAnim>
        );
  }
}

Message.propTypes = {
    title: PropTypes.string,
    jump_action:PropTypes.string,
    list:PropTypes.array
};


function mapStateToProps(state) {
    let jump_action = state.routing.locationBeforeTransitions.action
    const {list=[],title} = state.settings
    return {
        jump_action,
        title,
        list
    };
}

export default connect(mapStateToProps)(Message);
