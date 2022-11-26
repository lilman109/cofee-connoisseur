import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CoffeStore = () => {
	const router = useRouter().query.id;
	return (
		<div>
			Coffee Store Page {router}
			<Link href={'/'}>Back to Home</Link>
		</div>
	);
};

export default CoffeStore;
