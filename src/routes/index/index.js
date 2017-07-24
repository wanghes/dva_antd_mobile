import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
// import styles from './index.less';
import classnames from 'classnames';
import LineChart from '../../components/chart/lineChart';
import OilVideo from '../../components/oilVideo/oilVideo';
import { Button, Accordion, List, WingBlank,WhiteSpace,NavBar, Icon, Flex, TabBar} from 'antd-mobile';
import './index.less';



class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'index',
            hidden: false,
            selectTypeName: 'day'           
        };
    }
    selectType(type) {
        if(type == 'day') {
            this.setState({
                selectTypeName: 'day'
            });
        } else if (type == 'month') {
            this.setState({
                selectTypeName: 'month'
            });            
        }
    }
    render() {
        const Line = () => (
            <span className="line"></span>
        );
        const CrossLine = (props) => {
            return (
                <i style={{"border": `0.04rem solid ${props.color}`}} className="crossLine"></i>
            )
        };
        const PageContainer = (props) => (
            <div style={{"paddingBottom": "1.1rem"}}>
                {props.children}
            </div>
        );
        const jumpList = () => {
            this.props.dispatch(routerRedux.push({
                pathname:"/list"
            }))
        }

        const jumpCardListPage = ()=>{
             this.props.dispatch(routerRedux.push({
                pathname:"/cardList"
            }))
        }
        

        const MainContent = () => {
            let selectChart = classnames({

            });
            let selectDay = classnames({
                "chartTypeLabel": true,
                "active": this.state.selectTypeName == 'day'
            });
            let selectMonth = classnames({
                "chartTypeLabel": true,
                "active": this.state.selectTypeName == 'month'
            });
            return (
                <div>
                    <WingBlank size="lg">
                        <WhiteSpace  size="md"/>
                        <Flex justify="between" className="title">
                            <Line/>
                            <span className="titleLabel">当前价格</span>
                            <span className="main-color">元/吨</span>
                        </Flex>
                        <WhiteSpace  size="md"/>
                    </WingBlank>
                    <WingBlank size="md"  className="oilContainer">
                            <Flex className="text-center">
                                <Flex.Item className="position-relative">
                                    <p className="oilPrice">5310<span className="oilPriceBig--span--small">.25</span><Icon type='down' size="xs" className="greenArrow"/></p>
                                    <p className="oilLabel">今日最低价</p>
                                    <span className="shortLine"></span>
                                </Flex.Item>
                                <Flex.Item className="position-relative">
                                    <p className="oilPrice">5310<span className="oilPriceBig--span--small">.25</span><Icon type='up' size="xs"  className="redArrow"/></p>
                                    <p className="oilLabel">今日最低价</p> 
                                    <span className="shortLine"></span>                       
                                </Flex.Item>
                                <Flex.Item>
                                    <p className="oilPrice">5310<span className="oilPriceBig--span--small">.25</span></p>
                                    <p className="oilLabel">今日最低价</p>                        
                                </Flex.Item>
                            </Flex>
                            <Flex justify="center" className="oilContainer__middle">
                                <Flex.Item>
                                    <p className="oilPriceBig">5320<span className="oilPriceBig--span">.25</span></p>
                                    <p className="oilLabel"><span className="oilContainer__middle__span">折合单价4.51(元/升)</span></p>
                                </Flex.Item>
                            </Flex>
                            <Button className="oilContainer__btn" activeStyle={{"backgroundColor": "rgba(255,102,26,.8)"}} >立即购买</Button>
                    </WingBlank>
                    <WhiteSpace  size="md"/>
                    <WingBlank size="lg">
                        <WhiteSpace  size="md"/>
                        <Flex justify="between" className="title">
                                <Line/>
                                <span className="titleLabel">价格趋势图</span> 
                                <Flex.Item style={{"fontSize":"0.3rem","textAlign": "center"}}>
                                    <span style={{"marginRight": "0.2rem"}} className={selectDay} onClick={this.selectType.bind(this,'day')}>日</span>
                                    <span className={selectMonth} onClick={this.selectType.bind(this,'month')}>月</span>
                                </Flex.Item>
                                <Flex.Item className="text-right">
                                    <span className="smallTitle"><CrossLine color="#369be9"/>批发价</span> 
                                    <span className="smallTitle" style={{"marginLeft": "0.6rem"}}><CrossLine color="#ff6622"/>零售价</span> 
                                </Flex.Item>
                        </Flex>
                        <WhiteSpace  size="md"/>
                    </WingBlank>  
                    <LineChart/>              
                </div>
            )
        }

        return (
            <QueueAnim  duration="500" type="left" style={{height:'100%',width:'100%'}}>
                <TabBar 
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                    <TabBar.Item
                        title="首页"
                        key="首页"
                        icon={
                            <Icon type={require('../../svg/home.svg')}  size="md" />
                        }
                        selectedIcon={
                            <Icon type={require('../../svg/homeSelect.svg')}  size="md" />
                        }
                        selected={this.state.selectedTab === 'index'}
                        // badge={1}
                        onPress={() => {
                            this.setState({
                            selectedTab: 'index',
                            });
                        }}
                        data-seed="logId"
                    >
                        <PageContainer>
                            <OilVideo></OilVideo>
                            <MainContent/>
                        </PageContainer>        
                    </TabBar.Item>  
                    <TabBar.Item
                            icon={<Icon type={require('../../svg/station.svg')} size="md"/>}
                            selectedIcon={<Icon type={require('../../svg/stationSelect.svg')} size="md"/>}
                            title="提油点"
                            key="提油点"
                            // badge={'new'}
                            // selected={this.state.selectedTab === 'redTab'}
                            onPress={jumpList}
                            data-seed="logId1"
                            >
                            口碑
                    </TabBar.Item>  
                    <TabBar.Item
                        icon={<Icon type={require('../../svg/card.svg')} size="md"/>}
                        selectedIcon={<Icon type={require('../../svg/cardSelect.svg')} size="md"/>}
                        title="管油卡"
                        key="管油卡"
                        dot
                        selected={this.state.selectedTab === 'greenTab'}
                       
                        onPress={jumpCardListPage}
                        >
                            <PageContainer>
                                <OilVideo></OilVideo>
                            </PageContainer>   
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<Icon type={require('../../svg/my.svg')}/>}
                            selectedIcon={<Icon type={require('../../svg/mySelect.svg')}/>}
                            title="我的"
                            key="我的"
                            selected={this.state.selectedTab === 'yellowTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'yellowTab'
                                });
                            }}
                        >
                            <PageContainer>
                                <OilVideo></OilVideo>
                            </PageContainer>   
                    </TabBar.Item>                                
                </TabBar>
            </QueueAnim>
        );
    }
}

IndexPage.propTypes = {
    
};

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(IndexPage);
