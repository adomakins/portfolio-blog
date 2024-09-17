import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import Footer from '@/components/footer'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionQuery, parsePage } from '@/lib/utils'
import { ContentSpacer } from '@/components/section'
import { formatDateRange } from '../page'
import { Section, SectionTitle } from '@/components/section'

interface Block {
    type: string;
    text: string;
}

interface SectionData {
    title: string;
    content: Block[];
}

export default async function Project({ params }: { params: { project: string } }) {
    const filterOptions: QueryDatabaseParameters['filter'] = {
        property: 'Slug',
        rich_text: {
            equals: params.project,
        },
    };
    const project = await notionQuery('Projects', filterOptions, undefined).then((project) => project[0]);
    const dateRange = formatDateRange(project['start date'], project['end date']);
    const sections: SectionData[] = await parsePage(project.id);

    return (
        <Container>
            <Header>
                <HeaderTitle>{project.title}</HeaderTitle>
                <HeaderSubtitle>{project.description}</HeaderSubtitle>
                <ContentSpacer />
                <p className="card-subtitle">{dateRange}</p>
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