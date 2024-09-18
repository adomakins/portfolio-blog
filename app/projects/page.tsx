import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import { Section, SectionTitle, ContentSpacer, MiniSpacer } from '@/components/section'
import Footer from '@/components/footer'
import { FeaturedProject, RegularProject } from '@/components/projects'
import { notionQuery } from '@/lib/utils'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import Timeline from '@/components/timeline'
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Adam Skjervold's Projects",
    description: "A complete list of all the major projects I've worked on since becoming an entrepreneur.",
};

export const revalidate = 60

export const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const now = new Date();
    const end = endDate ? new Date(endDate) : null;

    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const daysDiff = (date1: Date, date2: Date) => Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));

    if (start > now) {
        return `Starting ${formatDate(start)}`;
    } else if (!endDate) {
        const days = daysDiff(start, now);
        return `Active since ${formatDate(start)} (${days} days)`;
    } else if (end) {
        const days = daysDiff(start, end);
        return `${formatDate(start)} - ${formatDate(end)} (${days} days)`;
    } else {
        return `${formatDate(start)} - Present`;
    }
};

export default async function Projects() {
    const featuredFilter = () => items.filter(item => item.featured === "true");

    const sortOptions: QueryDatabaseParameters['sorts'] = [
        {
            property: 'Start Date',
            direction: 'descending'
        }
    ];

    const items = await notionQuery('Projects', undefined, sortOptions);

    const sortedItems = items.sort((a, b) => {
        if (!a['end date'] && !b['end date']) {
            return new Date(b['start date']).getTime() - new Date(a['start date']).getTime();
        }
        if (!a['end date']) return -1;
        if (!b['end date']) return 1;
        return new Date(b['end date']).getTime() - new Date(a['end date']).getTime();
    });

    return (
        <Container>
            <Header>
                <HeaderTitle>Projects</HeaderTitle>
                <HeaderSubtitle>
                    To me, a project is a collection of ideas and tools that are brought together to create something new.
                    <MiniSpacer />
                    Below is a collection of my more notable past projects.
                </HeaderSubtitle>
            </Header>

            <Section>
                <SectionTitle>Featured Projects</SectionTitle>
                <ContentSpacer />
                <div className='flex flex-col gap-4'>
                    {featuredFilter().map((item, index) => (
                        < FeaturedProject key={index} slug={item.slug} title={item.title} description={item.description} cover={item.cover} icon={item.icon} website={item.website} />
                    ))}
                </div>
            </Section>

            <Section>
                <h1 className="card-title">Previous Projects</h1>
                <ContentSpacer />
                <Timeline>
                    {sortedItems.map((item, index) => (
                        <RegularProject
                            key={index}
                            slug={item.slug}
                            title={item.title}
                            description={item.description}
                            cover={item.cover}
                            icon={item.icon}
                            website={item.website}
                            dates={formatDateRange(item['start date'], item['end date'])}
                        />
                    ))}
                </Timeline>
            </Section>

            <Footer />
        </Container>
    );
}
