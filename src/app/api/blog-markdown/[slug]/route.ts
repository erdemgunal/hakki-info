import { getBlogPostBySlug } from '@/lib/blog';
import { NextResponse } from 'next/server';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return new NextResponse(post.content, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
}
