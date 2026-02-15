export default function Header() {
    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="bg-surface/80 backdrop-blur-md border-[0.5px] border-border rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/5 px-4 sm:px-6 py-3 sm:py-3.5">
                <nav className="flex items-center">
                    <span className="text-foreground font-heading font-bold text-lg sm:text-xl">
                        Hakkı Erdem
                    </span>
                </nav>
            </div>
        </header>
    );
}