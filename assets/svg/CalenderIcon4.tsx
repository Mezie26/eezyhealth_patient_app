import { SvgXml } from "react-native-svg";

const icon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2" y="4" width="12" height="10" rx="2" stroke={color}/>
<path d="M2 6.66667C2 6.04669 2 5.7367 2.06815 5.48236C2.25308 4.79218 2.79218 4.25308 3.48236 4.06815C3.7367 4 4.04669 4 4.66667 4H11.3333C11.9533 4 12.2633 4 12.5176 4.06815C13.2078 4.25308 13.7469 4.79218 13.9319 5.48236C14 5.7367 14 6.04669 14 6.66667H2Z" fill={color}/>
<path d="M4.66699 2L4.66699 4" stroke={color} stroke-linecap="round"/>
<path d="M11.333 2L11.333 4" stroke={color} stroke-linecap="round"/>
</svg>
`;

export const CalenderIcon4 = ({color}: {color: string}) => <SvgXml xml={icon.replace('{color}', color).replace('{color}', color)}/>