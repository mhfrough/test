export interface EmpRequest {
    name: String,
    email: String,
    password: String,
    deviceType: String,
    deviceToken: String,
    deptId: String,
    mgr: String,
    roleId: String,
    designationId: String
}

export interface EmpUpdate {
    userId: String,
    name: String,
    email: String,
    deptId: String,
    password: String,
    mgr: String
}

export interface EmpDelete {
    userId: String    
}

// Update Employee Designation
export interface empDesigUpdate {
    userId: String,
    designationId: String
}