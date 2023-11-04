import { request } from '@umijs/max';
import { Constants } from '@/util/constants';
import {fileDownload} from "@/util/utils";

export async function list(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'projectModule/list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then((result) => {
    console.log('result', result);
    return {
      success: true,
      data: result.data.content,
      total: result.data.total,
    };
  });
}
export async function save(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + (body.id ? 'projectModule/update' : 'projectModule/save'), {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function remove(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'projectModule/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function items(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'projectModule/items', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function itemsSave(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'projectModule/itemsSave', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function create(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'projectModule/build', {
    method: 'POST',
    data: body,
    responseType: 'blob',
    ...(options || {}),
  }).then(result=>{
    fileDownload(result,body.fileName);
  });
}
