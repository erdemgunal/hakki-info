'use client';

import { useState } from 'react';
import UpvoteIcon from '@/components/icon/UpvoteIcon';
import TwitterIcon from '@/components/icon/TwitterIcon';
import LinkedInIcon from '@/components/icon/LinkedInIcon';
import FacebookIcon from '@/components/icon/FacebookIcon';

interface PostSidebarProps {
    title: string;
    shareUrl: string;
}

export function PostSidebar({ title, shareUrl }: PostSidebarProps) {
    const [upvoted, setUpvoted] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState('');
    const baseUpvotes = 1178;

    const handleUpvote = () => {
        setUpvoted(!upvoted);
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle email subscription
        console.log('Subscribe:', email);
        setEmail('');
        setShowEmailForm(false);
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    return (
        <aside className="space-y-6" aria-label="Post interactions">
            {/* Upvote */}
            <button
                onClick={handleUpvote}
                className={`flex items-center gap-3 px-4 py-2 border transition-all ${
                    upvoted 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-background border-border hover:bg-muted'
                }`}
            >
                <UpvoteIcon className="w-5 h-5" />
                <span className="font-semibold">Upvote</span>
                <span className={upvoted ? 'font-bold' : 'text-muted-foreground'}>
                    {baseUpvotes + (upvoted ? 1 : 0)}
                </span>
            </button>

            {/* Like this post / Email subscription */}
            <div className="space-y-3">
                {!showEmailForm ? (
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-foreground">Like this post?</span>
                        <button
                            onClick={() => setShowEmailForm(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                        >
                            Subscribe by Email
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Like this post?</h3>
                        <p className="text-xs text-muted-foreground">
                            Enter your email address to get email alerts about new posts on this site. Unsubscribe anytime.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="flex-1 px-3 py-2 text-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Social Share */}
            <div className="flex gap-2">
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-black hover:bg-black/90 text-white text-xs font-semibold transition-colors"
                    aria-label="Post on X"
                >
                    <TwitterIcon className="w-4 h-4" />
                    Post
                </a>
                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-[#1877f2] hover:bg-[#1877f2]/90 text-white text-xs font-semibold transition-colors"
                    aria-label="Share on Facebook"
                >
                    <FacebookIcon className="w-4 h-4" />
                    Share
                </a>
                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-[#0077b5] hover:bg-[#0077b5]/90 text-white text-xs font-semibold transition-colors"
                    aria-label="Share on LinkedIn"
                >
                    <LinkedInIcon className="w-4 h-4" />
                    Share
                </a>
            </div>
        </aside>
    );
}