import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProFormSelect,
  FormInstance,
} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@umijs/max';
import request from '@/utils/request';
import * as _ from 'lodash';

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
      title: '标签',
      dataIndex: 'tagId',
      valueEnum,
    },
    {
      title: '地址',
      dataIndex: 'address',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '操作',
      key: 'action',
      sorter: true,
      valueType: 'option',
      render: (value: any, record: any) => [
        <a
          key="delete"
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
        >
          删除
        </a>,
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
          const res: any = await request.get('/tag/address/page', {
            tagId: params.tagId,
            pageNum: params.current,
            pageSize: params.pageSize,
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
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
