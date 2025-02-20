
import CONSTANT from "@/store/constant.ts";

const defaultOptions = {
	header: {
		'content-type': 'application/json',
		'Access-Control-Allow-Origin': 'https://www.wanandroid.com',
		'Access-Control-Allow-Credentials': true,
	},
};
const BASE_URL = 'https://www.wanandroid.com';

const handleURL = (requestParams : any) => {
	const {
		url
	} = requestParams;
	if (url.startsWith('/')) {
		requestParams.url = `${BASE_URL}${url}`;
	}
};

const handleToken = (requestParams : any) => {
	const token = uni.getStorageSync(CONSTANT.TOKEN_KEY);
	if (token) {
		requestParams.header.cookie = token;
	}
};

uni.addInterceptor('request', {
	invoke: function (config) {
		handleURL(config);
		handleToken(config);
	}
});

const request = async ({
	url = '',
	data = {},
	method = 'GET',
	header = {}
}) => {
	try {
		return await new Promise((resolve, reject) => {
			uni.request({
				...defaultOptions,
				url,
				data,
				method,
				header: {
					...defaultOptions.header,
					...header,
				},
				success(res) {
					if (res?.statusCode === 200) {
						const {
							errorCode, data, errorMsg
						} = res?.data as any;
						if (errorCode === 0) {
							return resolve(data);
						} else {
							return reject(errorMsg);
						}
					} else {
						return reject(res?.errMsg);
					}
				},
				fail(error) {
					return reject(error);
				},
				complete() { }
			});
		});
	} catch (_) { }
};

export const get = (apiUrl : string, params = {}, headerConfig = {}) => request({
	url: apiUrl,
	data: params,
	method: 'GET',
	header: headerConfig
});

export const post = (apiUrl : string, params = {}, headerConfig = {}) => request({
	url: apiUrl,
	data: params,
	method: 'POST',
	header: headerConfig
});