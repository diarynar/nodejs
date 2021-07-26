import { CarsService } from '../service/car.service';
import { CreateCarDto, UpdateCarDto } from '../dto/car.dto';
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    addCar(res: any, createCarDTO: CreateCarDto, cover: any, req: any): Promise<any>;
    findAll(res: any): Promise<any>;
    findById(id: any, res: any): Promise<any>;
    updateCar(res: any, id: any, updateCarDTO: UpdateCarDto, cover: any): Promise<any>;
    delete(CarId: any, res: any): Promise<any>;
}
