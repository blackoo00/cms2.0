import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Form, Input, Upload, Icon, message, Button } from 'antd'
import { connect } from 'dva';

const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('图片格式需是JPG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片不能大于2MB!');
    }
    return isJPG && isLt2M;
}

@connect(({ prod, loading }) => ({
    submitting: loading.effects['form/submitRegularForm'],
    data: prod.detail
}))
@Form.create()
class ProdProfile extends PureComponent {
    state = {
        loading: false,
    };
    componentDidMount() {
        const { id } = this.props.match.params
        const { dispatch } = this.props;
        dispatch({
            type: 'prod/getDetail',
            payload: {
                id: 1
            }
        })
    }
    handleSubmit = e => {

    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                console.log(info.file.response.url)
                this.setState({
                    imageUrl,
                    loading: false,
                })
            }
            );
        }
    };
    render() {
        const { data: detail, submitting } = this.props;
        if (detail === null) return null
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
        const submitFormLayout = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 10, offset: 7 },
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
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                        <FormItem {...formItemLayout} label={'商品名'}>
                            {getFieldDecorator('name', {
                                initialValue: detail.name,
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
                                initialValue: detail.price,
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
                                    action="http://a.cn/api/cms/prod/up_prod_logo"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {detail.main_img_url ? <img src={imageUrl ? imageUrl : detail.main_img_url} alt="avatar" style={{ width: 102 }} /> : uploadButton}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                <FormattedMessage id="form.submit" />
                            </Button>
                            <Button style={{ marginLeft: 8 }}>
                                <FormattedMessage id="form.save" />
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default ProdProfile