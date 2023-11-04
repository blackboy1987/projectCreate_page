import { list, remove,create } from './service';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import Add from './components/Add';
import ModuleItem from '@/pages/module/components/ModuleItem';

export default ({ projectId }: { projectId: number }) => {
  const actionRef = useRef<ActionType>();
  const [values, setValues] = useState<Record<string, any>>({});
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [itemModalVisible, setItemModalVisible] = useState<boolean>(false);

  const build = (record: Record<string, any>) =>{
    create({id:record.id,fileName:record.name+".zip"}).then(result=>{
      console.log(result);
    })
  }

  const handleRemove = (id?: number) => {
    Modal.confirm({
      title: '提醒',
      content: '您正在删除数据',
      onOk: () => {
        remove({
          ids: id || selectedRowKeys.join(','),
        }).then((result) => {
          if (result.code === 0) {
            message.success(result.msg).then();
            actionRef.current?.reload();
          } else {
            message.error(result.msg).then();
          }
        });
      },
    });
  };
  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '模块名称',
      dataIndex: 'name',
    },
    {
      title: '模块描述',
      dataIndex: 'memo',
    },
    {
      title: '模块表名',
      dataIndex: 'tableName',
    },
    {
      title: '添加时间',
      dataIndex: 'createdDate',
      width: 150,
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'opt',
      width: 150,
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          size="small"
          type="primary"
          onClick={() => {
            setAddModalVisible(true);
            setValues(record);
          }}
        >
          修改
        </Button>,
        <Button
          key="module"
          onClick={() => {
            setValues(record);
            setItemModalVisible(true);
          }}
        >
          属性管理
        </Button>,
        <Button
          key="remove"
          size="small"
          onClick={() => build(record)}
        >
          构建
        </Button>,
        <Button
          key="remove"
          size="small"
          type="primary"
          danger
          onClick={() => handleRemove(record.id)}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Record<string, any>, Record<string, any>>
        actionRef={actionRef}
        options={false}
        rowKey="id"
        bordered
        size="small"
        tableAlertRender={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
        }}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => setAddModalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button
            disabled={selectedRowKeys.length === 0}
            type="primary"
            danger
            key="remove"
            onClick={() => handleRemove()}
          >
            删除
          </Button>,
        ]}
        params={{
          projectId,
        }}
        request={list}
        columns={columns}
      />
      {addModalVisible ? (
        <Add
          projectId={projectId}
          values={values}
          open={addModalVisible}
          onClose={() => {
            setAddModalVisible(false);
            actionRef.current?.reload();
            setValues({});
          }}
        />
      ) : null}
      {itemModalVisible ? (
        <ModuleItem
          values={values}
          open={itemModalVisible}
          onClose={() => {
            setItemModalVisible(false);
            setValues({});
          }}
        />
      ) : null}
    </PageContainer>
  );
};
