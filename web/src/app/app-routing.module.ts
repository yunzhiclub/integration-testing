import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LayoutComponent} from "./part/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          title: '首页'
        }
      },
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
      },
      {
        path: 'testCase',
        loadChildren: () => import('./test-case/test-case.module').then(m => m.TestCaseModule),
      },
      {
        path: 'testCase/:projectId',
        loadChildren: () => import('./test-case/test-case.module').then(m => m.TestCaseModule),
      },
      {
        path: 'testPlan',
        loadChildren: () => import('./test-plan/test-plan.module').then(m => m.TestPlanModule),
      },
      {
        path: 'test',
        loadChildren: () => import('./test/test.module').then(m => m.TestModule),
      },
      {
        path: 'testAdmin',
        loadChildren: () => import('./test-admin/test-admin.module').then(m => m.TestAdminModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        path: 'personal',
        loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule),
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
