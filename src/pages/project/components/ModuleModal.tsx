import { Drawer, Form } from 'antd';
import React, { useEffect } from 'react';
import Module from '@/pages/module';

type AddProps = {
  open: boolean;
  onClose: () => void;
  values: Record<string, any>;
};

const ModuleModal: React.FC<AddProps> = ({ open, values, onClose }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(values || {});
  }, []);
  return (
    <Drawer
      destroyOnClose
      maskClosable={false}
      styles={{
        body: {
          padding: 0,
        },
      }}
      width="80%"
      open={open}
      onClose={onClose}
      title={values.name}
    >
      <Module projectId={values.id} />
    </Drawer>
  );
};

export default ModuleModal;
