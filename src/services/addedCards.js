import request from '../utils/request';
import qs from 'qs';

export async function query(ops) {
    return request('/inner/addedCards?' + ops.urlParams, ops.params);
}

export async function deleteItem(ops) {
    return request('/inner/addedCards/' + ops.urlParams.id, ops.params);
}

export async function addItem(ops) {
    return request('/inner/addedCards', ops.params);
}