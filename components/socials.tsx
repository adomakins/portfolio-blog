import React from 'react'
import { ExternalLink } from '@/components/link'

export default function Socials() {
    return (
        <div className="flex gap-4 flex-wrap">
            <ExternalLink name="Email" url="mailto:adamskjervold@gmail.com" />
            <ExternalLink name="X" url="https://x.com/adomakins" />
            <ExternalLink name="LinkedIn" url="https://www.linkedin.com/in/adam-skjervold/" />
            <ExternalLink name="GitHub" url="https://github.com/adomakins" />
            <ExternalLink name="YouTube" url="https://www.youtube.com/@adomakins" />
            <ExternalLink name="Facebook" url="https://www.facebook.com/profile.php?id=100083253759574" />
            <ExternalLink name="Instagram" url="https://www.instagram.com/adomakin.s/" />
            <ExternalLink name="TikTok" url="https://www.tiktok.com/@adomakins" />
        </div>
    );
}