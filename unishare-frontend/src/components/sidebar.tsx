'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ModeratorSidebar() {
    const pathname = usePathname();

    const linkClass = (path: string) =>
        `block px-4 py-2 rounded-lg ${pathname === path
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`;

    return (
        <aside className="w-64 min-h-screen border-r p-4">
            <h2 className="text-xl font-bold mb-6">Moderator</h2>

            <nav className="space-y-2">
                <Link
                    href="/dashboard/moderator/overview"
                    className={linkClass('/dashboard/moderator/overview')}
                >
                    Overview
                </Link>
                {/* <Link
                    href="/dashboard/profile"
                    className={linkClass('/dashboard/moderator/profile')}
                >
                    Profile
                </Link> */}



                <Link
                    href="/dashboard/moderator/manageresource"
                    className={linkClass('/dashboard/moderator/manage')}
                >
                    Manage Resources
                </Link>
            </nav>
        </aside>
    );
}
