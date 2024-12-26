import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResgisterDto {
    
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  password: string;
}