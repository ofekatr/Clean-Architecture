import { User } from "../entity/User";

export interface UserDAL {
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserById(id: number): Promise<User | undefined>;
    getAllUsers: () => Promise<User[]>;
    insertUser: (user: User) => Promise<any>;
}

export interface DAO {
    user: UserDAL;
}