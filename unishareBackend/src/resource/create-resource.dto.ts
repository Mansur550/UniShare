import {
    IsString,
    IsNotEmpty,
    IsArray,
    IsOptional,
    //IsUrl,
    MaxLength,
    MinLength,
    IsEnum,
} from 'class-validator';

export class CreateResourceDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(200, { message: 'Title must be at most 200 characters long' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Description is required' })
    @MinLength(10, { message: 'Description must be at least 10 characters long' })
    description: string;

    @IsString()
    @IsNotEmpty({ message: 'Category is required' })
    category: string;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsString()
    @IsNotEmpty({ message: 'File URL is required' })
    fileUrl: string;

    @IsString()
    @IsOptional()
    fileName?: string;

    @IsString()
    @IsOptional()
    fileType?: string;

    @IsOptional()
    fileSize?: number;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsOptional()
    @IsEnum(['pending', 'approved', 'rejected', 'under_review'])
    moderationStatus?: 'pending' | 'approved' | 'rejected' | 'under_review';

    @IsOptional()
    @IsString()
    moderatorFeedback?: string;

    @IsOptional()
    isPublished?: boolean;
}