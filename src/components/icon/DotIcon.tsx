import { SVGProps } from 'react';

export default function DotIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
            <circle cx="12" cy="12" r="2.5" />
        </svg>
    );
}
