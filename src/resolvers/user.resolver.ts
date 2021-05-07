import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../src/entity/User";
import { Context } from "../types/context";
import EncryptUtils, { encrypt } from "../utils/encrypt.utils";
import { handleError, throwErrorOnCondition } from "../utils/error.utils";

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @Query(() => [User])
    async getAllUsers(
        @Ctx() context: Context,
    ): Promise<User[]> {
        return await context.db.user.getAllUsers();
    }
    
    @Query(() => User, { nullable: true })
    async getUserById(
        @Ctx() context: Context,
        @Arg('id', () => Number) id: number,
    ): Promise<User> {
        return await context.db.user.getUserById(id) as User;
    }

    @Query(() => Boolean)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() context: Context,
    ): Promise<boolean> {
        const user = await context.db.user.getUserByEmail(email) as User;
        throwErrorOnCondition(!user, "Could not find user");

        return await EncryptUtils.compare(password, user.password);
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() context: Context,
    ): Promise<boolean> {
        try {
            await context.db.user.insertUser({
                email,
                password: await EncryptUtils.encrypt(password, 12),
            } as User);
            return true;
        } catch (err) {
            handleError(err);
            return false;
        }
    }
}