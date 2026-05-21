import {
    Controller,
    Post,
    Get,
    Param,
    Delete,
    Body,
    Patch,
    BadRequestException,
} from '@nestjs/common';
import { CreateResourceDto } from './create-resource.dto';
import { Resource } from './resource.entity';
import { ResourceService } from './resource.service';
import { ModerationStatus, UpdateStatusDto } from './update-status.dto';

@Controller('resources')
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) { }

    @Post('create')
    async create(
        @Body() createResourceDto: CreateResourceDto,
    ): Promise<Resource> {
        return this.resourceService.create(createResourceDto);
    }

    @Get()
    async findAll(): Promise<Resource[]> {
        return this.resourceService.findAll();
    }

    @Get('byid/:id')
    async findOne(@Param('id') id: string): Promise<Resource> {
        return this.resourceService.findOne(id);
    }

    // @Delete(':id/')
    // async remove(@Param('id') id: string) {
    //     return this.resourceService.remove(id);
    // }
    //view pending resource
    @Get('pending')
    async getPendingResources(): Promise<Resource[]> {
        return this.resourceService.getPendingResources();
    }


    // PATCH /moderator/resource/:id/approved
    // @Patch('update/:id/status')
    // async updateStatus(
    //     @Param('id') id: string,
    //     @Body()
    //     body: {
    //         status: 'pending' | 'approved' | 'rejected' | 'under_review';
    //         moderatorFeedback?: string;
    //     },
    // ): Promise<Resource> {
    //     const { status, moderatorFeedback } = body;
    //     return this.resourceService.updateStatus(
    //         id,
    //         status,
    //         moderatorFeedback,
    //     );
    // }
    @Patch('update/:id/status')
    async updateStatus(
        @Param('id') id: string,  //UUID from URL
        @Body() body: {
            status: string,
            moderatorFeedback?: string
        }
    ): Promise<Resource> {

        const { status, moderatorFeedback } = body;

        // Validate status
        const allowedStatuses: ModerationStatus[] = ['pending', 'approved', 'rejected', 'under_review'];
        if (!allowedStatuses.includes(status as ModerationStatus)) {
            throw new BadRequestException('Invalid moderation status');
        }


        return this.resourceService.updateStatus(
            id,
            status as ModerationStatus,
            moderatorFeedback
        );
    }






}
