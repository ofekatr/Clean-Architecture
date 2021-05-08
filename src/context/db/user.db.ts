import { User } from "../../entity/User";
import { UserDAL } from "../../type/database";

const userDalFactory = () => {
    const user: UserDAL = {
        insertUser: (user: User) => User.insert(user),

        getAllUsers: () => User.find(),

        getUserById: (userId: number) => User.findOne({ id: userId }),

        getUserByEmail: (email: string) => User.findOne({ email }),

        incrementRefreshTokenVersion: (userId: number) =>
            User.getRepository()
                .increment({ id: userId }, "refreshTokenVersion", 1),
    };

    return user;
}

export default userDalFactory;