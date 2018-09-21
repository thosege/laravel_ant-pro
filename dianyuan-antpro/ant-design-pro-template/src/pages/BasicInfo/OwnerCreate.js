import {connect} from 'dva';
import {Popconfirm,Table,Tabs,Drawer,Form,Modal,Button,Col,Row,Input,Select,Upload, Icon } from 'antd';
import React, { PureComponent, Fragment } from 'react';

@connect(({ basicinfo,loading }) => ({
  basicinfo,
  loading: loading.models.basicinfo,
}))
// 自定义业主信息添加组件
class Add extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  handleOk = e => {
    e.preventDefault();
    this.setState({
      visible: false,
    });
    this.props.form.validateFields(
      (err,values)=>{
        const {dispatch} = this.props;
        dispatch({
          type:'basicinfo/add',
          payload:values,
        });
      }
    );
  };

  render() {
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          新建
        </Button>
        <Modal title="业主信息"
               visible={visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <Form layout="vertical" >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="姓名">
                  {getFieldDecorator('ownername', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input name="ownername"  placeholder="请输入姓名" />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="性别">
                  {getFieldDecorator('sex', {
                    rules: [{ required: true, message: '表单不能为空' }],
                  })(<Input name="sex"  placeholder="请输入性别 " />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="证件号">
                  {getFieldDecorator('identitycord', {
                    rules: [{ required: true, message: 'please enter user sex'}],
                  })(<Input name="identitycord"  placeholder="请输入证件号 " />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="手机号">
                  {getFieldDecorator('ownerphone', {
                    rules: [{ required: true, message: 'please enter user phone' }],
                  })(<Input name="ownerphone"  placeholder="请输入手机号码 " />)}
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Modal>
      </div>
    );
  }
}


const AddOwner = Form.create()(Add);

export default AddOwner;
