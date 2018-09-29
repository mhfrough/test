import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProjectsComponent } from './components/project/projects/projects.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { TasksComponent } from './components/task/tasks/tasks.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TasksListComponent } from './components/task/tasks-list/tasks-list.component';
import { ReportComponent } from './components/report/report.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { DepartmentsComponent } from './components/department/departments/departments.component';
import { DesignationComponent } from './components/designation/designation.component';
import { CategoriesService } from './services/category/categories.service';
import { CategoryComponent } from './components/category/category.component';
import { EmployeesListComponent } from './components/employee/employees-list/employees-list.component';
import { SkillsComponent } from './components/skill/skills/skills.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'project/projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'project/project-details', component: ProjectDetailsComponent, canActivate: [AuthGuard] },
  { path: 'employee/employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'employee/employee-details/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'employee/employees-list', component: EmployeesListComponent, canActivate: [AuthGuard] },
  { path: 'task/tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'task/tasks-list', component: TasksListComponent, canActivate: [AuthGuard] },
  { path: 'task/task-details', component: TaskDetailsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'scheduler', component: SchedulerComponent, canActivate: [AuthGuard] },
  { path: 'department/departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'designation', component: DesignationComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'skill', component: SkillsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }