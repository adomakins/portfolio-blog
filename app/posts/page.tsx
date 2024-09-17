import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import { Section, ContentSpacer } from '@/components/section'
import { WideGrid } from '@/components/grid'
import Footer from '@/components/footer'
import { CoverPost, TextPost } from '@/components/posts'
import { notionQuery } from '@/lib/utils'
import Timeline from '@/components/timeline'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'


export default async function Posts() {
    const filterOptions: QueryDatabaseParameters['filter'] = {
        property: 'Published',
        checkbox: {
            equals: true
        }
    }
    const sortOptions: QueryDatabaseParameters['sorts'] = [
        {
            property: 'Date',
            direction: 'descending'
        }
    ];
    const featuredFilter = () => items.filter(item => item.featured === "true");
    const items = await notionQuery('Posts', filterOptions, sortOptions);

    return (
        <Container>
            <Header>
                <HeaderTitle>Posts</HeaderTitle>
                <HeaderSubtitle>
                    Below are the posts that I&apos;ve bothered to write and publish here instead of just on YouTube.
                </HeaderSubtitle>
            </Header>

            <Section>
                <h1 className="card-title">Featured Posts</h1>
                <ContentSpacer />
                <WideGrid>
                    {featuredFilter().map((item, index) => (
                        <CoverPost key={index} slug={item.slug} date={item.date} title={item.title} description={item.description} thumbnail={item.thumbnail} />
                    ))}
                </WideGrid>
            </Section>

            <Section>
                <h1 className="card-title">All Blog Posts</h1>
                <ContentSpacer />
                <Timeline>
                    {items.map((item, index) => (
                        <TextPost key={index} slug={item.slug} date={item.date} title={item.title} description={item.description} thumbnail={item.thumbnail} video={item.video} />
                    ))}
                </Timeline>
            </Section>

            <Footer />
        </Container>
    );
}