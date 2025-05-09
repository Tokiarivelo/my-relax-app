import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutReviewsInput } from '../user/user-create-nested-one-without-reviews.input';
import { PlaceCreateNestedOneWithoutReviewsInput } from '../place/place-create-nested-one-without-reviews.input';

@InputType()
export class ReviewCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    comment!: string;

    @Field(() => Int, {nullable:false})
    rating!: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutReviewsInput, {nullable:false})
    user!: UserCreateNestedOneWithoutReviewsInput;

    @Field(() => PlaceCreateNestedOneWithoutReviewsInput, {nullable:false})
    place!: PlaceCreateNestedOneWithoutReviewsInput;
}
