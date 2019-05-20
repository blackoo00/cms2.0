import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Form, Input, Upload, Icon } from 'antd'

const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

@Form.create()
class ProdProfile extends PureComponent{
    state = {
        loading: false,
      };
    componentDidMount(){
        const {id} = this.props.match.params
        console.log(id)
    }
    handleSubmit = e =>{

    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
              md: { span: 10 },
            },
          };
          const {
            form: { getFieldDecorator, getFieldValue },
          } = this.props;
          const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const imageUrl = this.state.imageUrl;
        return(
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                        <FormItem {...formItemLayout} label={'商品名'}>
                            {getFieldDecorator('name', {
                                initialValue:'',
                                rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'form.weight.placeholder' }) + '商品名',
                                },
                                ],
                            })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={'价格'}>
                            {getFieldDecorator('price', {
                                initialValue:'',
                                rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'form.weight.placeholder' }) + '价格',
                                },
                                ],
                            })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={'图标'}>
                        {getFieldDecorator('main_img_url', {
                                // valuePropName: 'fileList',
                            })(
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                </Upload>
                            )}
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default ProdProfile