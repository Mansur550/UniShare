'use client';

import { useState } from 'react';
import axios from 'axios';
import { Resource } from '@/app/resources/page';

export default function PendingResourceCard({
    resource,
    onAction,
}: {
    resource: Resource;
    onAction: () => void;
}) {
    const [feedback, setFeedback] = useState('');

    const updateStatus = async (status: 'approved' | 'rejected') => {
        await axios.patch(
            `http://localhost:3000/resources/update/${resource.id}/status`,
            {
                status: status,
                moderatorFeedback: feedback,
            }
        );

        onAction();
    };

    return (
        <div className="border rounded-lg p-4 bg-white space-y-3">
            <h3 className="font-semibold">{resource.title}</h3>
            <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500">Catagory: {resource.category}
                </span>
            </div>

            <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500">#{resource.tags}
                </span>
            </div>

            <p className="text-sm text-gray-600">
                {resource.description}
            </p>

            <textarea
                placeholder="Moderator feedback..."
                className="w-full border rounded p-2 text-sm"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
            />

            <div className="flex gap-3">
                <button
                    onClick={() => updateStatus('approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Accept
                </button>

                <button
                    onClick={() => updateStatus('rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                >
                    Reject
                </button>
            </div>
        </div>
    );
}
