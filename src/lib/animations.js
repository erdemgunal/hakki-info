export const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 }
};

export const fadeInUpWithDelay = (delay = 0.1) => ({
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4, delay }
});

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.05
        }
    }
};

export const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
};

export const slideInFromLeft = {
    initial: { x: -15, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 }
};

export const slideInFromRight = {
    initial: { x: 15, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 }
};

export const whileInViewAnimation = (delay = 0) => ({
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4, delay }
});

export const buttonHover = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 }
};

export const slideInFromTop = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 }
};

export const rotateIn = {
    initial: { rotate: -90, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
};

export const bounceIn = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { 
        duration: 0.4,
        ease: [0.68, -0.55, 0.265, 1.55]
    }
};

export const fadeInLeft = {
    initial: { x: -30, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4 }
};

export const fadeInRight = {
    initial: { x: 30, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4 }
};