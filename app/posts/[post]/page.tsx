import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import Footer from '@/components/footer'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionQuery } from '@/lib/utils'
import { ContentSpacer } from '@/components/section'

export default async function Post({ params }: { params: { post: string } }) {
    const filterOptions: QueryDatabaseParameters['filter'] = {
        property: 'Slug',
        rich_text: {
            equals: params.post
        }
    }
    const post = await notionQuery('Posts', filterOptions, undefined).then((post) => post[0]);

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

            <Footer />
        </Container >
    );
}
