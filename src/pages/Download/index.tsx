import request from '@/utils/request';
import { DownloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Input, List } from 'antd';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';

const { Search } = Input;

const Download: React.FC = () => {
  const listRef = useRef<string[]>([]);
  const [list, setList] = useState<string[]>([]);

  // 获取表数据
  const fetchList = async () => {
    const res: any = await request.get('/download/table/list');

    if (res) {
      listRef.current = res;
      setList(res);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 搜索表名
  const onSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setList(
      listRef.current.filter((el: string) =>
        el.includes(e.target.value.trim()),
      ),
    );
  };

  // 表数据下载
  const onDownload = (name: string) => {
    window.open(`/api/download/${name}`, '_blank');
  };

  return (
    <PageContainer>
      <Card
        title={
          <div>
            已有数据开放下载 👇🏻 &nbsp; 反馈你 &nbsp;
            <a
              href={
                'https://alidocs.dingtalk.com/i/nodes/3QD5Ea7xAo4VEXqz1B9rWG1YBwgnNKb0?iframeQuery=utm_source%3Dportal%26utm_medium%3Dportal_recent'
              }
            >
              想要的数据 &nbsp;
            </a>
            更快上线 🔥🔥
          </div>
        }
      >
        <Search
          placeholder="请输入"
          size="large"
          onChange={onSearch}
          enterButton
          style={{ width: 560, marginBottom: 40 }}
        />

        <List
          size="large"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-download">
                  <DownloadOutlined onClick={() => onDownload(item)} />
                </a>,
              ]}
            >
              {item}
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default Download;
