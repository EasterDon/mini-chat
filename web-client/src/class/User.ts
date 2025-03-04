import {
  type UserValue,
  type UserCanChangeValue,
  UserGender,
  UserLevel,
} from '@/types';
/**
 * 用户基类（抽象类）
 * @abstract
 * @class
 */
export abstract class UserBase {
  /**
   * 用户ID
   * @private
   */
  private id: number;
  /**
   * 头像地址
   */
  avatar: string;
  /**
   * 用户名
   * @private
   */
  private username: string;
  /**
   * 密码
   * @private
   */
  private password: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 性别
   */
  gender: UserGender;
  /**
   * 个性签名
   */
  personal_message: string | null;
  /**
   * 邮箱
   */
  email: string | null;
  /**
   * 手机号码
   */
  phone_number: string | null;
  /**
   * 居住地址
   */
  address: string | null;
  /**
   * 生日
   */
  birthday: string | null;
  /**
   * 注册时间
   */
  registration_time: string;
  /**
   * 在线状态
   */
  online: boolean;
  /**
   * 用户等级
   * @private
   */
  private level: UserLevel;

  changed_value: UserCanChangeValue = Object.seal({
    avatar: null,
    password: null,
    nickname: null,
    gender: null,
    personal_message: null,
    email: null,
    phone_number: null,
    address: null,
    birthday: null,
  });

  /**
   * 创建新的用户实例
   * @param user_value 包含用户信息的对象
   */
  constructor(user_value: UserValue) {
    this.id = user_value.id;
    this.avatar = user_value.avatar!;
    this.username = user_value.username;
    this.password = user_value.password!;
    this.nickname = user_value.nickname!;
    this.gender = user_value.gender!;
    this.personal_message = user_value.personal_message;
    this.email = user_value.email;
    this.phone_number = user_value.phone_number;
    this.address = user_value.address;
    this.birthday = user_value.address;
    this.registration_time = user_value.registration_time;
    this.online = user_value.online;
    this.level = user_value.level;
  }

  /**
   * 用户发送文本消息
   * @async
   * @param value 用户发送的文本消息内容(包含emoji)
   * @returns 发送文本消息内容到服务器操作是否完成的布尔值
   */
  abstract send_message(value: string): Promise<boolean>;

  /**
   * 用户发送个人表情包
   * @description id与服务器中存储的表情包地址一一对应
   * @param meme_id 表情包id
   * @returns 发送文本消息内容到服务器操作是否完成的布尔值
   */
  abstract send_meme(meme_id: number): Promise<boolean>;

  /**
   * 用户发送文件
   * @param file 用户发送的文件
   * @returns 发送文本消息内容到服务器操作是否完成的布尔值
   */
  abstract send_file(file: File): Promise<boolean>;

  /**
   * 用户更改个人信息
   * @param personal_value 用户更改后的个人信息
   * @returns 发送文本消息内容到服务器操作是否完成的布尔值
   */
  abstract set_personal_value(
    changed_value: Partial<UserValue>,
  ): Promise<boolean>;
}
