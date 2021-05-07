import { User } from "../entity/User";

export interface UserDAL {
    getUserById(id: number): Promise<User | undefined>;
    getAllUsers: () => Promise<User[]>;
    insertUser: (user: User) => Promise<any>;
}

export interface DAO {
    user: UserDAL;
}