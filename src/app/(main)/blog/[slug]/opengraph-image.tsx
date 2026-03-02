import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/lib/blog';

export const alt = 'Blog post – hakki.info';

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

interface OGImageParams {
    params: Promise<{ slug: string }>;
}

export default async function Image({ params }: OGImageParams) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    const title = post?.title ?? 'hakki.info blog';
    const subtitle = post?.excerpt ?? 'Notes on physics, research and software development.';

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '56px 80px',
                    background: 'radial-gradient(circle at top left, #0f172a, #020617)',
                    color: 'white',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div
                        style={{
                            fontSize: 20,
                            letterSpacing: 6,
                            textTransform: 'uppercase',
                            color: 'rgba(226,232,240,0.7)',
                        }}
                    >
                        hakki.info
                    </div>
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 800,
                            lineHeight: 1.05,
                            maxWidth: 900,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            marginTop: 8,
                            fontSize: 26,
                            color: 'rgba(148,163,184,0.95)',
                            maxWidth: 820,
                        }}
                    >
                        {subtitle}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 20,
                        color: 'rgba(148,163,184,0.9)',
                    }}
                >
                    <div>physics · research · software</div>
                    <div
                        style={{
                            padding: '6px 14px',
                            borderRadius: 999,
                            border: '1px solid rgba(148,163,184,0.6)',
                            fontSize: 16,
                        }}
                    >
                        /blog/{slug}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        },
    );
}

