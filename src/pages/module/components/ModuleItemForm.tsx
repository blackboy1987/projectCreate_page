import {Button, Checkbox, Input, message, Select} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {items, itemsRemove, itemsSave} from '../service';
import {type ActionType, type ProColumns, ProTable} from '@ant-design/pro-components';
import {PlusOutlined} from "@ant-design/icons";

type ModuleItemFormProps = {
  values: Record<string, any>;
};

const ModuleItemForm: React.FC<ModuleItemFormProps> = ({values }) => {
  const [loading,setLoading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [data,setData] = useState<Record<string, any>[]>([{
    filedName:'abc'
  }]);
  useEffect(()=>{
    setLoading(true);
    items({
      projectModuleId: values.id,
    }).then(result=>{
      setData(result.data);
      setLoading(false);
    });
  },[])

  const handeChange=(name: string,value: any,index: number)=>{
    const newData = [...data];
    const current = newData.filter((item, index1)=>index===index1);
    if(current && current.length>0){
      current[0][`${name}`] = value;
    }
    setData(newData);
  }

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '#',
      dataIndex: 'id',
      width: 40,
      renderText:(_,__,index)=><span>{index+1}</span>
    },
    {
      title: 'name属性',
      dataIndex: 'filedName',
      width:90,
    },
    {
      title: 'label属性',
      dataIndex: 'labelName',
      width:120,
      renderText:(text,record,index)=><Input value={text} onChange={e=>{
        handeChange('labelName',e.currentTarget.value,index);
      }} />
    },
    {
      title: '新增显示',
      dataIndex: 'addShow',
      width:80,
      renderText:(_,record,index)=><Checkbox checked={record.addShow} onChange={e=>{
        console.log(e.target.checked);
        handeChange('addShow',e.target.checked,index);
      }} />
    },
    {
      title: '修改显示',
      dataIndex: 'updateShow',
      width:80,
      renderText:(_,record,index)=><Checkbox checked={record.updateShow} onChange={e=>{
        console.log(e.target.checked);
        handeChange('updateShow',e.target.checked,index);
      }} />
    },
    {
      title: '必填',
      dataIndex: 'isRequired',
      width:50,
      renderText:(_,record,index)=><Checkbox checked={record.isRequired} onChange={e=>{
        console.log(e.target.checked);
        handeChange('isRequired',e.target.checked,index);
      }} />
    },
    {
      title: '校验',
      dataIndex: 'validate',
      renderText:(_,record,index)=><Checkbox checked={record.validate} onChange={e=>{
        console.log(e.target.checked);
        handeChange('validate',e.target.checked,index);
      }} />
    },
    {
      title: '表单类型',
      dataIndex: 'formType',
      renderText:(text,record,index)=>(
        <Select value={text} style={{width:'100%'}} onSelect={e=>{
          handeChange('formType',e,index);
        }}>
          <Select.Option value='input'>单行文本</Select.Option>
          <Select.Option value='textarea'>多行文本</Select.Option>
          <Select.Option value='textarea1'>富文本</Select.Option>
          <Select.Option value='number'>数字</Select.Option>
          <Select.Option value='radio'>单选框</Select.Option>
          <Select.Option value='checkbox'>复选框</Select.Option>
          <Select.Option value='date'>日期</Select.Option>
        </Select>
      )
    },
  ];

  const handleAdd=()=>{
    const newData = [...data];
    newData.push({})
    setData(newData);
  }

  return (
    <ProTable<Record<string, any>, Record<string, any>>
      loading={loading}
      scroll={{y:window.innerHeight/2}}
      actionRef={actionRef}
      options={false}
      rowKey="id"
      cardProps={false}
      bordered
      search={false}
      size="small"
      tableAlertRender={false}
      dataSource={data}
      columns={columns}
    />
  );
};

export default ModuleItemForm;
