'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Resource } from '../page'; // replace later with shared type

export default function ResourceDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [resource, setResource] = useState<Resource | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchResource = async () => {
            try {
                const res = await axios.get<Resource>(
                    `http://localhost:3000/resources/byid/${id}`
                );
                setResource(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchResource();
    }, [id]);

    if (!resource) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">


            {/* {resource.imageUrl && (
                <img
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-72 object-cover rounded-xl"
                />
            )} */}

            {/* Title */}
            <h1 className="text-3xl font-bold">
                {resource.title}
            </h1>


            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span><strong>Category:</strong> {resource.category}</span>
                {/* <span><strong>Status:</strong> {resource.moderationStatus}</span>
                <span>
                    <strong>Published:</strong>{' '}
                    {resource.isPublished ? 'Yes' : 'No'}
                </span>
                <span>
                    <strong>Featured:</strong>{' '}
                    {resource.isFeatured ? 'Yes' : 'No'}
                </span> */}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
                {resource.description}
            </p>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {resource.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs bg-gray-200 px-3 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* File Information */}
            <div className="border rounded-lg p-4 space-y-2">
                <h2 className="font-semibold">File Information</h2>
                <p><strong>Name:</strong> {resource.fileName ?? 'N/A'}</p>
                <p><strong>Type:</strong> {resource.fileType ?? 'N/A'}</p>
                <p>
                    <strong>Size:</strong>{' '}
                    {resource.fileSize
                        ? `${(resource.fileSize / 1024 / 1024).toFixed(2)} MB`
                        : 'N/A'}
                </p>
                <p><strong>Downloads:</strong> {resource.downloadCount}</p>
            </div>

            {/* Ratings */}
            {/* <div className="border rounded-lg p-4 space-y-1">
                <h2 className="font-semibold">Feedback</h2>
                <p><strong>Average Rating:</strong> {resource.averageRating}</p>
                <p><strong>Feedback Count:</strong> {resource.feedbackCount}</p>
            </div> */}

            {/* Moderator Feedback */}
            {resource.moderatorFeedback && (
                <div className="border rounded-lg p-4 bg-yellow-50">
                    <h2 className="font-semibold">Moderator Feedback</h2>
                    <p className="text-sm">{resource.moderatorFeedback}</p>
                </div>
            )}

            {/* Dates */}
            <div className="text-sm text-gray-500">
                {/* <p>
                    <strong>Created:</strong>{' '}
                    {new Date(resource.createdAt).toLocaleString()}
                </p>
                <p>
                    <strong>Updated:</strong>{' '}
                    {new Date(resource.updatedAt).toLocaleString()}
                </p> */}
            </div>

            {/* Download Button */}
            <a
                href={resource.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
                Download Resource
            </a>
        </div>
    );
}
