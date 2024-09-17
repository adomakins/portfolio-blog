export default function Timeline({ children }: { children: React.ReactNode }) {
    return (
        <div className="border-l border-dashed pl-4 border-gray-200 dark:border-gray-800 flex flex-col gap-8">
            {children}
        </div>
    )
}