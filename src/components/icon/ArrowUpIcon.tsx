import { SVGProps } from 'react';

export default function ArrowUpIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            {...props}
        >
            <path d="M8 13V3" />
            <path d="M4 7l4-4 4 4" />
        </svg>
    );
}
