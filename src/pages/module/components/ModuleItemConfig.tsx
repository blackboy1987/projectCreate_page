import {Button, Input, message, Select} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {items, itemsRemove, itemsSave} from '../service';
import {type ActionType, type ProColumns, ProTable} from '@ant-design/pro-components';
import {PlusOutlined} from "@ant-design/icons";

type ModuleItemConfigProps = {
  values: Record<string, any>;
};

const ModuleItemConfig: React.FC<ModuleItemConfigProps> = ({values }) => {
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
      title: ()=><Button title='点击新增属性' style={{marginRight:16}} type="primary" size='small' onClick={()=>handleAdd()} icon={<PlusOutlined />} />,
      dataIndex: 'id',
      width: 40,
      renderText:(_,__,index)=><span>{index+1}</span>
    },
    {
      title: '属性名',
      dataIndex: 'filedName',
      renderText:(text,record,index)=><Input value={text} onChange={e=>{
        console.log(e.currentTarget.value);
        handeChange('filedName',e.currentTarget.value,index);
      }} />
    },
    {
      title: '备注',
      dataIndex: 'comment',
      renderText:(text,record,index)=><Input value={text} onChange={e=>{
        handeChange('comment',e.currentTarget.value,index);
      }} />
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 140,
      renderText:(text,record,index)=>(
        <Select value={text} style={{width:'100%'}} onSelect={e=>{
          handeChange('type',e,index);
        }}>
          <Select.Option value='String'>String</Select.Option>
          <Select.Option value='Integer'>Integer</Select.Option>
          <Select.Option value='Boolean'>Boolean</Select.Option>
          <Select.Option value='Date'>Date</Select.Option>
          <Select.Option value='BigDecimal'>BigDecimal</Select.Option>


        </Select>
      )
    },
    {
      title: '操作',
      dataIndex: 'opt',
      width: 130,
      render:(_,record,index)=>[
        <Button key='save' type='primary' size='small' onClick={()=>{
          itemsSave({...record,projectModuleId:values.id}).then(result=>{
            console.log(result);
          })
        }}>保存</Button>,
        <Button key='remove' type='primary' size='small' danger style={{marginLeft:8}} onClick={()=>{
          if(record.id){
            itemsRemove({
              moduleId: values.id,
              id: record.id,
            }).then(result=>{
              if(result.code===0){
                setData(data.filter((item,index1)=>index1!==index));
              }else{
                message.error("属性删除失败").then();
              }
            })
          }else{
            setData(data.filter((item,index1)=>index1!==index));
          }
        }}>删除</Button>
      ]
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

export default ModuleItemConfig;
