var request = require('request');
var crypto = require('crypto');


/**
 * Ali短信服务调用
 *
 * 用法
 * let aliSms = new AliSms({AccessKeySecret:"AccessKeySecret",AccessKeyId:"AccessKeyId"});
 * let sendOption = {
 *   SignName: "阿里云短信测试专用", 
 *   TemplateCode: "SMS_73145008",
 *   TemplateParam:"{\"code\":\"" + 123456 + "\",\"product\":\"测试发送\"}",
 *   PhoneNumbers:"xxxxxx",
 * }
 *
 * aliSms.SendSms(sendOption)
 * 
 *
 * 
 */


class AliSms {
	getParam(options) {
		this.param = {};
		this.param.Format = this._options.Format;
		this.param.AccessKeyId = this._options.AccessKeyId;
		this.param.SignatureMethod = this._options.SignatureMethod;
		this.param.Version = this._options.Version;
		this.param.SignatureVersion = this._options.SignatureVersion;
		this.param.SignName = options.SignName;
		this.param.TemplateParam = options.TemplateParam;
		this.param.TemplateCode = options.TemplateCode;
		this.param.Timestamp=new Date().toISOString();
		this.param.Action=options.Action || 'SendSms';
		this.param.RegionId=options.RegionId || 'cn-hangzhou';
		this.param.SignatureNonce=""+Math.random();
		this.param.PhoneNumbers=options.PhoneNumbers;
		return this.param;
	}
	constructor(options) {
		options = options || {};
		this._options = {};
		this._options.AccessKeySecret = options.AccessKeySecret;
		this._options.AccessKeyId = options.AccessKeyId;
		this._options.Format = 'JSON';
		this._options.SignatureMethod = 'HMAC-SHA1';
		this._options.Version = '2017-05-25'
		this._options.SignatureVersion = '1.0'
		this._options.url = 'http://dysmsapi.aliyuncs.com/';
	}
	SendSms (options){
		let param = this.getParam(options);
		let url = this.getUrl();
		return new Promise(function(resolve,rejcet){
			request(url,function(error, response, body){
				if(error) return rejcet(error);
				return resolve(body);
			})
		})

	}
	signParameters(param) {
        param = param || this.param;
        let AccessKeySecret = this._options.AccessKeySecret;
        let param2 = {}, data=[];
        let oa = Object.keys(param).sort();
        for (let i = 0; i < oa.length; i++) {
            let key = oa[i];
            param2[key] = param[key];
        }
        for (let key in param2) {
            data.push((encodeURIComponent(key) + '=' + encodeURIComponent(param2[key])));
        }
        data = data.join('&');
        let StringToSign = 'GET' + '&' + encodeURIComponent('/') + '&' + encodeURIComponent(data);
        AccessKeySecret = AccessKeySecret + '&';
        return crypto.createHmac('sha1', AccessKeySecret).update(new Buffer(StringToSign, 'utf-8')).digest('base64');
    }
    getUrl(){
        let url = `${this._options.url}?`;
        let md = [];
        for(let key in this.param) {
            md.push(`${key}=${encodeURIComponent(this.param[key])}`)
        }
        let Signature = this.signParameters();
        md.push(`Signature=${encodeURIComponent(Signature)}`)
        let str = md.join('&');
        url = url+str;
        return url;
    }
}

module.exports = AliSms;




