import request from '../utils/request';
import qs from 'qs';

export async function query(ops) {
    return request('/inner/cards?' + ops.urlParams, ops.params);
}
