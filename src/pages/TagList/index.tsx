import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProFormSelect,
} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import request from '@/utils/request';
import * as _ from 'lodash';

const TableList: React.FC = () => {
  const [createTagModalOpen, handleTagModalOpen] = useState<boolean>(false);
  const [createCateModalOpen, handleCateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [categories, setCategories] = useState<any>([]);

  const fetchCategory = async () => {
    const res: any = await request.get('/tag/category/list');
    if (res) {
      setCategories(res);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const valueEnum = _.reduce(
    categories,
    (res: any, cur: any) => {
      res[cur.id] = {
        text: cur.name,
        id: cur.id,
      };
      return res;
    },
    {},
  );

  const columns: ProColumns[] = [
    {
      title: '类别',
      dataIndex: 'categoryId',
      valueEnum,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="标签列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleTagModalOpen(true);
            }}
          >
            <PlusOutlined />
            新增标签
          </Button>,
          <Button
            key="secondary"
            onClick={() => {
              handleCateModalOpen(true);
            }}
          >
            <PlusOutlined />
            新增类别
          </Button>,
        ]}
        request={async (params: any) => {
          let res: any;
          if (params.categoryId) {
            res = await request.get('/tag/page', params);
            return {
              data: res.list,
              total: res.total,
              success: true,
            };
          } else {
            res = await request.get('/tag/list', params);
            return {
              data: res,
              success: true,
            };
          }
        }}
        columns={columns}
      />
      <ModalForm
        title="新增标签"
        width="400px"
        open={createTagModalOpen}
        onOpenChange={handleTagModalOpen}
        onFinish={async (value) => {
          const success = await request.post('/tag', value);
          if (success) {
            handleTagModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '需要输入名称',
            },
          ]}
          width="md"
          name="name"
          label="名称"
        />
        <ProFormSelect
          name="categoryId"
          label="类别"
          width="md"
          valueEnum={valueEnum}
          rules={[
            {
              required: true,
              message: '需要选择类别',
            },
          ]}
        />
        <ProFormTextArea label="标签备注" width="md" name="note" />
      </ModalForm>
      <ModalForm
        title="新增类别"
        width="400px"
        open={createCateModalOpen}
        onOpenChange={handleCateModalOpen}
        onFinish={async (value) => {
          const success = await request.post('/tag/category', value);
          if (success) {
            handleCateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '需要输入类别名称',
            },
          ]}
          width="md"
          name="name"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
