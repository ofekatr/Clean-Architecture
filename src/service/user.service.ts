import { User } from "../entity/User";
import EncryptLib from "../lib/encrypt.lib";
import { ServiceContext } from "../type/context";
import { IUserService } from "../type/services";
import { handleError, throwErrorOnCondition } from "../util/error.utils";

const userServiceFactory = (context: ServiceContext): IUserService => {
    const getAllUsers = (): Promise<User[]> => context.db.user.getAllUsers();

    const getUserById = (id: number): Promise<User | undefined> => context.db.user.getUserById(id);

    const login = async (email: string, password: string): Promise<User> => {
        const user = await context.db.user.getUserByEmail(email) as User;
        throwErrorOnCondition(!user, "Could not find user");

        const valid = await EncryptLib.compare(password, user.password);
        throwErrorOnCondition(!valid, "Failed to login");

        return user;
    }

    const insertUser = async (email: string, password: string): Promise<boolean> => {
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
    }

    return UserService;
}

export default userServiceFactory;