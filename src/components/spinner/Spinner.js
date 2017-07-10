import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Spinner.less';

function Spinner({ loading }) {
    //console.log(loading);
    const svgCls = classnames({
        spinner_wrap: true,
        show: loading,
    });

    return (        
        <div  className={svgCls}>
            <div className='spinner'>
                <svg  width="44px" height="44px" viewBox="0 0 44 44">
                    <circle className='path' fill="none" strokeWidth="4" strokeLinecap="round" cx="22" cy="22" r="20" />
                </svg>
            </div>
        </div>
    );
}

Spinner.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default Spinner;
