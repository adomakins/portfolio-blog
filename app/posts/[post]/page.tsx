// Import necessary components and types
import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import Footer from '@/components/footer'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionQuery, parsePage } from '@/lib/utils'
import { ContentSpacer } from '@/components/section'
import { Section, SectionTitle } from '@/components/section'
import { InternalLink, ExternalLink } from '@/components/link'
import type { Metadata } from "next";

// Updated interfaces
interface RichTextItem {
    text: string;
    link?: string;
}

interface Block {
    type: string;
    text: RichTextItem[];
}

interface SectionData {
    title: string;
    content: Block[];
}

// Simplified RenderRichText component to handle only links
function RenderRichText({ richTextArray }: { richTextArray: RichTextItem[] }) {
    return (
        <>
            {richTextArray.map((item, index) => {
                // Handle links
                if (item.link) {
                    const isInternalLink = item.link.startsWith('/');
                    if (isInternalLink) {
                        return (
                            <InternalLink key={index} name={item.text} url={item.link} />
                        );
                    } else {
                        return (
                            <ExternalLink key={index} name={item.text} url={item.link} />
                        );
                    }
                } else {
                    // Render plain text
                    return <span key={index}>{item.text}</span>;
                }
            })}
        </>
    );
}

export async function generateMetadata({ params }: { params: { post: string } }): Promise<Metadata> {
    const filterOptions: QueryDatabaseParameters['filter'] = {
        property: 'Slug',
        rich_text: {
            equals: params.post,
        },
    };
    const post = await notionQuery('Posts', filterOptions, undefined).then((post) => post[0]);

    return {
        title: post.title,
        description: post.description,
    };
}

export default async function Post({ params }: { params: { post: string } }) {
    const filterOptions: QueryDatabaseParameters['filter'] = {
        property: 'Slug',
        rich_text: {
            equals: params.post,
        },
    };
    const post = await notionQuery('Posts', filterOptions, undefined).then((post) => post[0]);
    const sections: SectionData[] = await parsePage(post.id);

    return (
        <Container>
            <Header>
                <HeaderTitle>{post.title}</HeaderTitle>
                <HeaderSubtitle>{post.description}</HeaderSubtitle>
                <ContentSpacer />
                {post.date && (
                    <p className="card-subtitle">
                        Published on{' '}
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </p>
                )}
            </Header>

            <article>

                {sections.map((section, index) => (
                    <Section key={index}>
                        {section.title && <SectionTitle>{section.title}</SectionTitle>}
                        {section.content.map((block, idx) => {
                            switch (block.type) {
                                case 'heading_2':
                                    return (
                                        <h3 key={idx} className="mt-4 text-lg font-bold mb-2 text-gray-700">
                                            <RenderRichText richTextArray={block.text} />
                                        </h3>
                                    );
                                case 'heading_3':
                                    return (
                                        <h4 key={idx} className="mt-3 text-base font-bold mb-1 text-gray-600">
                                            <RenderRichText richTextArray={block.text} />
                                        </h4>
                                    );
                                case 'paragraph':
                                    return (
                                        <div key={idx} className="mb-2 card-subtitle">
                                            <RenderRichText richTextArray={block.text} />
                                        </div>
                                    );
                                // Handle other block types if needed
                                default:
                                    return null;
                            }
                        })}
                    </Section>
                ))}
            </article>
            <Footer />
        </Container>
    );
}
