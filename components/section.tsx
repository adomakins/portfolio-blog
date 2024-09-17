import React from 'react';

interface CardProps {
    children: React.ReactNode;
}

export function Section({ children }: CardProps) {
    return (
        <div className="bg-white dark:bg-black shadow-md rounded-lg p-6 border-gray-500 w-full">
            {children}
        </div>
    );
}

export function SectionTitle({ children }: CardProps) {
    return <h2 className="text-xl font-bold mb-2 dark-text">{children}</h2>
}

export function SectionSubtitle({ children }: CardProps) {
    return <h2 className="text-md text-gray-500">{children}</h2>
}

export function ContentSpacer() {
    return <div className="h-4" />
}

export function MiniSpacer() {
    return <div className="h-2" />
}