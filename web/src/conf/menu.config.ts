import {BaseMenu} from '../entity/base-menu';

/**
 * 菜单配置
 */
export const menus: Array<BaseMenu> = [
  {
    name: '首页',
    url: 'dashboard',
    icon: 'fas fa-tachometer-alt',
    defaultShow: true,
  },
  {
    name: '项目管理',
    url: 'project',
    icon: '',
    defaultShow: true,
  },
  {
    name: '用户管理',
    url: 'users',
    icon: '',
    defaultShow: true,
  },
  {
    name: '个人中心',
    url: 'personal',
    icon: '',
    defaultShow: true,
  },
];
