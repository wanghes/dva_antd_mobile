import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import QueueAnim from 'rc-queue-anim';
import qs from 'qs';
import { Accordion, List,WingBlank,WhiteSpace,NavBar,Icon} from 'antd-mobile';
import styles from './style.css';
import Spinner from '../../components/spinner/Spinner.js';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           list:[]
        };
    }

    componentDidMount(){
        this.setState({
            list: this.props.list
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: this.props.example
        });
    }

    render(){
        const {dispatch,list,location,loading} = this.props;
        const { query={}, pathname } = location

        const alertInfo = (key) => {
            dispatch(routerRedux.push({
                pathname:"/"
            }))
        }
        return (
             <QueueAnim style={{width:'100%',height:'100%',overflowX:"hidden"}} duration="500" type="left">
                <Spinner loading={loading} />
                <div key="index">
                    <WhiteSpace size="sm" />
                    <WingBlank size="sm">
                        <Accordion className="my-accordion">
                            <Accordion.Panel header="城市信息">
                                <List className="my-list">
                                    {
                                        list.map(function (item) {
                                            return (
                                                <List.Item key={item.temperature}>{item.city}-{item.name}-{item.temperature}</List.Item>
                                            )
                                        })
                                    }
                                </List>
                            </Accordion.Panel>
                            <Accordion.Panel header="测试你的命运">
                                <div className="pad">this is panel content2 or other</div>
                            </Accordion.Panel>
                            <Accordion.Panel header="测试你的心情">
                                <div className="pad">Text text text text text text text text text text text text text text text</div>
                            </Accordion.Panel>
                        </Accordion>
                    </WingBlank>
                </div>
            </QueueAnim>
        );
    }
}

ListPage.propTypes = {
   	example: PropTypes.object,
    loading: PropTypes.bool
};

function mapStateToProps(state) {
    const { list=[],title } = state.example;
    return {
        loading: state.loading.global,
        list,
        title   
    };
}


export default connect(mapStateToProps)(ListPage);
