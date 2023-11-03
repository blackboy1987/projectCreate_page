import { request } from '@umijs/max';
import { Constants } from '@/util/constants';

export async function list(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'project/list', {
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
  return request(Constants.apiUrl + (body.id ? 'project/update' : 'project/save'), {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function remove(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'project/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
