import PropTypes from 'prop-types';
import classnames from 'classnames';
import { List,Icon } from 'antd-mobile';
import './listItem.less';


function Item({ item }) {
    return (        
        <List.Item
            className="_card_list_item"
            multipleLine
            onClick={() => {
                console.log(item.id);
            }}
            platform="android"
            >  
            <div className="wrap">
                <div className="top">
                    <div className="info">
                        <span className="one">尾号<b>{item.vice_no.substr(-4)}</b></span>
                        <span className="two">{item.money}元</span>
                    </div>
                    <span className="card_type">{item.card_type}</span>
                    <span className="locate_extra"><Icon type={require('../../svg/locate_money.svg')} />分配额度</span>
                </div>
                <div className="bottom">
                    <span className="truck_no">{item.truck_no}</span>
                    <Icon type="right" />
                </div>
            </div>
        </List.Item>
    );
}

Item.propTypes = {
    item: PropTypes.object,
};

export default Item;
