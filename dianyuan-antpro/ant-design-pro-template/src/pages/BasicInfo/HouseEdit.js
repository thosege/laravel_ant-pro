import {connect} from 'dva';
import {Popconfirm,Table,Tabs,Drawer,Form,Modal,Button,Col,Row,Input,Select,Upload, Icon } from 'antd';
import React, { PureComponent, Fragment } from 'react';

// 与模型关联
@connect(({ houseinfo,loading }) => ({
  houseinfo,
  loading: loading.models.houseinfo,
}))


// 自定义业主信息修改组件
class Update extends React.Component {
  // 设置初始状态
  state = {
    visible: false,
    confirmLoading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    mklist:'',
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
          type:'houseinfo/update',
          payload:values,
          houseimage:this.state.fileList,
        });
      }
    );
  };

  // 提交图片组件

  // 取消预览图片方法
  handleimageCancel = () => this.setState({ previewVisible: false })

  // 点击预览图片方法
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  // 图片添加到文件列表
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  }


  // 自定义生成图片列表方法
  mkfileList = (values)=>{

    const imagelist = [];
    // 循环遍历路径
    for (let i =0; i<values.length;i++) {

      // 随机生成图片uid,name
      let idd  = Math.random().toString(36).substr(2);
      let iname = Math.random().toString(32).substr(2);
      imagelist[i] = {
        uid: idd,
        name: iname,
        url: values[i],
      };
    }

    this.setState({
      fileList:imagelist,
    })

  }
  // 声命周期方法
  componentWillMount()
  {
    // 通过props接受传来的参数
    const url = this.props.params.housephoto;

    // 拆分图片路径，成数组形式
    var imageurl = url.split('@');

    // 判断是否有值 没值就提醒 终止
    if (!imageurl) {
      // message.warning('请上传头像');
      return;
    }

    // 重置图片列表信息,调用生成图片列表方法
    this.setState({
      mklist: this.mkfileList(imageurl),
    })
  }


  // 封装上床图片方法，主组件中调用
  normFile () {

    // 赋予解构初始值
    const { previewVisible, previewImage,fileList } = this.state;
    console.log(this.state.fileList);
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
    // 接受默认值
    const params = this.props.params;
    // 获取表单提交值
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          修改
        </Button>
        <Modal title="房源信息"
               visible={visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <Form layout="vertical" >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="编号">
                  {getFieldDecorator('houseid', {initialValue:params.houseid
                  })(<Input  disabled />)}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="房源地址">
                  {getFieldDecorator('houseaddress', {initialValue:params.houseaddress,
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
                  {getFieldDecorator('ownername', {initialValue:params.ownername,
                    rules: [{ required: true, message: 'please enter user phone' }],
                  })(<Input name="ownername"  placeholder="请输入手机号码 " />)}
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item label='房源状态'>
                  {getFieldDecorator('housestate',{initialValue:params.housestate})(
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
                  {getFieldDecorator('functionary', {initialValue:params.functionary,
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


const UpdateHouse = Form.create()(Update);

export default UpdateHouse;
