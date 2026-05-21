'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ResourceCard from '@/components/ResourceCard';
import { Resource } from '@/app/resources/page';

export default function OverviewPage() {
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/resources')
            .then(res => setResources(res.data))
            .catch(console.error);
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">All Resources</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
        </>
    );
}
