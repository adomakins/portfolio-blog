import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface LinkProps {
    name: string;
    url: string;
    color?: 'black' | 'white';
}

export function ExternalLink({ name, url, color = 'black' }: LinkProps) {
    const textColor = color === 'black' ? 'text-black' : 'text-white';
    const borderColor = color === 'black' ? 'hover:border-black' : 'hover:border-white';
    const borderBase = color === 'black' ? 'border-gray-200' : 'border-gray-400';

    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <span className={`inline-flex items-center gap-1 border-b ${borderBase} ${borderColor} transition-all duration-500`}>
                <p className={`text-sm font-medium ${textColor}`}>{name}</p>
                <ArrowUpRight className={`w-4 h-4 ${textColor}`} />
            </span>
        </a>
    );
}

export function InternalLink({ name, url, color = 'black' }: LinkProps) {
    const textColor = color === 'black' ? 'text-black' : 'text-white';
    const borderColor = color === 'black' ? 'hover:border-black' : 'hover:border-white';
    const borderBase = color === 'black' ? 'border-gray-200' : 'border-gray-400';

    return (
        <Link href={url} rel="noopener noreferrer">
            <span className={`inline-flex items-center gap-1 border-b ${borderBase} ${borderColor} transition-all duration-500`}>
                <p className={`text-sm font-medium ${textColor}`}>{name}</p>
                <ArrowRight className={`w-4 h-4 ${textColor}`} />
            </span>
        </Link>
    );
}

export function InternalButton({ name, url }: Omit<LinkProps, 'color'>) {
    return (
        <Link href={url} rel="noopener noreferrer">
            <span className="flex items-center w-fit gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-black">
                <p className="text-sm font-medium">{name}</p>
                <ArrowRight className="w-4 h-4" />
            </span>
        </Link>
    );
}