import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import Footer from '@/components/footer'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionQuery, parsePage } from '@/lib/utils'
import { ContentSpacer } from '@/components/section'
import { Section, SectionTitle } from '@/components/section'

interface Block {
    type: string;
    text: string;
}

interface SectionData {
    title: string;
    content: Block[];
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
                        Published on {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>
                )}
            </Header>

            {sections.map((section, index) => (
                <Section key={index}>
                    {section.title && <SectionTitle>{section.title}</SectionTitle>}
                    {section.content.map((block, idx) => {
                        switch (block.type) {
                            case 'heading_2':
                                return (
                                    <h3 key={idx} className="mt-4 text-lg font-bold mb-2 text-gray-700">
                                        {block.text}
                                    </h3>
                                );
                            case 'heading_3':
                                return (
                                    <h4 key={idx} className="mt-3 text-base font-bold mb-1 text-gray-600">
                                        {block.text}
                                    </h4>
                                );
                            case 'paragraph':
                                return (
                                    <p key={idx} className="mb-2 card-subtitle">
                                        {block.text}
                                    </p>
                                );
                            default:
                                return null;
                        }
                    })}
                </Section>
            ))}

            <Footer />
        </Container>
    );
}
