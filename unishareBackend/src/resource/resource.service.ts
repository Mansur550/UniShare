import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';
import { CreateResourceDto } from './create-resource.dto';
import { ModerationStatus } from './update-status.dto';

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(Resource)
        private readonly resourceRepository: Repository<Resource>,
    ) { }

    async create(createResourceDto: CreateResourceDto): Promise<Resource> {
        const resource = this.resourceRepository.create(createResourceDto);
        return this.resourceRepository.save(resource);
    }

    async findAll(): Promise<Resource[]> {
        return this.resourceRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Resource> {
        const resource = await this.resourceRepository.findOne({
            where: { id },
        });

        if (!resource) {
            throw new NotFoundException('Resource not found');
        }

        return resource;
    }

    async remove(id: string): Promise<{ message: string }> {
        const result = await this.resourceRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Resource not found');
        }

        return { message: 'Resource deleted successfully' };
    }


    // get all pending resource

    async getPendingResources(): Promise<Resource[]> {
        return this.resourceRepository.find({
            where: { moderationStatus: 'pending' },
            order: { createdAt: 'DESC' },
        });
    }


    // update pending resource status
    // async updateStatus(
    //     id: string,
    //     status: 'pending' | 'approved' | 'rejected' | 'under_review',
    //     moderatorFeedback?: string,
    // ): Promise<Resource> {
    //     const resource = await this.resourceRepository.findOne({
    //         where: { id },
    //     });

    //     if (!resource) {
    //         throw new NotFoundException('Resource not found');
    //     }

    //     if (!['pending', 'approved', 'rejected', 'under_review'].includes(status)) {
    //         throw new BadRequestException('Invalid moderation status');
    //     }

    //     resource.moderationStatus = status;

    //     if (status === 'approved') {
    //         resource.isPublished = true;
    //         resource.moderatorFeedback = "Approved";
    //     }
    //     if (status === 'rejected') {
    //         resource.isPublished = false;
    //         resource.moderatorFeedback = moderatorFeedback ?? 'Rejected by moderator';
    //     }

    //     if (status === 'under_review') {
    //         resource.isPublished = false;
    //     }

    //     return this.resourceRepository.save(resource);
    // }
    async updateStatus(
        id: string,                        // resource UUID
        status: ModerationStatus,          // string union type
        moderatorFeedback?: string
    ): Promise<Resource> {


        const resource = await this.resourceRepository.findOne({
            where: { id },
        });

        if (!resource) {
            throw new NotFoundException('Resource not found');
        }


        resource.moderationStatus = status;


        if (status === 'approved') {
            resource.isPublished = true;
            resource.moderatorFeedback = 'Approved';
        } else if (status === 'rejected') {
            resource.isPublished = false;
            resource.moderatorFeedback = moderatorFeedback ?? 'Rejected by moderator';
        } else {
            // 'pending' or 'under_review'
            resource.isPublished = false;
            resource.moderatorFeedback = moderatorFeedback ?? "";
        }


        return this.resourceRepository.save(resource);
    }

}
