# shgbit-ali-sms-api
aliyun sms client 阿里云通信nodejs客户端

[阿里云通信文档](https://help.aliyun.com/document_detail/55284.html?spm=5176.doc56189.6.551.wqSBtS)

### 安装

```
$ npm install shgbit-ali-sms-api --save
```

### 使用

```
const AliSms = require('shgbit-ali-sms-api');

const client = new AliSms({
  AccessKeyId: 'xxxxxxxx',
  AccessKeySecret: 'xxxxxxx'
});

const options = {
  SignName: '短信签名',
  TemplateCode: '模版编号',
  TemplateParam: '模版参数',
  PhoneNumbers:'手机号码'
};
 client.SendSms(options)
 .then()
 .catch()
```



