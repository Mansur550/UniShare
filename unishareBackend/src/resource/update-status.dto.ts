
import { IsIn, IsOptional, IsString } from 'class-validator';


export const allowedStatuses = ['pending', 'approved', 'rejected', 'under_review'] as const;
export type ModerationStatus = typeof allowedStatuses[number];

export class UpdateStatusDto {
    @IsIn(allowedStatuses, { message: 'Status must be pending, approved, rejected, or under_review' })
    status: ModerationStatus;

    @IsOptional()
    @IsString()
    moderatorFeedback?: string;
}

