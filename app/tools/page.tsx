import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import { ContentSpacer, MiniSpacer, Section, SectionTitle, SectionSubtitle } from '@/components/section'
import Footer from '@/components/footer'
import { CoverTool, IconTool } from '@/components/tools'
import { WideGrid, MiniGrid } from '@/components/grid'
import { notionQuery } from '@/lib/utils'

export default async function Tools() {
    const items = await notionQuery('Tools');
    const filterItems = (type: string) => items.filter(item => item.type === type);

    return (
        <Container>
            <Header>
                <HeaderTitle>Favorite Tools</HeaderTitle>
                <HeaderSubtitle>
                    &quot;The joy of craftsmanship comes from the process of creating and the tools that help bring an idea into reality.&quot;
                    <MiniSpacer />
                    – Unknown
                </HeaderSubtitle>
            </Header>

            <Section>
                <h1 className="card-title">Personal Hardware</h1>
                <h3 className="card-subtitle">
                    Some might call it vain, but I take pride in having excellent tools that make work more enjoyable. These are the hardware devices that I use on a daily basis.
                </h3>
                <ContentSpacer />
                <MiniGrid>
                    {filterItems('Essential Hardware').map((item, index) => (
                        <CoverTool key={index} link={item.link} title={item.title} description={item.description} cover={item.cover} />
                    ))}
                </MiniGrid>
            </Section>

            <Section>
                <SectionTitle>
                    Best Development Tools
                </SectionTitle>
                <SectionSubtitle>
                    You don&apos;t realize this when first starting out in development, but so many of the problems that you would have faced in the past are already solved.
                    <MiniSpacer />
                    That also means it&apos;s a little overwhelming just how many tools are available to you, but after doing countless hours of research and testing, these are my favorite tools that I&apos;ve found for building software.
                </SectionSubtitle>
                <ContentSpacer />
                <WideGrid>
                    {filterItems('Development').map((item, index) => (
                        <IconTool key={index} link={item.link} title={item.title} description={item.description} icon={item.icon} />
                    ))}
                </WideGrid>
            </Section>

            <Section>
                <SectionTitle>
                    AI-Enhanced Development
                </SectionTitle>
                <SectionSubtitle>
                    If it weren&apos;t for these tools, I&apos;d still be using something like WeWeb to build my websites. These tools are redefining what&apos;s possible for beginner developers.
                </SectionSubtitle>
                <ContentSpacer />
                <WideGrid>
                    {filterItems('AI Development').map((item, index) => (
                        <IconTool key={index} link={item.link} title={item.title} description={item.description} icon={item.icon} />
                    ))}
                </WideGrid>
            </Section>

            <Section>
                <SectionTitle>
                    Favorite Personal Apps
                </SectionTitle>
                <SectionSubtitle>
                    I&apos;m currently in remission from my productivity app addiction, and I&apos;ve settled on these apps as my daily drivers.
                </SectionSubtitle>
                <ContentSpacer />
                <WideGrid>
                    {filterItems('Personal Apps').map((item, index) => (
                        <IconTool key={index} link={item.link} title={item.title} description={item.description} icon={item.icon} />
                    ))}
                </WideGrid>
            </Section>

            <Section>
                <SectionTitle>
                    Best Mac Utilities
                </SectionTitle>
                <SectionSubtitle>
                    MacOS is already really good, but these apps make it even better.
                </SectionSubtitle>
                <ContentSpacer />
                <WideGrid>
                    {filterItems('Mac Utilities').map((item, index) => (
                        <IconTool key={index} link={item.link} title={item.title} description={item.description} icon={item.icon} />
                    ))}
                </WideGrid>
            </Section>

            <Footer />
        </Container>
    );
}
