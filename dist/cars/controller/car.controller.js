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
exports.CarsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
const car_service_1 = require("../service/car.service");
const car_dto_1 = require("../dto/car.dto");
const jwt_auth_guard_1 = require("../../users/guards/jwt-auth.guard");
let CarsController = class CarsController {
    constructor(carsService) {
        this.carsService = carsService;
    }
    async addCar(res, createCarDTO, cover, req) {
        const mimetypeImage = [
            'image/gif',
            'image/png',
            'image/jpeg',
            'image/bmp',
            'image/webp',
        ];
        if (mimetypeImage.includes(cover.mimetype)) {
            if (cover.size < 1502350) {
                const imageToBase64 = Buffer.from(cover.buffer).toString('base64');
                const coverData = `data:${cover.mimetype};base64,${imageToBase64}`;
                const result = await this.carsService.createCar(Object.assign(Object.assign({}, createCarDTO), { owner: req.user._id, cover: coverData }));
                return res.status(common_1.HttpStatus.OK).json(result);
            }
            else {
                return res
                    .status(common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .json({ message: 'image trop grand.' });
            }
        }
        else {
            return res
                .status(common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                .json({ message: 'file not image.' });
        }
    }
    async findAll(res) {
        const result = await this.carsService.findAllCar();
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async findById(id, res) {
        const result = await this.carsService.findCarById(id);
        if (!result)
            throw new common_1.NotFoundException('Id does not exist!');
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async updateCar(res, id, updateCarDTO, cover) {
        const mimetypeImage = [
            'image/gif',
            'image/png',
            'image/jpeg',
            'image/bmp',
            'image/webp',
        ];
        if (cover && mimetypeImage.includes(cover.mimetype)) {
            if (cover.size < 1502350) {
                const imageToBase64 = Buffer.from(cover.buffer).toString('base64');
                const coverData = `data:${cover.mimetype};base64,${imageToBase64}`;
                const carResult = await this.carsService.update(id, Object.assign(Object.assign({}, updateCarDTO), { cover: coverData }));
                return res.status(common_1.HttpStatus.OK).json(carResult);
            }
            else {
                return res
                    .status(common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .json({ message: 'image trop grand.' });
            }
        }
        else if (!cover) {
            const carResult = await this.carsService.update(id, updateCarDTO);
            return res.status(common_1.HttpStatus.OK).json(carResult);
        }
        else {
            return res
                .status(common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                .json({ message: 'file not image.' });
        }
    }
    async delete(CarId, res) {
        const result = await this.carsService.deleteCar(CarId);
        if (!result)
            throw new common_1.NotFoundException('Post does not exist');
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Post has been deleted', result });
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('cover')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.Post('/create'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body(common_2.ValidationPipe)),
    __param(2, common_1.UploadedFile()),
    __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, car_dto_1.CreateCarDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "addCar", null);
__decorate([
    common_1.Get('all'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "findAll", null);
__decorate([
    common_1.Get('/:id'),
    swagger_1.ApiParam({ name: 'id', required: true }),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "findById", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('cover')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.Put('/:id'),
    swagger_1.ApiParam({ name: 'id', required: true }),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body(common_2.ValidationPipe)),
    __param(3, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, car_dto_1.UpdateCarDto, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "updateCar", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/:id'),
    swagger_1.ApiParam({ name: 'id', required: true }),
    __param(0, common_1.Param('id')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "delete", null);
CarsController = __decorate([
    swagger_1.ApiTags('cars'),
    common_1.Controller('cars'),
    __metadata("design:paramtypes", [car_service_1.CarsService])
], CarsController);
exports.CarsController = CarsController;
//# sourceMappingURL=car.controller.js.map