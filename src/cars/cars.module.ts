import { Module } from '@nestjs/common';
import { CarsService } from './service/car.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schemas/car.schema';
import { AuthModule } from '../users/auth.module';
import { CarsController } from './controller/car.controller';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]), AuthModule],
	providers: [CarsService],
	controllers: [CarsController]
})
export class CarsModule { }
