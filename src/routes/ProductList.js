import React from 'react';
import { connect } from 'dva';
import styles from './ProductList.css';

function ProductList() {
  return (
    <div className={styles.normal}>
      Route Component: ProductList
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ProductList);
