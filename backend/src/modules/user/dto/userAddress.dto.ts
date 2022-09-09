import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
  } from 'class-validator';
import constants from 'src/config/constants';

export class UserAddressDto {

    @ApiProperty({
      description:'CEP - city',
      example: '37589-000'
    })
    @Length(constants.STRING_MIN, constants.STRING_MAX)
    @IsString()
    cep: string;

    @ApiProperty({
      description:'Adrees default',
      example: 'Rua vitor coutinho'
    })
    @Length(constants.STRING_MIN, constants.STRING_MAX)
    @IsString()
    adrees: string;

    @ApiProperty({
      description:'Number',
      example: '1234'
    })
    @Length(constants.NUMBER_MIN_PHONE)
    @IsString()
    number_end: string;
    
    @ApiProperty({
      description:'State',
      example: 'MG'
    })
    @IsString()
    state: string;

    @ApiProperty({
      description:'Cities',
      example: 'Silvianópolis'
    })
    @IsString()
    city: string;

    @ApiProperty({
    })
    @IsString()
    @IsOptional()
    user_id: string;

    @ApiProperty({
    })
    @IsString()
    @IsOptional()
    company_id_address: string;

}
