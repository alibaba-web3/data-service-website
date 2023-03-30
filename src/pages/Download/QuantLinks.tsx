import { List } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const links = [
  {
    title: 'Binance 现货价格-日线',
    url: 'https://api.0x66.io/api/download/spot/1d',
  },
  {
    title: 'TVL',
    url: 'https://api.0x66.io/api/download/tvl/1d',
  },
  {
    title: '合约调用次数',
    url: 'https://api.0x66.io/api/download/erc20/user/1d',
  },
  {
    title: '项目利润数据',
    url: 'https://api.0x66.io/api/download/profit/1d',
  },
];

export const QuantLinks = () => (
  <List
    bordered
    size="large"
    dataSource={links}
    renderItem={({ title, url }) => (
      <List.Item
        actions={[
          <a key="list-loadmore-download">
            <DownloadOutlined onClick={() => window.open(url, '_blank')} />
          </a>,
        ]}
      >
        {title}
      </List.Item>
    )}
  />
);
