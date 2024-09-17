import React from 'react';

interface CardProps {
    children: React.ReactNode;
}

// Consistent styling for the card component that all content sits in

export function WideGrid({ children }: CardProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {children}
        </div>
    );
}

export function MiniGrid({ children }: CardProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {children}
        </div>
    );
}