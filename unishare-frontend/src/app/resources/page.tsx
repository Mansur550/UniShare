'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ResourceCard from '@/components/ResourceCard';
// import { Resource } from '@/types/resource';

export interface Resource {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[] | null;

    fileUrl: string;
    fileName: string | null;
    fileType: string | null;
    fileSize: number | null;

    imageUrl: string | null;

    downloadCount: number;
    averageRating: number;
    feedbackCount: number;

    moderationStatus: 'pending' | 'approved' | 'rejected' | 'under_review';

    moderatorFeedback: string | null;

    isPublished: boolean | null;
    isFeatured: boolean | null;

    createdAt: string;
    updatedAt: string;
}


export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await axios.get<Resource[]>(
                    'http://localhost:3000/resources'
                );

                // Optional: show only approved + published
                const filtered = res.data.filter(
                    r => r.isPublished && r.moderationStatus === 'approved'
                );

                setResources(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Resources
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
        </div>
    );
}
