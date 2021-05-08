import { User } from "../../entity/User";
import { UserDAL } from "../../type/database";

const userDalFactory = () => {
    const user: UserDAL = {
        insertUser: (user: User) => User.insert(user),

        getAllUsers: () => User.find(),

        getUserById: (id: number) => User.findOne({ id }),

        getUserByEmail: (email: string) => User.findOne({ email }),
    };

    return user;
}

export default userDalFactory;