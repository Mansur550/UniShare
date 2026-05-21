'use client';

import { Resource } from '@/app/resources/page';
import Link from 'next/link';
// import { Resource } from '@/types/resource';

type Props = {
    resource: Resource;
};

export default function ResourceCard({ resource }: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-5 flex flex-col">



            {/* Content */}
            <h2 className="text-lg font-semibold mb-1">Tittle: {resource.title}
            </h2>

            <p className="text-sm text-gray-600 mb-3 line-clamp-3">Description: {resource.description}
            </p>

            <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500">Catagory: {resource.category}
                </span>

                <Link
                    href={`/resources/${resource.id}`}
                    className="text-sm bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Details
                </Link>
            </div>
        </div>
    );
}
