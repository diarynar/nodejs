"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto) {
        const { password } = authCredentialsDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel(Object.assign(Object.assign({}, authCredentialsDto), { password: hashedPassword }));
        try {
            return await user.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('User already exists');
            }
            throw error;
        }
    }
    async signIn(user) {
        const { _id, firstName, lastName } = await this.findByEmail(user.email);
        const access_token = this.jwtService.sign(Object.assign(Object.assign({}, user), { _id, firstName, lastName }));
        const data = {
            access_token,
            expiresIn: process.env.EXPIRESIN
        };
        return data;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return null;
        }
        return user;
    }
    async resetPassword(resetData) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async validateUser(email, pass) {
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
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map