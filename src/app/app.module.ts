import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule, AccordionModule, TabsModule, AlertModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { ProjectsComponent } from './components/project/projects/projects.component';
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { TasksComponent } from './components/task/tasks/tasks.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';
import { NavbarComponent } from './components/widgets/navbar/navbar.component';
import { FooterComponent } from './components/widgets/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TasksListComponent } from './components/task/tasks-list/tasks-list.component';
import { ReportComponent } from './components/report/report.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { DepartmentsComponent } from './components/department/departments/departments.component';
import { LoadingComponent } from './components/widgets/loading/loading.component';
import { DesignationComponent } from './components/designation/designation.component';
import { CategoryComponent } from './components/category/category.component';
import { SkillsComponent } from './components/skill/skills/skills.component';
import { EmployeesListComponent } from './components/employee/employees-list/employees-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProjectDetailsComponent,
    ProjectsComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    TasksComponent,
    TaskDetailsComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    ProfileComponent,
    TasksListComponent,
    ReportComponent,
    SchedulerComponent,
    DepartmentsComponent,
    LoadingComponent,
    DesignationComponent,
    CategoryComponent,
    SkillsComponent,
    EmployeesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
