export function Footer() {
	return (
		<div className="mt-8 md:mt-12 max-w-screen-2xl mx-auto border-t border-border/40 py-6 md:py-8 px-4 sm:px-6">
			<div className="flex justify-center">
				<p className="text-xs leading-5 text-muted-foreground text-center">
					&copy; {new Date().getFullYear()} Dasun Sri Nethmal. All rights
					reserved.
				</p>
			</div>
		</div>
	);
}
