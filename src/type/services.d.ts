import { User } from "../entity/User";

export interface IUserService {
    getAllUsers: () => Promise<User[]>;
    getUserById: (id: number) => Promise<User | undefined>;
    login: (email: string, password: string) => Promise<User>;
    insertUser: (email: string, password: string) => Promise<boolean>;
}

export interface IServices {
    userService: IUserService;
}