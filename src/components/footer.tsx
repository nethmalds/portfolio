export function Footer() {
	return (
		<div className="mt-8 w-full md:mt-12 border-t border-border/40 mx-auto py-6 md:py-8 px-4 sm:px-6 overflow-x-hidden">
			<div className="flex justify-center">
				<p className="text-xs md:text-sm leading-5 text-muted-foreground text-center">
					&copy; {new Date().getFullYear()} Dasun Sri Nethmal. All rights
					reserved.
				</p>
			</div>
		</div>
	);
}
