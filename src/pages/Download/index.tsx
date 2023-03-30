import { projectEnum } from '@/constant/index';
import request from '@/utils/request';
import { DownloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Input, List, Select } from 'antd';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { QuantLinks } from './QuantLinks';

const { Search } = Input;
const { Option } = Select;

const Download: React.FC = () => {
  const [list, setList] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [projectName, setProjectName] = useState<string>(projectEnum[0].value);

  // 获取表数据
  const fetchList = async () => {
    const res: any = await request.get('/download/table/list', { projectName });
    if (res) {
      setList(res);
    }
  };

  useEffect(() => {
    fetchList();
  }, [projectName]);

  // 数据库更改
  const handleChange = (value: string) => {
    setProjectName(value);
  };

  // 搜索表名
  const onSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value.trim());
  };

  // 表数据下载
  const onDownload = (name: string) => {
    window.open(
      `https://api.0x66.io/api/download/${projectName}/${name}`,
      '_blank',
    );
  };

  // 如果有搜索条件，则返回所有条件对应数据
  let renderList = list;
  if (searchText) {
    renderList = list.filter((el: string) => el.includes(searchText));
  }

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
        <h3 style={{ marginTop: 0 }}>量化数据</h3>
        <QuantLinks />
        <h3 style={{ marginTop: 30 }}>其它数据</h3>
        <Search
          addonBefore={
            <Select
              defaultValue={projectName}
              size="large"
              style={{ width: 196 }}
              onChange={handleChange}
            >
              {projectEnum.map((item) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          }
          placeholder="请输入"
          size="large"
          onChange={onSearch}
          enterButton
          style={{ width: 580, marginBottom: 20 }}
        />
        <List
          bordered
          size="large"
          dataSource={renderList}
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
