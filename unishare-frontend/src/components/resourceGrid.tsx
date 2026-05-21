import ResourceCard from "./ResourceCard1";

export default function ResourceGrid({ resources }: { resources: any[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, index) => (
                <ResourceCard key={index} resource={res} />
            ))}
        </div>
    );
}