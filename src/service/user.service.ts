import { User } from "../entity/User";
import EncryptLib from "../lib/encrypt.lib";
import JWTLib from "../lib/jwt.lib";
import { IBaseContext, IPayload } from "../type/context";
import { handleError, throwErrorOnCondition } from "../util/error.utils";

const getAllUsers = (context: IBaseContext): Promise<User[]> => context.db.user.getAllUsers();

const getUserById = (context: IBaseContext, id: number): Promise<User | undefined> => context.db.user.getUserById(id);

const login = async (context: IBaseContext, email: string, password: string): Promise<User> => {
    const user = await context.db.user.getUserByEmail(email) as User;
    throwErrorOnCondition(!user, "Could not find user");

    const valid = await EncryptLib.compare(password, user.password);
    throwErrorOnCondition(!valid, "Failed to login");

    return user;
}

const insertUser = async (context: IBaseContext, email: string, password: string): Promise<boolean> => {
    try {
        await context.db.user.insertUser({
            email,
            password: await EncryptLib.encrypt(password, 12),
        } as User);
        return true;
    } catch (err) {
        handleError(err);
        return false;
    }
}

const UserService = {
    getAllUsers,
    getUserById,
    login,
    insertUser,
};

export {
    getAllUsers,
    getUserById,
    login,
    insertUser,
};

export default UserService;