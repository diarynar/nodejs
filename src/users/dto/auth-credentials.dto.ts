import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
	@ApiProperty() firstName: string;
	@ApiProperty() lastName: string;
	@ApiProperty({
		uniqueItems: true
	})
	@IsEmail()
	email: string;
	@ApiProperty()
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: `8 characters including at least 1 uppercase, 1 lowercase and 1 special character including numbers`
	})
	@MinLength(8, { message: 'Password is too short (8 characters min)' })
	@MaxLength(20, { message: 'Password is too long (20 characters max)' })
	password: string;
}
