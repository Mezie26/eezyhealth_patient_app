import { SvgXml } from "react-native-svg";

const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" rx="10" fill="#D5D5D5"/>
<path d="M6.25 10L8.75 12.5L13.75 7.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const CheckIcon = () => <SvgXml xml={icon}/>