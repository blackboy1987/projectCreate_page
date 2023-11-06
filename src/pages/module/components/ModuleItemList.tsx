import {Button, Checkbox, Input, message, Select} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {items, itemsRemove, itemsSave} from '../service';
import {type ActionType, type ProColumns, ProTable} from '@ant-design/pro-components';
import {PlusOutlined} from "@ant-design/icons";

type ModuleItemListProps = {
  values: Record<string, any>;
};

const ModuleItemList: React.FC<ModuleItemListProps> = ({values }) => {
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
      title: '标题',
      dataIndex: 'listTitle',
      width:120,
      renderText:(text,record,index)=><Input value={text} onChange={e=>{
        handeChange('listTitle',e.currentTarget.value,index);
      }} />
    },
    {
      title: '显示',
      dataIndex: 'listShow',
      width:80,
      renderText:(_,record,index)=><Checkbox checked={record.addShow} onChange={e=>{
        console.log(e.target.checked);
        handeChange('listShow',e.target.checked,index);
      }} />
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

export default ModuleItemList;
