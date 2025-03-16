import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { isEqual } from 'lodash-es';
import { message } from 'ant-design-vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const profile = reactive<UserProfile>({
      id: 0,
      avatar: '',
      username: '',
      nickname: '',
      level: 1,
      online: false,
    });

    async function init_profile_property(user_profile: UserProfile) {
      try {
        Object.assign(profile, user_profile);
      } catch (error) {
        if (error instanceof Error) {
          message.error(`用户信息初始化失败:${error.message}`);
        } else {
          message.error(`未知错误:${error}`);
        }
        return false;
      }
    }
    const set_profile_property = (change_profile: ChangeProfile) => {
      const waiting_change_profile: ChangeProfile = {
        avatar: null,
        nickname: null,
        gender: null,
        personal_message: null,
        email: null,
        phone_number: null,
        address: null,
        birthday: null,
      };
      if (
        !isEqual(
          Object.keys(waiting_change_profile).sort(),
          Object.keys(change_profile).sort(),
        )
      ) {
        console.log('请传入完整参数');
        return false;
      }
      /// 发送post信息到服务器更改
      /// 成功后更新本地数据
    };

    const meme = ref<Meme[]>([]);

    return {
      profile,
      init_profile_property,
      set_profile_property,
      meme,
    };
  },
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // pinia持久化选项，不是错误！！！！！
    persist: true,
  },
);
