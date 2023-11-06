import {list} from './service';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import React, {useRef} from 'react';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '操作',
      dataIndex: 'action',
      width:140,
    },
    {
      title: '操作人',
      dataIndex: 'username',
      width:100,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      hideInSearch: true,
      width:100,
    },
    {
      title: '请求地址',
      dataIndex: 'requestUrl',
      width:200,
    },
    {
      title: '参数',
      dataIndex: 'parameters',
      hideInSearch: true,
    },
    {
      title: '添加时间',
      dataIndex: 'createdDate',
      width: 150,
      valueType: 'dateTime',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Record<string, any>, Record<string, any>>
        actionRef={actionRef}
        search={{
          span:6,
          labelWidth:80,
        }}
        cardProps={{bodyStyle:{marginTop:8,padding:8}}}
        options={false}
        rowKey="id"
        bordered
        size="small"
        tableAlertRender={false}
        request={list}
        columns={columns}
      />

    </PageContainer>
  );
};
