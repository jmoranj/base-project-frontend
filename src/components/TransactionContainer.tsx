import { ReactNode } from 'react';

interface ContainerProps {
	children: ReactNode;
}

export default function TransactionContainer({ children }: ContainerProps) {
	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				<section aria-labelledby="recent-heading" className="mt-16">
					<div className="space-y-20">
						<div>
							{children}
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}