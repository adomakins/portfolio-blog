import Container from '@/components/container'
import { Header, HeaderTitle, HeaderSubtitle } from '@/components/header'
import Footer from '@/components/footer'

export default async function About() {

    return (
        <Container>
            <Header>
                <HeaderTitle>About Me</HeaderTitle>
                <HeaderSubtitle>This page will have a detailed history of my recent entrepreneurial journey.</HeaderSubtitle>
            </Header>

            <Footer />
        </Container >
    );
}
