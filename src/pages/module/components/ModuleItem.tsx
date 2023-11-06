import {Modal, Tabs, TabsProps} from 'antd';
import React, {useState} from 'react';
import ModuleItemConfig from "./ModuleItemConfig";
import ModuleItemForm from "./ModuleItemForm";
import ModuleItemList from "./ModuleItemList";

type ModuleItemProps = {
  open: boolean;
  onClose: () => void;
  values: Record<string, any>;
};

const ModuleItem: React.FC<ModuleItemProps> = ({ open, values, onClose }) => {
  const [activeKey,setActiveKey] = useState<string>('1');
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '属性设置',
    },
    {
      key: '2',
      label: '表单配置',
    },
    {
      key: '3',
      label: '列表配置',
    },
    {
      key: '4',
      label: '查询配置',
    },
  ];

  return (
    <Modal
      width='80%'
      destroyOnClose
      maskClosable={false}
      open={open}
      footer={null}
      onCancel={onClose}
      styles={{
        body: {
          minHeight: window.innerHeight/2
        }
      }}
    >
      <Tabs activeKey={activeKey} items={items} onChange={(activeKey: string)=>setActiveKey(activeKey)} />
      {
        activeKey === '1' ? (<ModuleItemConfig values={values}/>) : null
      }
      {
        activeKey === '2' ? (<ModuleItemForm values={values}/>) : null
      }
      {
        activeKey === '3' ? (<ModuleItemList values={values}/>) : null
      }
    </Modal>
  );
};

export default ModuleItem;
