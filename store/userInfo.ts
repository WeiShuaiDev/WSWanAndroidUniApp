import {
	defineStore
} from 'pinia';

export const userInfoStore = defineStore('userInfo', {
	state: () => {
		return {
			userName: "test",
		};
	},
	actions: {
		setShopId(userName : string) {
			this.userName = userName;
		}
	},
});