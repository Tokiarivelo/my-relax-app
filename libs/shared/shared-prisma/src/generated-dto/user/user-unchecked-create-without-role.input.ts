import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-unchecked-create-nested-many-without-user.input';
import { UserImageUncheckedCreateNestedManyWithoutUserInput } from '../user-image/user-image-unchecked-create-nested-many-without-user.input';
import { ReservationUncheckedCreateNestedManyWithoutUserInput } from '../reservation/reservation-unchecked-create-nested-many-without-user.input';
import { ReviewUncheckedCreateNestedManyWithoutUserInput } from '../review/review-unchecked-create-nested-many-without-user.input';
import { PaymentUncheckedCreateNestedManyWithoutUserInput } from '../payment/payment-unchecked-create-nested-many-without-user.input';
import { PlaceUncheckedCreateNestedManyWithoutProviderInput } from '../place/place-unchecked-create-nested-many-without-provider.input';

@InputType()
export class UserUncheckedCreateWithoutRoleInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    firstName!: string;

    @Field(() => String, {nullable:true})
    lastName?: string;

    @Field(() => String, {nullable:true})
    phone?: string;

    @Field(() => String, {nullable:false})
    username!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: UserImageUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => ReservationUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    reservations?: ReservationUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => ReviewUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => PaymentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => PlaceUncheckedCreateNestedManyWithoutProviderInput, {nullable:true})
    Place?: PlaceUncheckedCreateNestedManyWithoutProviderInput;
}
