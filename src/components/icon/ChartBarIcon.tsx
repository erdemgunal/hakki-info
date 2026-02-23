import { SVGProps } from 'react';

export default function ChartBarIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3 17v2h18v-2" />
            <path d="M7 9v8h2V9z" />
            <path d="M11 13v4h2v-4z" />
            <path d="M15 5v12h2V5z" />
            <path d="M19 11v6h2v-6z" />
        </svg>
    );
}
