import { SVGProps } from 'react';

export default function UpvoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Upvote</title>
      <path d="M12 3.25L3.5 11.5H8V15.5C8 17.71 9.79 19.5 12 19.5C14.21 19.5 16 17.71 16 15.5V11.5H20.5L12 3.25Z" />
    </svg>
  );
}
