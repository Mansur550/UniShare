"use client";

import axios from "axios";

type Resource = {
    id: number;
    title: string;
    description: string;
    category: string;
    semester: string;
    type: string;
    rating: number;
    reviews: number;
    downloads: number;
    date: string;
};

export default function ResourceCard({ resource }: { resource: Resource }) {

    // const handleDownload = async () => {
    //     const token = localStorage.getItem("token");

    //     if (!token) {
    //         alert("Please login again");
    //         return;
    //     }

    //     try {
    //         const response = await axios.get(
    //             ${process.env.NEXT_PUBLIC_API_ENDPOINT}/resources/download/${resource.id},
    //             {
    //                 headers: {
    //                     Authorization: Bearer ${token},
    //                 },
    //                 responseType: "blob",
    //             }
    //         );

    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement("a");
    //         link.href = url;
    //         link.download = ${resource.title}.pdf;
    //         document.body.appendChild(link);
    //         link.click();
    //         link.remove();
    //     } catch (error) {
    //         console.error("Download failed", error);
    //         alert("Download failed");
    //     }
    // };

    return (
        <div className="border rounded-xl p-5 shadow-sm bg-white">
            <h3 className="text-lg font-semibold">{resource.title}</h3>

            <p className="text-sm text-gray-600 mt-1">
                {resource.description}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
                <span className="text-xs border px-2 py-1 rounded">
                    {resource.category}
                </span>
                <span className="text-xs border px-2 py-1 rounded">
                    {resource.semester}
                </span>
                <span className="text-xs border px-2 py-1 rounded">
                    {resource.type}
                </span>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm">
                <span>⭐ {resource.rating} ({resource.reviews})</span>
                <span>⬇ {resource.downloads}</span>
            </div>

            <button
                //onClick={handleDownload} 
                className="w-full mt-4 bg-green-600 hover:bg-green-800 text-white py-2 rounded-lg transition"
            >
                Download
            </button>

            <p className="text-xs text-gray-500 mt-2">
                {resource.date}
            </p>
        </div>
    );
}