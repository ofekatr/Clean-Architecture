import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import JWTLib, { verifyAccessToken } from "../lib/jwt.lib";
import { extractRefreshTokenFromAuthorizationHeader, getAutorizationHeaderFromRequest, isAuthMiddleware, attachRefreshTokenCookie } from "../middleware/graphql/auth.mid";
import { IGraphQLContext } from "../type/context";
import { IUserService } from "../type/services";
import { handleError, throwErrorOnCondition } from "../util/error.utils";

@ObjectType()
class LoginResponse {
    @Field(() => String)
    accessToken: string;
    @Field(() => User)
    user: User;
}

@Resolver()
export class UserResolver {
    static userService: IUserService;

    @Query(() => User, { nullable: true })
    async me(
        @Ctx() context: IGraphQLContext,
    ): Promise<User | undefined> {
        try {
            const authorizationHeader = getAutorizationHeaderFromRequest(context.req) as string;
            throwErrorOnCondition(
                !authorizationHeader,
                "Missing authorization header",
            );

            const refreshToken = extractRefreshTokenFromAuthorizationHeader(authorizationHeader);
            throwErrorOnCondition(!refreshToken,
                "Failed to extract refresh token from authorization header");

            const payload = verifyAccessToken(refreshToken);
            throwErrorOnCondition(!payload,
                "Failed to verify refresh token");

            context.payload = payload;
            return await context.services.userService
                .getUserById(payload.userId);
        } catch (err) {
            handleError(err);
            return undefined;
        }
    }

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

        attachRefreshTokenCookie(context.res, user);

        return {
            accessToken: JWTLib.generateAccessToken(user),
            user,
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

    @Mutation(() => Boolean)
    logout(
        @Ctx() context: IGraphQLContext,
    ): boolean {
        try {
            context.res.clearCookie('jid');
            return true;
        } catch (error) {
            return false;
        }
    }
}