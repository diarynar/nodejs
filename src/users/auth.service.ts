import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { IUser } from './interfaces/user.interface';
import { LoginDto } from './dto/loginDto.dto';
import { ResetPasswordDto } from './dto/resetPasswordDto.dto';

@Injectable()
export class AuthService {
	constructor(@InjectModel('User') private userModel: Model<IUser>, private jwtService: JwtService) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
		const { password } = authCredentialsDto;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new this.userModel({ ...authCredentialsDto, password: hashedPassword });
		try {
			return await user.save();
		} catch (error) {
			if (error.code === 11000) {
				throw new ConflictException('User already exists');
			}
			throw error;
		}
	}

	async signIn(user: LoginDto) {
		const { _id, firstName, lastName } = await this.findByEmail(user.email);
		const access_token = this.jwtService.sign({ ...user, _id, firstName, lastName });
		const data = {
			access_token,
			expiresIn: process.env.EXPIRESIN
		};
		return data;
	}

	async findByEmail(email: string) {
		const user = await this.userModel.findOne({ email });
		if (!user) {
			return null;
		}
		return user;
	}

	async resetPassword(resetData: ResetPasswordDto) {
		const user = await this.findByEmail(resetData.email);
		if (!user) {
			return null;
		}
		const valid = await bcrypt.compare(resetData.oldPassword, user.password);
		try {
			if (!valid) {
				return 'Old password not match !';
			}
			const hashedPassword = await bcrypt.hash(resetData.newPassword, 10);
			await this.userModel.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
			return 'Password updated successfully !';
		} catch (error) {
			throw error;
		}
	}

	async validateUser(email: string, pass: string): Promise<IUser> {
		const user = await this.findByEmail(email);
		if (!user) {
			return null;
		}
		const valid = await bcrypt.compare(pass, user.password);
		if (valid) {
			return user;
		}
		return null;
	}
}
