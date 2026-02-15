import { Badge } from '@/components/ui/badge';
import { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';

export function renderBadges(badges: string[], variant = "default", className = "text-sm") {
    if (!badges || badges.length === 0) return null;

    return badges.map((badge: string, index: number) => (
        <Badge 
            key={index}
            variant={variant as VariantProps<typeof badgeVariants>['variant']}
            className={className as string}
        >
            {badge}
        </Badge>
    ));
}

export function renderTechStackBadges(techStack: string[], maxVisible = 3, variant = "outline", className = "text-xs") {
    if (!techStack || techStack.length === 0) return null;

    const visibleBadges = techStack.slice(0, maxVisible);
    const remainingCount = techStack.length - maxVisible;

    return (
        <>
            {visibleBadges.map((tech: string, index: number) => (
                <Badge key={index} variant={variant as VariantProps<typeof badgeVariants>['variant']} className={className as string}>
                    {tech}
                </Badge>
            ))}
            {remainingCount > 0 && (
                <Badge variant={variant as VariantProps<typeof badgeVariants>['variant']} className={className as string}>
                    +{remainingCount}
                </Badge>
            )}
        </>
    );
} 