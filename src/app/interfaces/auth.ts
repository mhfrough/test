// Login Service and Component

export interface LoginRequest {
    email: String,
    password: String,
    deviceType: String,
    deviceToken: String
}

// Register Service and Component

export interface RegisterRequest {
    name: String,
    email: String,
    domain: String,
    password: String,
    deviceType: String,
    deviceToken: String
}