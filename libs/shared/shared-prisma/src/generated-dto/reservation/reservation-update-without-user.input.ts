import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { PlaceUpdateOneRequiredWithoutReservationsNestedInput } from '../place/place-update-one-required-without-reservations-nested.input';
import { PaymentUpdateOneWithoutReservationNestedInput } from '../payment/payment-update-one-without-reservation-nested.input';

@InputType()
export class ReservationUpdateWithoutUserInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    date?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => PlaceUpdateOneRequiredWithoutReservationsNestedInput, {nullable:true})
    place?: PlaceUpdateOneRequiredWithoutReservationsNestedInput;

    @Field(() => PaymentUpdateOneWithoutReservationNestedInput, {nullable:true})
    payment?: PaymentUpdateOneWithoutReservationNestedInput;
}
