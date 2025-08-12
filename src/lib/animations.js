export const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
};

export const fadeInUpWithDelay = (delay = 0.2) => ({
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, delay }
});

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
};

export const slideInFromLeft = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4 }
};

export const slideInFromRight = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4 }
};

export const whileInViewAnimation = (delay = 0) => ({
    initial: { y: 30, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, delay }
});

export const buttonHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
};

export const cardHover = {
    whileHover: { 
        y: -5,
        transition: { duration: 0.2 }
    }
}; 