import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly price: number;
  @ApiProperty() readonly mark: string;
  @ApiProperty() readonly description: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  cover: any;
  readonly owner: string;
  readonly publicationDate: Date;
}

export class UpdateCarDto {
  @ApiProperty() readonly price: number;
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly mark: string;
  @ApiProperty() readonly description: string;
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  cover: any;
  readonly owner: string;
  readonly publicationDate: Date;
}
