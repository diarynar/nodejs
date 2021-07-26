import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  NotFoundException,
  Put,
  Delete,
  Response,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import { CarsService } from '../service/car.service';
import { CreateCarDto, UpdateCarDto } from '../dto/car.dto';
import { JwtAuthGuard } from '../../users/guards/jwt-auth.guard';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('cover'))
  @ApiConsumes('multipart/form-data')
  @Post('/create')
  async addCar(
    @Res() res,
    @Body(ValidationPipe) createCarDTO: CreateCarDto,
    @UploadedFile() cover,
    @Req() req,
  ) {
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
        const result = await this.carsService.createCar({
          ...createCarDTO,
          owner: req.user._id,
          cover: coverData,
        });
        return res.status(HttpStatus.OK).json(result);
      } else {
        return res
          .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
          .json({ message: 'image trop grand.' });
      }
    } else {
      return res
        .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
        .json({ message: 'file not image.' });
    }
  }

  @Get('all')
  async findAll(@Res() res) {
    const result = await this.carsService.findAllCar();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  async findById(@Param('id') id, @Res() res) {
    const result = await this.carsService.findCarById(id);
    if (!result) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('cover'))
  @ApiConsumes('multipart/form-data')
  @Put('/:id')
  @ApiParam({ name: 'id', required: true })
  async updateCar(
    @Res() res,
    @Param('id') id,
    @Body(ValidationPipe) updateCarDTO: UpdateCarDto,
    @UploadedFile() cover,
  ) {
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
        const carResult = await this.carsService.update(id, {
          ...updateCarDTO,
          cover: coverData,
        });
        return res.status(HttpStatus.OK).json(carResult);
      } else {
        return res
          .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
          .json({ message: 'image trop grand.' });
      }
    } else if (!cover) {
      const carResult = await this.carsService.update(id, updateCarDTO);
      return res.status(HttpStatus.OK).json(carResult);
    } else {
      return res
        .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
        .json({ message: 'file not image.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiParam({ name: 'id', required: true })
  async delete(@Param('id') CarId, @Response() res) {
    const result = await this.carsService.deleteCar(CarId);
    if (!result) throw new NotFoundException('Post does not exist');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Post has been deleted', result });
  }
}
