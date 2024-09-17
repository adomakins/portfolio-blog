interface BaseProps {
    title: string;
    description: string;
}

export interface PostProps extends BaseProps {
    slug: string;
    date?: string;
    thumbnail: string;
    video?: string;
}

export interface ProjectProps extends BaseProps {
    slug: string;
    website: string;
    icon: string;
    cover?: string;
    dates?: string;
}

export interface ToolProps extends BaseProps {
    link: string;
    icon?: string;
    cover?: string;
}
