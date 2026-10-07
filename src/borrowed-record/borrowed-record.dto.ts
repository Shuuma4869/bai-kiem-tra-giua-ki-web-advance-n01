import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export class BorrowBookDto {
  @IsInt()
  @Min(1)
  bookId: number;

  @IsInt()
  @Min(1)
  readerId: number;

  @IsOptional()
  @IsDateString()
  borrowDate?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
