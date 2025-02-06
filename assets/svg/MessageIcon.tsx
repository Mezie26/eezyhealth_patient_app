import React from 'react';
import { SvgXml } from 'react-native-svg';

const icon = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="4.16667" y="6" width="16" height="12" rx="2" stroke={color}/>
<path d="M4.16667 9L11.2722 12.5528C11.8353 12.8343 12.498 12.8343 13.0611 12.5528L20.1667 9" stroke={secondaryColor}/>
</svg>
`;
export const MessageIcon = ({ color, secondaryColor, size }: { color: string; secondaryColor: string; size: number }) => (
	<SvgXml
		xml={icon.replace('{color}', color).replace('{secondaryColor}', secondaryColor)}
		//width={size}
		//height={size}
	/>
);
