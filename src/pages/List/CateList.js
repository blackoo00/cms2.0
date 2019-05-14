/* eslint-disable react/jsx-indent */
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Table, Input, Button, Icon } from 'antd';
import Link from 'umi/link';

@connect(({ list, loading }) => ({
  catelist: list.catelist,
  loading: loading.models.list,
}))
class CateList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetchCates',
      payload: {
        page: 5,
        key: '',
      },
    });
  }

  render() {
    // const {
    //     list: { list },
    //   } = this.props;
    const list = this.props.catelist;
    console.log(list);
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
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
        dataIndex: 'img',
        render: text => <img style={{ width: '80px' }} src={text.url} />,
      },
      {
        title: 'Operation',
        dataIndex: 'id',
        render: text => (
          <div>
            <Link to={'products/' + text}>
              <Button type="primary" style={{ marginRight: '8px' }}>
                查看产品
              </Button>
            </Link>
            <Link to={'product?cid=' + text}>
              <Button type="primary">添加产品</Button>
            </Link>
          </div>
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

export default CateList;
