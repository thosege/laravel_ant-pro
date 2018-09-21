import {connect} from 'dva';
import {Popconfirm,Table,Tabs,Drawer,Form,Modal,Button,Col,Row,Input,Select,Upload, Icon } from 'antd';
import React, { PureComponent, Fragment } from 'react';

@connect(({ houseinfo,loading }) => ({
  houseinfo,
  loading: loading.models.houseinfo,
}))
// 自定义业主信息添加组件
class Add extends React.Component {
  // 设置初始状态
  state = {
    visible: false,
    confirmLoading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 外部取消按钮
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  // 确认提交方法
  handleOk = e => {
    e.preventDefault();
    this.setState({
      visible: false,
    });
    // 获取表单数据并传递给方法,houseimage接受上传的图片数据
    this.props.form.validateFields(
      (err,values)=>{
        const {dispatch} = this.props;
        dispatch({
          type:'houseinfo/add',
          payload:values,
          houseimage:this.state.fileList,
        });
      }
    );
  };

  // 提交图片组件
  // 取消图片方法
  handleimageCancel = () => this.setState({ previewVisible: false })
  // 预览图片，存储图片信息
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
  //封装上床图片方法，主组件中调用
  normFile ()  {
    // 析构显示图片信息
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return(
      <div>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleimageCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
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
        <Modal title="房源信息"
               visible={visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <Form layout="vertical" >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="房源地址">
                  {getFieldDecorator('houseaddress', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input name="houseaddress"  placeholder="请输入姓名" />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="缩略图">
                  <div>{this.normFile()}</div>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="业主姓名">
                  {getFieldDecorator('ownername', {
                    rules: [{ required: true, message: 'please enter user phone' }],
                  })(<Input name="ownername"  placeholder="请输入手机号码 " />)}
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item label='房源状态'>
                  {getFieldDecorator('housestate')(
                    <Select name="housestate" placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="装修中">装修中</Option>
                      <Option value="在租中">在租中</Option>
                      <Option value="已到期">已到期</Option>
                      <Option value="待租中">待租中</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="负责人">
                  {getFieldDecorator('functionary', {
                    rules: [{ required: true, message: 'please enter user phone' }],
                  })(<Input name="functionary"  placeholder="请输入手机号码 " />)}
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Modal>
      </div>
    );
  }
}


const AddHouse = Form.create()(Add);

export default AddHouse;
