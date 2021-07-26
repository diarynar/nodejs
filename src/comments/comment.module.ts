import { Module } from '@nestjs/common';
import { CommentsService } from './service/comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { AuthModule } from '../users/auth.module';
import { CommentController } from './controller/comment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    AuthModule,
  ],
  providers: [CommentsService],
  controllers: [CommentController],
})
export class CommentsModule {}
