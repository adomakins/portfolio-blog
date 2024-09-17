import type { PostProps } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, InternalLink } from '@/components/link';

const PostText = ({ title, description }: { title: string; description: string }) => (
    <div className='flex flex-col self-start gap-2'>
        <h1 className='micro-title'>{title}</h1>
        <p className='micro-text'>{description}</p>
    </div>
);

export function CoverPost({ title, description, slug, thumbnail }: PostProps) {
    return (
        <Link href={`/posts/${slug}`} className="w-full h-full">
            <div className="flex flex-col items-center w-full h-full">
                {thumbnail && (
                    <div className="w-full aspect-[16/9] relative overflow-hidden rounded-sm hover:shadow-sm shadow-md transition-all duration-500 mb-4">
                        <Image src={thumbnail} alt={title} fill className="object-cover rounded-sm" />
                    </div>
                )}
                <div className='flex flex-col justify-start self-start w-full'>
                    <PostText title={title} description={description} />
                </div>
            </div>
        </Link>
    );
}

export function TextPost({ title, description, slug, thumbnail, date, video }: PostProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            {thumbnail && (
                <div className="w-full sm:w-1/3 aspect-[16/9] relative overflow-hidden rounded-lg shadow-sm border-gray-200 border">
                    <Image src={thumbnail} alt={title} fill className="object-cover" />
                </div>
            )}
            <div className="flex flex-col gap-2 flex-1">
                <div className='flex flex-col justify-center'>
                    <h3 className='micro-title mb-2'>{title}</h3>
                    <p className='micro-text text-gray-800'>{date ? formatDate(date) : ''}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    <p className='micro-text'>{description}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    {video && <ExternalLink name='Video' url={video} color='black' />}
                    <InternalLink name='Article' url={`/posts/${slug}`} color='black' />
                </div>
            </div>
        </div>
    );
}