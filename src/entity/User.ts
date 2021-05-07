import { createUnionType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}

@ObjectType()
export class BaseGraphQLError {
    message?: string;
    code?: string;
}

export const BaseUserResponse = createUnionType({
    name: "BaseUserResponse",
    types: () => [User, BaseGraphQLError],
})

export const BaseUsersResponse = createUnionType({
    name: "BaseUsersResponse",
    types: () => [User, BaseGraphQLError],
})