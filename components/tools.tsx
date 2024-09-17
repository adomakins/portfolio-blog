import type { ToolProps } from '@/lib/types';
import Image from 'next/image';

const ToolText = ({ title, description }: { title: string; description: string }) => (
    <div className='flex flex-col self-start'>
        <h1 className='micro-title'>{title}</h1>
        <p className='micro-text'>{description}</p>
    </div>
);

const WrapWithLink = ({ link, children }: { link?: string; children: React.ReactNode }) => {
    if (link && link !== '') {
        return (
            <a href={link} target='_blank' rel="noopener noreferrer">
                {children}
            </a>
        );
    }
    return <>{children}</>;
};

export function CoverTool({ title, description, link, cover }: ToolProps) {
    return (
        <WrapWithLink link={link}>
            <div className="flex flex-col items-center border rounded-lg border-gray-200 overflow-hidden w-full h-full hover:shadow-md transition-all duration-500">
                {cover && (
                    <div className="w-full aspect-[3/2] relative">
                        <Image src={cover} alt={title} fill className="object-cover" />
                    </div>
                )}
                <div className='flex flex-col justify-start self-start w-full px-4 pb-4 gap-2'>
                    <ToolText title={title} description={description} />
                </div>
            </div>
        </WrapWithLink>
    );
}

export function IconTool({ title, description, link, icon }: ToolProps) {
    return (
        <WrapWithLink link={link}>
            <div className="flex items-center border rounded-lg border-gray-200 p-4 w-full h-full gap-4 hover:shadow-md transition-all duration-500">
                {icon && (
                    <div className="flex-shrink-0 overflow-hidden self-start">
                        <Image src={icon} alt={title} width={36} height={36} className="rounded-lg border-gray-200 border" />
                    </div>
                )}
                <ToolText title={title} description={description} />
            </div>
        </WrapWithLink>
    );
}