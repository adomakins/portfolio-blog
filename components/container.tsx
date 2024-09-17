import React from 'react';

interface CardProps {
    children: React.ReactNode;
}

export default function Container({ children }: CardProps) {
    return (
        <div className="flex flex-col space-y-8">
            {children}
        </div>
    );
}