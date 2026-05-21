// "use client";
// export default function DashboardPage() {
//     const storedUser = localStorage.getItem("name");
//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <div className="bg-white p-10 rounded-xl shadow-lg text-center">
//                 <h1 className="text-3xl font-bold text-indigo-600 mb-4">
//                     Dashboard
//                 </h1>
//                 <p className="text-gray-600">
//                     Login successful <br />
//                     Welcome {storedUser}
//                 </p>
//             </div>
//         </div>
//     );
// }
// "use client";

import ModeratorSidebar from "@/components/sidebar";

// import { useState } from "react";
// import SearchBar from "@/components/searchbar";
// import ResourceGrid from "@/components/resourceGrid";



// export default function DashboardPage() {
//     const [search, setSearch] = useState("");

//     const filteredResources = dummyResources.filter((res) =>
//         res.title.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="p-8 bg-gray-50 min-h-screen">
//             <h1 className="text-3xl font-bold">Featured Resources</h1>
//             <p className="text-gray-600 mb-6">
//                 Top-rated study materials from our community
//             </p>

//             <SearchBar value={search} onChange={setSearch} />

//             <ResourceGrid resources={filteredResources} />
//         </div>
//     );
// }


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar only for moderator routes */}
            <ModeratorSidebar />

            {/* Main content */}
            <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </div>
    );
}

