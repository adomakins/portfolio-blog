import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import Footer from '@/components/footer'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionQuery } from '@/lib/utils'
import { ContentSpacer } from '@/components/section'
import { formatDateRange } from '../page'

export default async function Project({ params }: { params: { project: string } }) {
    const filterOptions: QueryDatabaseParameters['filter'] = {
        property: 'Slug',
        rich_text: {
            equals: params.project
        }
    }
    const project = await notionQuery('Projects', filterOptions, undefined).then((project) => project[0]);
    const dateRange = formatDateRange(project['start date'], project['end date']);

    return (
        <Container>
            <Header>
                <HeaderTitle>{project.title}</HeaderTitle>
                <HeaderSubtitle>{project.description}</HeaderSubtitle>
                <ContentSpacer />
                <p className="card-subtitle">
                    {dateRange}
                </p>
            </Header>

            <Footer />
        </Container >
    );
}
