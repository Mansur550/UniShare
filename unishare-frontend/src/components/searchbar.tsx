"use client";

export default function SearchBar({
    value,
    onChange,
}: {
    value: string;
    onChange: (text: string) => void;
}) {
    return (
        <input
            type="text"
            placeholder="Search resources..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-6"
        />
    );
}
