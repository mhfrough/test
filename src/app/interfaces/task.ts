export interface TaskReq {
    projId,
    name,
    description,
    estimated_time,
    priority,
    required_skills
}

export interface TaskUpd {

}

export interface TaskDel {
    taskId
}