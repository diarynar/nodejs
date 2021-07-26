import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { IUser } from './interfaces/user.interface';
import { LoginDto } from './dto/loginDto.dto';
import { ResetPasswordDto } from './dto/resetPasswordDto.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<IUser>, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<any>;
    signIn(user: LoginDto): Promise<{
        access_token: string;
        expiresIn: string;
    }>;
    findByEmail(email: string): Promise<IUser>;
    resetPassword(resetData: ResetPasswordDto): Promise<"Old password not match !" | "Password updated successfully !">;
    validateUser(email: string, pass: string): Promise<IUser>;
}
