import { SVGProps } from 'react';

export default function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            {...props}
        >
            <path d="M3 8h10" />
            <path d="M9 4l4 4-4 4" />
        </svg>
    );
}
