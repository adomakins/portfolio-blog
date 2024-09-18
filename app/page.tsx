import Container from '@/components/container'
import { HeaderTitle, HeaderSubtitle } from '@/components/header'
import { Section, ContentSpacer } from '@/components/section'
import { WideGrid } from '@/components/grid'
import { InternalButton } from '@/components/link'
import Footer from '@/components/footer'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionQuery } from '@/lib/utils'
import { IconTool } from '@/components/tools'
import { CoverPost } from '@/components/posts'
import { FeaturedProject, RegularProject } from '@/components/projects'
import { Header } from '@/components/header'
import Timeline from '@/components/timeline'
import { formatDateRange } from '@/app/projects/page'
import Image from 'next/image'

const filterOptions: QueryDatabaseParameters['filter'] = {
  property: 'Featured',
  checkbox: {
    equals: true
  }
}

export default async function Home() {

  const featuredProjects = await notionQuery('Projects', filterOptions, undefined);
  const activeProjects = await notionQuery('Projects', { property: 'End Date', date: { is_empty: true } }, undefined);
  const posts = await notionQuery('Posts', filterOptions, undefined);
  const tools = await notionQuery('Tools', filterOptions, undefined);

  return (
    <Container>
      <Header>
        <div className='flex flex-row gap-8 items-start'>
          <div className='flex flex-col flex-grow'>
            <HeaderTitle>Adam Skjervold</HeaderTitle>
            <HeaderSubtitle>Computer science dropout, YouTube sensation, SMMA veteran, now focusing on AI and SaaS.</HeaderSubtitle>
          </div>
          <div className='flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden'>
            <Image
              src='/adam.webp'
              alt='Adam Skjervold Profile Picture'
              width={96}
              height={96}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </Header>

      <Section>
        <h1 className="card-title">Featured Projects</h1>
        <ContentSpacer />
        <div className='flex flex-col gap-4'>
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={index} title={project.title} description={project.description} slug={project.slug} website={project.website} icon={project.icon} cover={project.cover} />
          ))}
        </div>
        <ContentSpacer />
        <InternalButton name='See All Projects' url='/projects' />
      </Section>

      {/* 
      <Section>
        <h1 className="card-title">My Story</h1>
        <p>Read full story → /about</p>
      </Section>
      */}

      <Section>
        <h1 className="card-title">Featured Blog Posts</h1>
        <ContentSpacer />
        <WideGrid>
          {posts.map((post, index) => (
            <CoverPost key={index} title={post.title} description={post.description} slug={post.slug} thumbnail={post.thumbnail} />
          ))}
        </WideGrid>
        <ContentSpacer />
        <InternalButton name='See All Posts' url='/posts' />
      </Section>

      <Section>
        <h1 className="card-title">My Favorite Tools</h1>
        <ContentSpacer />
        <WideGrid>
          {tools.map((tool, index) => (
            <IconTool key={index} title={tool.title} description={tool.description} link={tool.link} icon={tool.icon} cover={tool.cover} />
          ))}
        </WideGrid>
        <ContentSpacer />
        <InternalButton name='See All Tools' url='/tools' />
      </Section>

      <Section>
        <h1 className="card-title">Active Projects</h1>
        <ContentSpacer />
        <Timeline>
          {activeProjects.map((project, index) => (
            <RegularProject key={index} title={project.title} description={project.description} slug={project.slug} website={project.website} icon={project.icon} cover={project.cover} dates={formatDateRange(project['start date'], project['end date'])} />
          ))}
        </Timeline>
        <ContentSpacer />
        <InternalButton name='See All Projects' url='/projects' />
      </Section>

      <Footer />
    </Container>
  );
}
