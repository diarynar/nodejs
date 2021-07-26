import { Model } from 'mongoose';
import { ICar } from '../interfaces/car.interface';
export declare class CarsService {
    private carModel;
    constructor(carModel: Model<ICar>);
    createCar(carDto: any): Promise<ICar>;
    findCarById(CarId: string): Promise<ICar>;
    update(id: any, CarDto: any): Promise<ICar>;
    findAllCar(): Promise<ICar[]>;
    deleteCar(id: any): Promise<any>;
}
