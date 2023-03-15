import { addRule, removeRule, updateRule } from '@/services/ant-design-pro/api';
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
  const [categories, setCategories] = useState([]);

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
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      render: (dom, entity) => {
        console.log('🚀 ~ file: index.tsx:128 ~ entity:', entity);
        console.log('🚀 ~ file: index.tsx:131 ~ dom:', dom);
        return dom;
      },
      valueEnum,
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
            新建标签
          </Button>,
          <Button
            key="secondary"
            onClick={() => {
              handleCateModalOpen(true);
            }}
          >
            <PlusOutlined />
            新建分类
          </Button>,
        ]}
        request={async (params: any) => {
          console.log('🚀 ~ file: index.tsx:212 ~ request={ ~ params:', params);
          const res: any = await request.get('/tag/list', params);
          return {
            data: res.list,
            success: true,
          };
        }}
        columns={columns}
      />
      <ModalForm
        title="新建标签"
        width="400px"
        open={createTagModalOpen}
        onOpenChange={handleTagModalOpen}
        onFinish={async (value) => {
          const success = await request.post('/api/tag', value);
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
              message: '需要输入标签名称',
            },
          ]}
          width="md"
          name="name"
          label="标签名称"
        />
        <ProFormSelect
          name="categoryId"
          label="标签分类"
          width="md"
          valueEnum={valueEnum}
          rules={[
            {
              required: true,
              message: '需要选择标签分类',
            },
          ]}
        />
        <ProFormTextArea label="标签备注" width="md" name="note" />
      </ModalForm>
      <ModalForm
        title="新建分类"
        width="400px"
        open={createCateModalOpen}
        onOpenChange={handleCateModalOpen}
        onFinish={async (value) => {
          const success = await request.post('/api/tag/category', value);
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
              message: '需要输入分类名称',
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
