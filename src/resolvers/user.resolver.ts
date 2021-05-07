import { User } from "src/entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcrypt";

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @Mutation()
    async register(
        @Arg('email', () => String) email: string
        @Arg('password', () => String) password: string
    ): Promise<void> {
        await User.insert({
            email,
            password: await UserResolver.hashPassword(password),
        });
        return;
    }

    static hashPassword = async (password: string) => bcrypt.hash(password, 12);
}