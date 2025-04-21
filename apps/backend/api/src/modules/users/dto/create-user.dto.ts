import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name is required' })
  @MaxLength(100, { message: 'First name must not exceed 100 characters' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @MaxLength(100, { message: 'Last name must not exceed 100 characters' })
  lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100, { message: 'Password must not exceed 100 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password: string;
}