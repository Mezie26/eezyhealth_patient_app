import React from 'react';
import { SvgXml } from 'react-native-svg';

const icon = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.83334 10C3.83334 8.11438 3.83334 7.17157 4.41913 6.58579C5.00492 6 5.94773 6 7.83334 6H17.8333C19.719 6 20.6618 6 21.2476 6.58579C21.8333 7.17157 21.8333 8.11438 21.8333 10V11H3.83334V10Z" stroke={color1} stroke-opacity="0.25" stroke-width="1.2"/>
<rect x="3.83334" y="6" width="18" height="15" rx="2" stroke={color} stroke-width="1.2"/>
<path d="M7.83334 3L7.83334 8" stroke={secondaryColor} stroke-width="1.2" stroke-linecap="round"/>
<path d="M17.8333 3L17.8333 8" stroke={color2} stroke-width="1.2" stroke-linecap="round"/>
</svg>
`;
export const AppointmentIcon = ({ color, secondaryColor, size, color1, color2 }: { color: string; secondaryColor: string; size: number; color1: string; color2: string}) => (
	<SvgXml
		xml={icon.replace('{color}', color).replace('{secondaryColor}', secondaryColor).replace('{color1}', color1).replace('{color2}', color2)}
		width={size}
		height={size}
	/>
);