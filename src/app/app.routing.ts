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

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'project/projects', component: ProjectsComponent },
  { path: 'project/project-details', component: ProjectDetailsComponent },
  { path: 'employee/employees', component: EmployeesComponent},
  { path: 'employee/employee-details/:id', component: EmployeeDetailsComponent },
  { path: 'task/tasks', component: TasksComponent },
  { path: 'task/tasks-list', component: TasksListComponent},
  { path: 'task/task-details', component: TaskDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'report', component: ReportComponent },
  { path: 'scheduler', component: SchedulerComponent },
  { path: 'department/departments', component: DepartmentsComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }