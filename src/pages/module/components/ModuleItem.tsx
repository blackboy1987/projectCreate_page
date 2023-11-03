import { Button, Modal } from 'antd';
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { items } from '../service';
import { type ActionType, type ProColumns, ProTable } from '@ant-design/pro-components';

type AddProps = {
  open: boolean;
  onClose: () => void;
  values: Record<string, any>;
};

const ModuleItem: React.FC<AddProps> = ({ open, values, onClose }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '模块名称',
      dataIndex: 'name',
    },
    {
      title: '添加时间',
      dataIndex: 'createdDate',
      width: 150,
      hideInSearch: true,
      valueType: 'dateTime',
    },
  ];
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      open={open}
      title={`${values.name} 属性管理`}
      footer={null}
      onCancel={onClose}
    >
      <ProTable<Record<string, any>, Record<string, any>>
        actionRef={actionRef}
        options={false}
        rowKey="id"
        bordered
        size="small"
        tableAlertRender={false}
        toolBarRender={() => [
          <Button type="primary" key="add">
            <PlusOutlined /> 新增
          </Button>,
        ]}
        params={{
          projectModuleId: values.id,
        }}
        request={items}
        columns={columns}
      />
    </Modal>
  );
};

export default ModuleItem;
