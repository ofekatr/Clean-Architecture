import { User } from "../entity/User";

export interface UserDAL {
    insertUser: (user: User) => Promise<any>;
}

export interface DAO {
    user: UserDAL;
}