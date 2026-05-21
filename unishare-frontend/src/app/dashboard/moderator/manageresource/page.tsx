'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Resource } from '@/app/resources/page';
import PendingResourceCard from '@/components/manageresource';


export default function ManageResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);

    const loadPending = async () => {
        const res = await axios.get(
            'http://localhost:3000/resources/pending'
        );
        setResources(res.data);
    };

    useEffect(() => {
        loadPending();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">
                Pending Resources
            </h1>

            <div className="grid gap-4 md:grid-cols-2">
                {resources.map(resource => (
                    <PendingResourceCard
                        key={resource.id}
                        resource={resource}
                        onAction={loadPending}
                    />
                ))}
            </div>
        </>
    );
}
