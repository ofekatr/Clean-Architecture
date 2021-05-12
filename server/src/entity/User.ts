import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    email: string;

    @Column()
    password: string;

    @Field(() => Int)
    @Column("int", { default: 0 })
    refreshTokenVersion: number;
}

@ObjectType()
export class BaseGraphQLError {
    message?: string;
    code?: string;
}