import React from 'react'
import { Section } from '@/components/section'
import { MiniSpacer } from './section';

interface HeaderProps {
    children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
    return (
        <header>
            <Section>
                {children}
            </Section>
        </header>
    )
}

interface HeaderTitleProps {
    children: React.ReactNode;
}

export function HeaderTitle({ children }: HeaderTitleProps) {
    return (
        <>
            <h1 className="card-title text-2xl">{children}</h1>
            <MiniSpacer />
        </>
    )
}

interface HeaderSubtitleProps {
    children: React.ReactNode;
}

export function HeaderSubtitle({ children }: HeaderSubtitleProps) {
    return (
        <h3 className="card-subtitle">{children}</h3>
    )
}