import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { ReservationOrderByWithRelationInput } from '../reservation/reservation-order-by-with-relation.input';
import { PaymentOrderByRelevanceInput } from './payment-order-by-relevance.input';

@InputType()
export class PaymentOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    reservationId?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    amount?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    method?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: UserOrderByWithRelationInput;

    @Field(() => ReservationOrderByWithRelationInput, {nullable:true})
    reservation?: ReservationOrderByWithRelationInput;

    @Field(() => PaymentOrderByRelevanceInput, {nullable:true})
    _relevance?: PaymentOrderByRelevanceInput;
}
