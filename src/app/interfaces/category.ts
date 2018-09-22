export interface CatRequest {
    name: String,
    deptId: String
}

export interface CatUpdate {
    name: String,
    categoryId: String
}

export interface CatDelete {
    categoryId: String
}