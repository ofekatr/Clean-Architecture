import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import EncryptLib from "../libs/encrypt.lib";
import JWTLib from "../libs/jwt.lib";
import logger from "../logger/logger";
import { isAuthMiddleware } from "../middlewares/auth.mid";
import { IGraphQLSContext } from "../types/context";
import { handleError, throwErrorOnCondition } from "../utils/error.utils";

@ObjectType()
class LoginResponse {
    @Field(() => String)
    accessToken: string;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @Query(() => String)
    @UseMiddleware(isAuthMiddleware)
    bye(
        @Ctx() context: IGraphQLSContext,
    ): string{
        return `${context.payload.userId}`;
    }

    @Query(() => [User])
    async getAllUsers(
        @Ctx() context: IGraphQLSContext,
    ): Promise<User[]> {
        return await context.db.user.getAllUsers();
    }

    @Query(() => User, { nullable: true })
    async getUserById(
        @Ctx() context: IGraphQLSContext,
        @Arg('id', () => Number) id: number,
    ): Promise<User> {
        return await context.db.user.getUserById(id) as User;
    }

    @Query(() => LoginResponse)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() { res, db }: IGraphQLSContext,
    ): Promise<LoginResponse> {
        const user = await db.user.getUserByEmail(email) as User;
        throwErrorOnCondition(!user, "Could not find user");

        const valid = await EncryptLib.compare(password, user.password);
        throwErrorOnCondition(!valid, "Failed to login");

        res.cookie('jid', JWTLib.generateRefreshToken(user), {
            httpOnly: true,
        })
        return {
            accessToken: JWTLib.generateAccessToken(user),
        }
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() context: IGraphQLSContext,
    ): Promise<boolean> {
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
}