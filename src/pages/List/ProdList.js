/* eslint-disable react/jsx-indent */
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Table, Input, Button, Icon } from 'antd';
import Link from 'umi/link';

@connect(({ list, loading }) => ({
  prodlist: list.prodlist,
  loading: loading.models.list,
}))
class ProdList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetchProds',
      payload: {
        page: 4,
        cid: 1,
        key: '',
      },
    });
  }

  render() {
    const list = this.props.prodlist;
    // console.log(list)
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              // eslint-disable-next-line no-return-assign
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value="123"
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: <Icon type="smile-o" style={{ color: true ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: false,
      },
      {
        title: 'Icon',
        dataIndex: 'main_img_url',
        render: text => <img style={{ width: '80px' }} src={text} />,
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
      {
        title: 'Stock',
        dataIndex: 'stock',
        render: (text, record) => <Link to={'/stock?key=' + record.name}>{text}</Link>,
      },
      {
        title: 'Category',
        dataIndex: 'cat_name',
      },
      {
        title: 'Operation',
        dataIndex: 'id',
        render: text => (
          <Link to={'/product?id=' + text}>
            <Button type="primary">详情</Button>
          </Link>
        ),
      },
    ];
    return (
      <PageHeaderWrapper>
        <Table
          columns={columns}
          dataSource={list}
          pagination={{ current: 1, total: 2, pageSize: 5 }}
          //   onChange={this.pageChange}
          rowKey="id"
        />
      </PageHeaderWrapper>
    );
  }
}

export default ProdList;
