import { User } from "../../entity/User";
import { UserDAL } from "../../types/database";

const userDalFactory = () => {
    const user: UserDAL = {
        insertUser: (user: User) => User.insert(user),

        getAllUsers: () => User.find(),

        getUserById: (id: number) => User.findOne({ id }),
    };

    return user;
}

export default userDalFactory;