import bcrypt from "bcrypt";
import { handlePublicError } from "src/utils/error-utils";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../src/entity/User";

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @Query(() => User)
    async getUserById(
        @Arg("id", () => ID) id: number
    ): Promise<User | undefined> {
        try {
            return await User.findOne({
                where: {
                    id,
                },
            });
        } catch (err) {
            return handlePublicError(err, "GET USER BY ID");
        }
    }

    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        try {
            return await User.find();
        } catch (err) {
            return handlePublicError(err, "GET ALL USERS");
        }
    }

    @Mutation(() => User)
    async register(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string
    ): Promise<User> {
        try {
            const { raw } = await User.insert({
                email,
                password: await UserResolver.hashPassword(password),
            });
            
            return raw;
        } catch (err) {
            return handlePublicError(err, "REGISTER USER");
        }
    }

    static hashPassword = async (password: string) => bcrypt.hash(password, 12);
}