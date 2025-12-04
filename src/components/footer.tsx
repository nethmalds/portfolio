
export function Footer() {
	return (
		<div className="mt-12 border-t border-border/40 py-8">
			<div className="flex justify-center">
				<p className="text-xs leading-5 text-muted-foreground">
					&copy; {new Date().getFullYear()} Dasun Sri Nethmal. All rights reserved.
				</p>
			</div>
		</div>
	);
}
