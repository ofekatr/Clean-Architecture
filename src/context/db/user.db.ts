import { User } from "../../entity/User";
import { UserDAL } from "../../types/database";

const userDalFactory = () => {
    const user: UserDAL = {
        insertUser: (user: User) => User.insert(user),
    };

    return user;
}

export default userDalFactory;