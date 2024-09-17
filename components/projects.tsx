import type { ProjectProps } from '@/lib/types';
import Image from 'next/image';
import { MiniSpacer } from './section';
import { ExternalLink, InternalLink } from './link';

// const ProjectText = ({ title, description }: { title: string; description: string }) => (
//     <div className='flex flex-col self-start'>
//         <h1 className='card-title'>{title}</h1>
//         <p className='micro-text'>{description}</p>
//     </div>
// );

export function FeaturedProject({ title, description, slug, website, cover }: ProjectProps) {
    return (
        <div className="relative flex flex-col items-center rounded-lg aspect-square overflow-hidden">
            {cover && (
                <Image src={cover} alt={title} fill className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className='relative flex flex-col justify-end w-full h-full p-4 z-10'>
                <MiniSpacer />
                <h3 className='card-title text-white'>{title}</h3>
                <p className='micro-text text-gray-200'>{description}</p>
                <MiniSpacer />
                <div className='flex flex-row gap-2'>
                    {website && <ExternalLink name='Website' url={website} color='white' />}
                    <InternalLink name='Exposition' url={`/projects/${slug}`} color='white' />
                </div>
            </div>
        </div>
    );
}

export function RegularProject({ title, description, slug, website, icon, dates }: ProjectProps) {
    return (
        <div className="flex items-start flex-col gap-2">
            <div className='flex flex-row gap-2'>
                {icon && (
                    <div className="flex-shrink-0 overflow-hidden self-start rounded-lg shadow-md">
                        <Image src={icon} alt={title} width={36} height={36} className="rounded-lg" />
                    </div>
                )}
                <div className='flex flex-col justify-center'>
                    <h3 className='micro-title'>{title}</h3>
                    <p className='micro-text text-gray-800'>{dates}</p>
                </div>
            </div>
            <div className='flex flex-row gap-2'>
                <p className='micro-text'>{description}</p>
            </div>
            <div className='flex flex-row gap-2'>
                {website && <ExternalLink name='Website' url={website} color='black' />}
                <InternalLink name='Exposition' url={`/projects/${slug}`} color='black' />
            </div>
        </div>
    );
}