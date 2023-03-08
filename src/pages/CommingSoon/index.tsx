import { SmileOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Result } from 'antd';
import React from 'react';

const CommingSoon: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Result icon={<SmileOutlined />} title="页面开发中，敬请期待……" />
      </Card>
    </PageContainer>
  );
};

export default CommingSoon;
