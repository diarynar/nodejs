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
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CommentsService } from '../service/comment.service';
import { CreateCommentDto } from '../dto/comment.dto';
import { JwtAuthGuard } from '../../users/guards/jwt-auth.guard';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addComment(
    @Res() res,
    @Body(ValidationPipe) createCommentDTO: CreateCommentDto,
    @Req() req,
  ) {
    const result = await this.commentsService.createComment({
      ...createCommentDTO,
      authorId: req.user._id,
    });
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('all')
  async findAll(@Res() res) {
    const comments = await this.commentsService.findAllComment();
    return res.status(HttpStatus.OK).json(comments);
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  async findById(@Param('id') id, @Res() res) {
    const result = await this.commentsService.findCommentById(id);
    if (!result) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiParam({ name: 'id', required: true })
  async updateComment(
    @Res() res,
    @Param('id') id,
    @Body(ValidationPipe) updateCommentDTO: CreateCommentDto,
  ) {
    const commentResult = await this.commentsService.update(
      id,
      updateCommentDTO,
    );
    return res.status(HttpStatus.OK).json(commentResult);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiParam({ name: 'id', required: true })
  async delete(@Param('id') commentId, @Response() res) {
    const result = await this.commentsService.deleteComment(commentId);
    if (!result) throw new NotFoundException('Post does not exist');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Post has been deleted', result });
  }
}
