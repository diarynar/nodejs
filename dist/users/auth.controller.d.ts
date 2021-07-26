import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginDto } from './dto/loginDto.dto';
import { ResetPasswordDto } from './dto/resetPasswordDto.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<any>;
    signIn(authCredentialsDto: LoginDto): Promise<{
        access_token: string;
        expiresIn: string;
    }>;
    getMe(req: any): any;
    onResetPassword(resetData: ResetPasswordDto): Promise<"Old password not match !" | "Password updated successfully !">;
}
