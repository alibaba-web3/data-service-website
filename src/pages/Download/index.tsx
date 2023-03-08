import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React from 'react';

const { Link } = Typography;

const Download: React.FC = () => {
  return (
    <PageContainer>
      <Card title="回测数据下载">
        <h4>
          <Link
            href="http://8.222.145.211:8082/api/download/spot/1d"
            target="_blank"
          >
            Binance 现货价格-日线
          </Link>
        </h4>
        <h4>
          <Link
            href="http://8.222.145.211:8082/api/download/tvl/1d"
            target="_blank"
          >
            TVL
          </Link>
        </h4>
        {/* <a href="http://8.222.145.211:8082/api/download/erc20/user/1d">合约调用次数</a>
        <br />
        <br /> */}
        <h4>
          更多数据上线中。提出你的数据诉求，更快上线：
          <Link href="https://alidocs.dingtalk.com/i/nodes/3QD5Ea7xAo4VEXqz1B9rWG1YBwgnNKb0?iframeQuery=utm_source%3Dportal%26utm_medium%3Dportal_recent">
            反馈链接
          </Link>
        </h4>
      </Card>
    </PageContainer>
  );
};

export default Download;
