import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/loginDto.dto';
import { ResetPasswordDto } from './dto/resetPasswordDto.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Post('/signup')
	async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
		return await this.authService.signUp(authCredentialsDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('/signin')
	async signIn(@Body() authCredentialsDto: LoginDto) {
		return this.authService.signIn(authCredentialsDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('/me')
	getMe(@Request() req) {
		return req.user;
	}

	@Post('/reset-password')
	async onResetPassword(@Body() resetData: ResetPasswordDto) {
		return this.authService.resetPassword(resetData);
	}
}
