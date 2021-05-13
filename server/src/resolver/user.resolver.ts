import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import JWTLib from "../lib/jwt.lib";
import { isAuthMiddleware } from "../middleware/graphql/auth.mid";
import { IGraphQLContext } from "../type/context";
import { IUserService } from "../type/services";
import { handleError } from "../util/error.utils";

@ObjectType()
class LoginResponse {
    @Field(() => String)
    accessToken: string;
}

@Resolver()
export class UserResolver {
    static userService: IUserService;

    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @Query(() => String)
    @UseMiddleware(isAuthMiddleware)
    bye(
        @Ctx() context: IGraphQLContext,
    ): string {
        return `${context.payload.userId}`;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(
        @Arg("userId", () => Int) userId: number,
        @Ctx() context: IGraphQLContext,
    ): Promise<boolean> {
        try {
            await context.services.userService.incrementRefreshTokenVersion(userId);
            return true;
        } catch (err) {
            handleError(err);
            return false;
        }
    }

    @Query(() => [User])
    getAllUsers(
        @Ctx() context: IGraphQLContext,
    ): Promise<User[]> {
        return context.services.userService.getAllUsers();
    }

    @Query(() => User, { nullable: true })
    async getUserById(
        @Ctx() context: IGraphQLContext,
        @Arg("id", () => Number) id: number,
    ): Promise<User> {
        return context.services.userService.getUserById(id) as Promise<User>;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string,
        @Ctx() context: IGraphQLContext,
    ): Promise<LoginResponse> {
        const user = await context.services.userService.login(email, password);

        context.res.cookie("jid", JWTLib.generateRefreshToken(user), {
            httpOnly: true,
        })

        return {
            accessToken: JWTLib.generateAccessToken(user),
        }
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string,
        @Ctx() context: IGraphQLContext,
    ): Promise<boolean> {
        return context.services.userService.insertUser(email, password);
    }
}