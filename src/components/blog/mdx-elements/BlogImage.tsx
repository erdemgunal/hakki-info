import Image from 'next/image';

export interface BlogImageProps {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
}

export function BlogImage({
    src,
    alt,
    caption,
    width = 900,
    height = 500,
}: BlogImageProps) {
    return (
        <figure className="not-prose my-4">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full rounded-lg"
            />
            {caption && (
                <figcaption className="mt-1 text-center text-xs text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
