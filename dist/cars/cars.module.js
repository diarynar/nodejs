"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsModule = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("./service/car.service");
const mongoose_1 = require("@nestjs/mongoose");
const car_schema_1 = require("./schemas/car.schema");
const auth_module_1 = require("../users/auth.module");
const car_controller_1 = require("./controller/car.controller");
let CarsModule = class CarsModule {
};
CarsModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Car', schema: car_schema_1.CarSchema }]), auth_module_1.AuthModule],
        providers: [car_service_1.CarsService],
        controllers: [car_controller_1.CarsController]
    })
], CarsModule);
exports.CarsModule = CarsModule;
//# sourceMappingURL=cars.module.js.map