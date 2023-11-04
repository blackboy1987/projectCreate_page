import { Form, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { save } from '../service';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

type AddProps = {
  open: boolean;
  onClose: () => void;
  values?: Record<string, any>;
};

const Add: React.FC<AddProps> = ({ open, values, onClose }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(values || {});
  }, []);
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      open={open}
      title="添加项目"
      onOk={() => {
        form.validateFields().then((formValues) => {
          save(formValues).then((result) => {
            if (result.code === 0) {
              message.success(result.msg).then();
              onClose();
            } else {
              message.error(result.msg).then();
            }
          });
        });
      }}
      onCancel={onClose}
    >
      <Form form={form} {...layout}>
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label="项目名称" name="name" rules={[{ required: true, message: '必填' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="项目描述" name="memo" >
          <Input.TextArea autoSize={{minRows:4,maxRows:4}} />
        </Form.Item>
        <Form.Item label="项目包名" name="packageName" rules={[{ required: true, message: '必填' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
