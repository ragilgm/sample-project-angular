export interface UserModel {
    id:number
    name:string
    email:string
}

export interface UserRequestModel {
    name?:string
    email?:string
}