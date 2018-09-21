import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import AddOwner from './OwnerCreate';
import UpdateOwner from './OwnerEdit';

import {
  Form,
  Input,
  Select,
  Menu,
  Divider,
  Steps,
  Radio,
  Table,
  Button,
  Card,
  Row,
  Col,
  Popconfirm,
  Modal,
  Icon,
  InputNumber,
  DatePicker,
} from 'antd';


// 引入样式
import styles from './TableList.less';

// 引入页头组件

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

// 声明变量
const FormItem = Form.Item;



// 关联业主信息模型
/* eslint react/no-multi-comp:0 */

@connect(({ basicinfo, loading }) => ({
  basicinfo,
  loading: loading.models.basicinfo,
}))
@Form.create()
class OwnerInfo extends PureComponent {
  // 定义列名，索引值及key
  columns = [
    {
      title: '编号',
      dataIndex: 'ownerid',
      key: 'ownerid',
    },
    {
      title: '业主姓名',
      dataIndex: 'ownername',
      key: 'ownername',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '证件号',
      dataIndex: 'identitycord',
      key: 'identitycord',
    },
    {
      title: '电话号',
      dataIndex: 'ownerphone',
      key: 'ownerphone',
    },
    {
      title: '操作',
      // record参数中包含了该列的数据
      render: (text, record) => (
        <Fragment>
          <UpdateOwner params={record}/>
          <Popconfirm  onConfirm={confirm=(e)=>{
            this.delete(record);
            e.stopPropagation();
          }}   title="删除不可恢复，你确定要删除吗?" >
            <Button type="primary">删除</Button>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  // 封装方法

  // 重置方法
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'basicinfo/fetch',
      payload: {},
    });
  };

  // 查询方法
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };
      console.log(values);
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'basicinfo/search',
        payload: values,
      });
    });
  };
  // 删除
  delete(id){
    console.log(id);
    const {dispatch} = this.props;
    // 触发action触发model层的state的初始化
    dispatch({
      // type是命名空间下的方法，payload是负载的数据
      type:'basicinfo/remove',
      payload:id,
    });
  }
  // 初始状态
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  // 构造
  constructor(props){
    super(props);
  }

  // 声明周期函数
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'basicinfo/fetch',
    });
  }

  // 查询组件
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('ownername')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label='性别'>
              {getFieldDecorator('sex')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="证件号">
              {getFieldDecorator('identitycord')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="电话">
              {getFieldDecorator('ownerphone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 生成查询模块
  renderForm() {
    const { expandForm } = this.state;
    return this.renderSimpleForm();
  }
  render() {

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };

    // 解构返回的json数据
    const {basicinfo} = this.props;

    // 组件Table显示数据遍历数据,注意rowkey必须有否则报错警告
    return (
          <PageHeaderWrapper title="业主信息">
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <AddOwner/>
                <Table rowSelection={rowSelection} dataSource={basicinfo[0]} className={styles.standardTable} columns={this.columns} rowKey={record=>record.ownerid}/>
              </div>
            </Card>
          </PageHeaderWrapper>
    );
  }
}

export default OwnerInfo;
