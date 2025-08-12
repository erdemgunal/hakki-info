import { Badge } from '@/components/ui/badge';

export function renderBadges(badges, variant = "blue", className = "text-sm") {
    if (!badges || badges.length === 0) return null;

    return badges.map((badge, index) => (
        <Badge 
            key={index}
            variant={variant}
            className={className}
        >
            {badge}
        </Badge>
    ));
}

export function renderTechStackBadges(techStack, maxVisible = 3, variant = "outline", className = "text-xs") {
    if (!techStack || techStack.length === 0) return null;

    const visibleBadges = techStack.slice(0, maxVisible);
    const remainingCount = techStack.length - maxVisible;

    return (
        <>
            {visibleBadges.map((tech, index) => (
                <Badge key={index} variant={variant} className={className}>
                    {tech}
                </Badge>
            ))}
            {remainingCount > 0 && (
                <Badge variant={variant} className={className}>
                    +{remainingCount}
                </Badge>
            )}
        </>
    );
} 