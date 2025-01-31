import React from 'react';
import { SvgXml } from 'react-native-svg';

const icon = ` 
<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 8.75967C0.5 7.40191 0.5 6.72303 0.774461 6.1263C1.04892 5.52956 1.56437 5.08775 2.59525 4.20413L3.59525 3.34699C5.45857 1.74986 6.39023 0.951294 7.5 0.951294C8.60977 0.951294 9.54143 1.74986 11.4047 3.34699L12.4047 4.20413C13.4356 5.08775 13.9511 5.52956 14.2255 6.1263C14.5 6.72303 14.5 7.40191 14.5 8.75967V13.0001C14.5 14.8857 14.5 15.8285 13.9142 16.4143C13.3284 17.0001 12.3856 17.0001 10.5 17.0001H4.5C2.61438 17.0001 1.67157 17.0001 1.08579 16.4143C0.5 15.8285 0.5 14.8857 0.5 13.0001V8.75967Z" 
stroke={color}/>
</svg>



`;
export const HomeIcon = ({ color, secondaryColor, size }: { color: string; secondaryColor: string; size: number }) => (
	<SvgXml
		xml={icon.replace('{color}', color).replace('{secondaryColor}', secondaryColor)}
		width={size}
		height={size}
	/>
);
