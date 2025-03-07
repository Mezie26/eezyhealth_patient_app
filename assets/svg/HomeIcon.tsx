import React from 'react';
import { SvgXml } from 'react-native-svg';

const icon = ` <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 12.7597C5.5 11.4019 5.5 10.723 5.77446 10.1263C6.04892 9.52956 6.56437 9.08775 7.59525 8.20413L8.59525 7.34699C10.4586 5.74986 11.3902 4.95129 12.5 4.95129C13.6098 4.95129 14.5414 5.74986 16.4047 7.34699L17.4047 8.20413C18.4356 9.08775 18.9511 9.52956 19.2255 10.1263C19.5 10.723 19.5 11.4019 19.5 12.7597V17.0001C19.5 18.8857 19.5 19.8285 18.9142 20.4143C18.3284 21.0001 17.3856 21.0001 15.5 21.0001H9.5C7.61438 21.0001 6.67157 21.0001 6.08579 20.4143C5.5 19.8285 5.5 18.8857 5.5 17.0001V12.7597Z" stroke={color}/>
<path d="M15 21V16C15 15.4477 14.5523 15 14 15H11C10.4477 15 10 15.4477 10 16V21" stroke={secondaryColor} stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export const HomeIcon = ({ color, secondaryColor, size }: { color: string; secondaryColor: string; size: number }) => (
	<SvgXml
		xml={icon.replace('{color}', color).replace('{secondaryColor}', secondaryColor)}
		width={size}
		height={size}
	/>
);
