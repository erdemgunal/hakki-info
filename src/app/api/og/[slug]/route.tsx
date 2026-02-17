import React from 'react';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { fetchProjectBySlug } from '@/lib/fetch-resume-data';
import seo from '@/config/seo.json';

export const runtime = 'nodejs';

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug;
    const project = await fetchProjectBySlug(slug);

    if (!project) return new Response('Not found', { status: 404 });

    const clampText = (text: string, max: number) => 
        text.length > max ? `${text.substring(0, max)}...` : text;

    const title = clampText(project.seoTitle ?? project.title, 55); 
    const description = clampText(project.seoDescription ?? project.description, 160);

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '80px',
                    fontFamily: 'system-ui, sans-serif',
                    background: '#020617',
                    color: '#f8fafc',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', borderRadius: '100%' }} />
                
                {/* header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                    <span style={{ fontSize: '24px', fontWeight: 500, color: '#94a3b8' }}>
                        {seo.siteName} / {project.label || 'Project'}
                    </span>
                </div>

                {/* main content area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1, justifyContent: 'center' }}>
                    <h1 style={{
                        fontSize: title.length > 40 ? '72px' : '84px',
                        lineHeight: 1.1,
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        background: 'linear-gradient(to bottom right, #ffffff, #94a3b8)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        margin: 0,
                    }}>
                        {title}
                    </h1>
                    <p style={{
                        fontSize: '30px',
                        lineHeight: 1.5,
                        color: '#94a3b8',
                        maxWidth: '900px',
                        margin: 0,
                    }}>
                        {description}
                    </p>
                </div>

                {/* footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {project.techStack?.slice(0, 5).map((tech: string) => (
                                <div key={tech} style={{ padding: '4px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontSize: '16px', color: '#cbd5e1' }}>
                                    {tech}
                                </div>
                            ))}
                        </div>
                        <span style={{ fontSize: '20px', color: '#475569', fontWeight: 600 }}>
                            {seo.url.replace(/^https?:\/\//, '')} • {project.year}
                        </span>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}