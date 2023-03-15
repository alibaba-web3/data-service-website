import { DownloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, List, Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

const tabData = [
  {
    key: '1',
    title: '量化回测数据',
  },
  {
    key: '2',
    title: '其他数据',
  },
];

interface ListDataType {
  tab: string;
  title: string;
  url: string;
}

function renderTabBar(props: any, DefaultTabBar: any) {
  return (
    <div style={{ padding: '0, 24px' }}>
      <DefaultTabBar {...props} />
    </div>
  );
}

const Download: React.FC = () => {
  const listData = [
    {
      tab: '1',
      title: 'Binance 现货价格-日线',
      url: 'http://8.222.145.211:8082/api/download/spot/1d',
    },
    {
      tab: '1',
      title: 'TVL',
      url: 'http://8.222.145.211:8082/api/download/tvl/1d',
    },
    {
      tab: '1',
      title: '合约调用次数',
      url: 'http://8.222.145.211:8082/api/download/erc20/user/1d',
    },
    {
      tab: '1',
      title: '项目利润数据',
      url: 'http://8.222.145.211:8082/api/download/profit/1d',
    },
    {
      tab: '2',
      title: 'Coming Soon',
      url: 'https://test1.com',
    },
  ];

  /**
   * 渲染下载列表数据
   * @param key
   * @param listData
   */
  const renderListData = (key: string, listData: ListDataType[]) => {
    return listData.filter((item) => item.tab === key);
  };

  /**
   * 下载文件
   * @param url
   */
  const downloadFile = (url: string) => {
    // 解决 http 下载问题
    window.open(url, '_blank');
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
        <Tabs
          defaultActiveKey="1"
          renderTabBar={renderTabBar}
          tabPosition="left"
          style={{ height: 620 }}
        >
          {tabData.map((tab) => (
            <TabPane tab={tab.title} key={tab.key}>
              <List
                bordered
                dataSource={renderListData(tab.key, listData)}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={item.title} />
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      onClick={() => downloadFile(item.url)}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Download;
