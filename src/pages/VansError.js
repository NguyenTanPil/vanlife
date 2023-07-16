import React from 'react';
import { useRouteError } from 'react-router-dom';

const VansError = () => {
	const error = useRouteError();

	return (
		<div>
			<h3>{error._bodyText}</h3>
			<pre>
				{error.status} - {error.statusText}
			</pre>
		</div>
	);
};

export default VansError;
