import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BaseUserResponse, User } from "../../src/entity/User";
import { Context } from "../types/context";
import { Throwable } from "../types/general";
import { encrypt } from "../utils/encrypt.utils";
import { handleError, handlePublicError } from "../utils/error.utils";

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    // @Query(() => [User])
    // async getAllUsers(): Promise<Throwable<User[]>> {
    //     try {
    //         return await User.find();
    //     } catch (err) {
    //         return handlePublicError(err, "GET ALL USERS");
    //     }
    // }

    // @Query(() => User, { nullable: true })
    // async getUserById(
    //     @Arg("id", () => Number) id: number
    // ): Promise<User> {
    //     try {
    //         return await User.findOne({
    //             where: {
    //                 id,
    //             },
    //         }) as User;
    //     } catch (err) {
    //         return handlePublicError(err, "GET USER BY ID");
    //     }
    // }

    @Mutation(() => Boolean)
    async register(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() context: Context,
    ): Promise<boolean> {
        try {
            await context.db.user.insertUser({
                email,
                password: await encrypt(password, 12),
            } as User);
            return true;
        } catch (err) {
            handleError(err);
            return false;
        }
    }
}