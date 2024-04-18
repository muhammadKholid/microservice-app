import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsUUID } from "class-validator"

export class CreateOrdermDto {
    @IsUUID()
    @IsString()
    @ApiProperty({ required: true })
    userId: string

    @IsUUID()
    @IsString()
    @ApiProperty({ required: true })
    productId: string

    @IsNumber()
    @ApiProperty({ default: 0, required: true })
    total: number
}
