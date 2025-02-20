<template>
	<view>
		<nut-toast></nut-toast>
		<z-paging ref="paging" v-model="pageList" @query="queryPageList">
			<template #top>
				<nut-swiper :init-page="0" :pagination-visible="true" pagination-color="#426543"
					pagination-unselected-color="#808080" auto-play="3000">
					<nut-swiper-item v-for="(item ,idx) in bannerList" :key="idx">
						<img :src="item.imagePath" alt="item.title" />
					</nut-swiper-item>
				</nut-swiper>
			</template>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view class="item" v-for="(item,index) in pageList" :key="index" @click="itemClick(item,index)">
				<view class="item-title">{{item.title}}</view>
				<view class="item-detail">{{item.detail}}</view>
				<view class="item-line"></view>
			</view>
		</z-paging>
	</view>

</template>

<script setup lang="ts">
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue';
	import API from '@/api/index.ts'
	import {
		userInfoStore
	} from '@/store/userInfo.ts'
	import { useToast } from "@/uni_modules/nutui-uni/components/toast/use-toast";

	const userInfo = userInfoStore()

	const toast = useToast();

	onLoad((options) => {
		console.log("++++++++" + JSON.stringify(options))
		getBannerList()
	})

	const bannerList = ref([])

	function getBannerList() {
		API.queryBannerListApi({}).then((res : any) => {
			bannerList.value = res;
		}).catch(err => {
			if (err) {
				toast.text(err);
			}
		})
	}

	const pageList = ref([])

	const paging = ref(null)

	function queryPageList(pageNo : any) {
		const params = {
			page: pageNo
		}
		API.queryArticleListApi(params).then(res => {
			console.log("++++" + JSON.stringify(res))
			paging.value.complete(res.datas);
		}).catch(err => {
			if (err) {
				toast.text(err);
			}
			paging.value.complete(false);
		})
	}

	function itemClick(item : any, index : Number) {
		console.log('点击了' + index + JSON.stringify(item));
	}
</script>

<style lang="scss">
	.nut-swiper-item {
		line-height: 350rpx;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.item {
		position: relative;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 30rpx;
	}

	.item-detail {
		padding: 5rpx 15rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: white;
		background-color: #007AFF;
	}

	.item-line {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		height: 1px;
		width: 100%;
		background-color: #eeeeee;
	}
</style>