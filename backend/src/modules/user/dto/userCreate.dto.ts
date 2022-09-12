import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import constants from 'src/config/constants';
import { UserAddressDto } from './userAddress.dto';

export class UserCreateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Name default data perfil',
    example: 'Jonata',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email default login',
    example: 'jonata@gmail.com',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Phone default user',
    example: '(35)9.9743-3853',
  })
  @Length(constants.NUMBER_MIN_PHONE)
  @IsString()
  phone_user: string;

  @ApiProperty({
    description: 'Data born',
    example: '2022-08-13T16:05:29.000Z',
  })
  @IsString()
  dateborn: string;

  @ApiProperty({
    description: 'Type gender',
    example: 'male',
  })
  @IsString()
  radiogender: string;

  @ApiProperty({
    description: 'Id Company user',
    example: '1e4cce9e-82bb-4f7c-81ff-4d0fd1bda312',
  })
  @IsNotEmpty()
  company_id_user: string;

  @IsOptional()
  address: UserAddressDto[];
}
