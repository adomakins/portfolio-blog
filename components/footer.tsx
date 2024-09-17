import { Section, SectionTitle, SectionSubtitle, ContentSpacer, MiniSpacer } from './section'
import Socials from './socials'
import { InternalLink } from '@/components/link'

export default function Footer() {
    return (
        <footer>
            <Section>
                <SectionTitle>
                    Get in Touch
                </SectionTitle>
                <SectionSubtitle>
                    For business inquiries, the best way to reach me is via email.
                </SectionSubtitle>
                <MiniSpacer />
                <Socials />
                <ContentSpacer />
                <SectionSubtitle>
                    Or explore more of my website below.
                </SectionSubtitle>
                <MiniSpacer />
                <div className="flex gap-4 flex-wrap">
                    <InternalLink name="Home" url="/" />
                    <InternalLink name="Posts" url="/posts" />
                    <InternalLink name="Projects" url="/projects" />
                    <InternalLink name="Tools" url="/tools" />
                </div>
            </Section>
        </footer>
    )
}