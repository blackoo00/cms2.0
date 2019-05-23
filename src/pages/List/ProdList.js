/* eslint-disable react/jsx-indent */
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Table, Input, Button, Icon, Card, Radio } from 'antd';
import Link from 'umi/link';
import styles from './BasicList.less';
import router from 'umi/router'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search, TextArea } = Input;

@connect(({ list, loading }) => ({
  prodlist: list.prodlist,
  loading: loading.models.list,
}))
class ProdList extends PureComponent {
  state = { visible: false, done: false };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetchProds',
      payload: {
        page: 1,
        cid: 0,
        key: '',
      },
    });
  }

  showEditModal = item => {
    router.push('/form/pdetail/'+item.id)
  };

  render() {
    const list = this.props.prodlist;
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">销售中</RadioButton>
          <RadioButton value="waiting">已下架</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );
    const columns = [
      {
        title: '商品名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '图标',
        dataIndex: 'main_img_url',
        render: text => <img style={{ width: '80px' }} src={text} />,
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '库存',
        dataIndex: 'stock',
        render: (text, record) => <Link to={'/stock?key=' + record.name}>{text}</Link>,
      },
      {
        title: '分类',
        dataIndex: 'cat_name',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (text, record) => (
          <Button type="primary"
            onClick={e => {
            e.preventDefault();
            this.showEditModal(record);
          }}>详情</Button>
        ),
      },
    ];
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            bordered={false}
            title="商品列表"
            extra={extraContent}
          >
            <Table
              columns={columns}
              dataSource={list}
              pagination={{ current: 1, total: 2, pageSize: 5 }}
              //   onChange={this.pageChange}
              rowKey="id"
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ProdList;
