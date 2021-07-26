import { ApiProperty } from '@nestjs/swagger';
import { Matches, MinLength, MaxLength } from 'class-validator';
export class ResetPasswordDto {
	@ApiProperty() email: string;
	@ApiProperty() oldPassword: string;
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: `8 characters including at least 1 uppercase, 1 lowercase and 1 special character including numbers`
	})
	@MinLength(8, { message: 'Password is too short (8 characters min)' })
	@MaxLength(20, { message: 'Password is too long (20 characters max)' })
	@ApiProperty()
	newPassword: string;
}
