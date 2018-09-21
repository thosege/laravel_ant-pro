import {connect} from 'dva';
import {Popconfirm,Table,Tabs,Drawer,Form,Modal,Button,Col,Row,Input,Select,Upload, Icon } from 'antd';
import React, { PureComponent, Fragment } from 'react';

// 与模型关联
@connect(({ basicinfo,loading }) => ({
  basicinfo,
  loading: loading.models.basicinfo,
}))


// 自定义业主信息修改组件
class Update extends React.Component {
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
          type:'basicinfo/update',
          payload:values,
        });
      }
    );
  };

  render() {
    const { visible } = this.state;
    const params = this.props.params;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          修改
        </Button>
        <Modal title="业主信息"
               visible={visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <Form layout="vertical" >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="ID">
                  {getFieldDecorator('ownerid', {initialValue:params.ownerid
                  })(<Input disabled />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="姓名">
                  {getFieldDecorator('ownername', {initialValue:params.ownername,
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input name="ownername"  placeholder="请输入姓名" />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="性别">
                  {getFieldDecorator('sex', {initialValue:params.sex,
                    rules: [{ required: true, message: '表单不能为空' }],
                  })(<Input name="sex"  placeholder="请输入性别 " />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="证件号">
                  {getFieldDecorator('identitycord', {initialValue:params.identitycord,
                    rules: [{ required: true, message: 'please enter user sex'}],
                  })(<Input name="identitycord"  placeholder="请输入证件号 " />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="手机号">
                  {getFieldDecorator('ownerphone', {initialValue:params.ownerphone,
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


const UpdateOwner = Form.create()(Update);

export default UpdateOwner;
