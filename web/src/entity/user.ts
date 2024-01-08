
/**
 * 用户实体
 */
export interface User {
  id: number;
  name: string;
  username: string;
  password: string;

  /** 联系人电话号码 */
  contactPhone: string;
  /** 加密后的电话号码 */
  dirtyContactPhone: string;
  /**角色*/
  role: string;
}
