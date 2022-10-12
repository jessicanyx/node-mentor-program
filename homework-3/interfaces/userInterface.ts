export interface IUserInputDTO {
    login: string;
    password: string;
    age: number;
}

export interface User extends IUserInputDTO {
    id: string;
    isDeleted: boolean;
}
