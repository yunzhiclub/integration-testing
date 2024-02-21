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
    role: ['role_user', 'role_admin']
  },
  {
    name: '项目管理',
    url: 'project',
    icon: 'bi bi-kanban',
    defaultShow: true,
    role: ['role_user', 'role_admin']
  },
  {
    name: '测试用例',
    url: 'testCase',
    icon: 'bi bi-clipboard-check',
    defaultShow: true,
    role: ['role_user', 'role_admin']
  },
  {
    name: '测试计划',
    url: 'testPlan',
    icon: 'bi bi-list-check',
    defaultShow: true,
    role: ['role_user', 'role_admin']
  },
  {
    name: '测试管理(user)',
    url: 'test',
    icon: 'bi bi-box-fill',
    defaultShow: true,
    role: ['role_user']
  },
  {
    name: '测试管理(admin)',
    url: 'testAdmin',
    icon: 'bi bi-box-fill',
    defaultShow: true,
    role: ['role_admin']
  },
  {
    name: '用户管理',
    url: 'user',
    icon: 'bi bi-people',
    defaultShow: true,
    role: ['role_admin']
  },
  {
    name: '个人中心',
    url: 'personal',
    icon: 'bi bi-person-circle',
    defaultShow: true,
    role: ['role_user', 'role_admin']
  },
];
