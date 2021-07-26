import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICar } from '../interfaces/car.interface';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private carModel: Model<ICar>) {}

  async createCar(carDto: any): Promise<ICar> {
    const newCar = new this.carModel(carDto);
    return await newCar.save();
  }

  async findCarById(CarId: string): Promise<ICar> {
    return await this.carModel.findById(CarId).exec();
  }

  async update(id, CarDto: any): Promise<ICar> {
    return await this.carModel.findByIdAndUpdate(id, { ...CarDto });
  }

  async findAllCar(): Promise<ICar[]> {
    return await this.carModel.find().exec();
  }

  async deleteCar(id): Promise<any> {
    return await this.carModel.findByIdAndRemove(id);
  }
}
