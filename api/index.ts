import * as http from '@/utils/http.ts'
const API = {
	//轮播图
	queryBannerListApi: (params : any) => http.get(`/banner/json`,
		params),

	// 置顶文章		
	queryArticleTopListApi: (params : any) => http.get(`/article/top/json`,
		params),

	//一般文章
	queryArticleListApi: (params : any = { "page": "0" }) => http.get(`/article/list/${params.page}/json`,
		params),

	//热词	
	queryHotkeyListApi: (params : any) => http.get(`/hotkey/json`,
		params),

	// 关键词搜索
	queryKeywordApi: (keyword : String, page : Number) => http.post(`/article/query/${page}/json?k=${keyword}`),

	//项目分类
	queryProjectTreeApi: (params : any) => http.get(`/project/tree/json`,
		params),

	//项目列表	
	queryProjectListApi: (params : any, page : Number) => http.get(`/project/list/${page}/json`,
		params),

	//公众号
	queryWxarticleChaptersApi: (params : any) => http.get(`/wxarticle/chapters/json`,
		params),

	// 公众号文章列表
	queryWxarticleListApi: (id : String, page : Number) => http.get(`/wxarticle/list/${id}/${page}/json`),

	//体系
	queryTreeApi: (params : any) => http.get(`/tree/json`,
		params),

	//体系详细
	queryArticleCidListApi: (id : Number, page : Number) => http.get(`/article/list/${page}/json?cid=${id}`),

	//总积分排名
	queryCoinRankApi: (page : Number) => http.get(`/coin/rank/${page}/json`),

	// 登录
	loginApi: (username : String, password : String) => http.post(`/user/login?username=${username}&password=${password}`),

	//注册
	registerApi: (username : String, password : String, repassword : String) => http.post(`/user/register?username=${username}&password=${password}&repassword=${repassword}`),

	//登出
	logOutApi: (params : any) => http.get(`/user/logout/json`, params),

	//个人积分信息
	queryCoinUserInfoApi: (params : any) => http.get(`/lg/coin/userinfo/json`, params),

	//积分历史列表
	queryCoinListApi: (page : Number) => http.get(`/lg/coin/list/${page}/json`),

	//个人收藏
	queryCollectListApi: (page : Number) => http.get(`/lg/collect/list/${page}/json`),

	//收藏操作
	collectApi: (id : Number) => http.post(`/lg/collect/${id}/json`),

	//取消收藏操作
	uncollectOriginIdApi: (id : Number) => http.post(`/lg/uncollect_originId/${id}/json`),
}
export default API;