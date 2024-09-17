import React from 'react'
import { ExternalLink } from '@/components/link'

export default function Socials() {
    return (
        <div className="flex gap-4 flex-wrap">
            <ExternalLink name="Email" url="mailto:adamskjervold@gmail.com" />
            <ExternalLink name="X" url="https://x.com/adamskjervold" />
            <ExternalLink name="LinkedIn" url="https://www.linkedin.com/in/adamskjervold/" />
            <ExternalLink name="GitHub" url="https://github.com/adamskjervold" />
            <ExternalLink name="YouTube" url="https://www.youtube.com/@adamskjervold" />
            <ExternalLink name="Facebook" url="https://www.facebook.com/adamskjervold" />
            <ExternalLink name="Instagram" url="https://www.instagram.com/adamskjervold" />
            <ExternalLink name="TikTok" url="https://www.tiktok.com/@adamskjervold" />
        </div>
    );
}