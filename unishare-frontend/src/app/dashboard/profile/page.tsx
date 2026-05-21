// "use client";

// interface User {
//     id: number;
//     fullName: string;
//     email: string;
//     studentId: string;
// }

// // Props interface
// interface ProfilePageProps {
//     user: User | null;
// }

// export default function ProfilePage({ user }: ProfilePageProps) {
//     if (!user) {
//         return <p>Please log in first.</p>;
//     }

//     return (
//         <div className="max-w-md bg-white p-6 rounded-lg shadow mx-auto mt-10">
//             <h1 className="text-xl font-bold mb-4">Profile</h1>
//             <p><strong>Full Name:</strong> {user.fullName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Student ID:</strong> {user.studentId}</p>
//         </div>
//     );
// }
