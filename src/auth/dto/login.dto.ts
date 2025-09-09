import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto  {

  @ApiProperty({ description: 'User\'s email'})
  @IsEmail({},{message: 'Email not valid'})
  @IsNotEmpty({message: 'Email is required'})
  email:string
   
  @ApiProperty({ description: 'Password'})
  @IsString({message: 'Password must be a string'})
  @IsNotEmpty({message: 'Password is required'})
  password:string

}
