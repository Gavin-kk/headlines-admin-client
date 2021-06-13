import { Card } from 'antd';
import React, { memo, FC } from 'react';
import Bread from '@components/bread';
import Filter from '@pages/article/components/filter';
import MTable from '@pages/article/components/table';
import { ArticleWrapper } from './style';

const Article: FC = () => (
  <ArticleWrapper>
    <Card className="global-card" title={<Bread />}>
      {/* 筛选组件 */}
      <Filter />
      {/* 筛选结果表格组件 */}
      <MTable />
    </Card>
  </ArticleWrapper>
);

export default memo(Article);
