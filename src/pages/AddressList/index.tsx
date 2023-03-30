import { creatorEnum } from '@/constant/index';
import request from '@/utils/request';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  FormInstance,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, Modal } from 'antd';
import * as _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

const { confirm } = Modal;

const TableList: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [tags, setTags] = useState<any>([]);
  let navigate = useNavigate();

  const fetchTag = async () => {
    const res: any = await request.get('/tag/list');
    if (res) {
      setTags(res);
    }
  };

  useEffect(() => {
    fetchTag();
  }, []);

  const valueEnum = _.reduce(
    tags,
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
      title: '钱包地址',
      dataIndex: 'address',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '标签',
      dataIndex: 'tagId',
      valueEnum,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      valueEnum: creatorEnum,
    },
    {
      title: '操作',
      key: 'action',
      sorter: true,
      valueType: 'option',
      render: (value: any, record: any) => [
        <Button
          key="delete"
          type="link"
          disabled={record.official === '1'}
          onClick={() => {
            confirm({
              title: '删除地址',
              icon: <ExclamationCircleFilled />,
              content: '确认删除该地址吗？',
              onOk: async () => {
                const success = await request.del('/tag/address', {
                  addressTagId: record.id,
                });
                if (success) {
                  actionRef.current?.reload();
                }
              },
              onCancel() {},
            });
          }}
          style={{ padding: 0 }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="地址列表"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined />
            新增地址
          </Button>,
          <Button
            key="secondary"
            onClick={() => {
              navigate('../tags', { replace: true });
            }}
          >
            <PlusOutlined />
            新增标签
          </Button>,
        ]}
        request={async (params: any) => {
          const { current, ...arg } = params;
          const res: any = await request.get('/tag/address/page', {
            pageNum: current,
            ...arg,
          });
          return {
            data: res.list,
            total: res.total,
            success: true,
          };
        }}
        columns={columns}
      />
      <ModalForm
        title="新增地址"
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await request.post('/tag/address', value);
          if (success) {
            handleModalOpen(false);
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
              message: '需要输入钱包地址',
            },
          ]}
          width="md"
          name="address"
          label="钱包地址"
        />
        <ProFormSelect
          name="tagId"
          label="标签"
          width="md"
          valueEnum={valueEnum}
          rules={[
            {
              required: true,
              message: '需要选择标签分类',
            },
          ]}
        />
        <ProFormSelect
          name="creator"
          label="创建人"
          width="md"
          valueEnum={creatorEnum}
          rules={[
            {
              required: true,
              message: '需要选择创建人',
            },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
