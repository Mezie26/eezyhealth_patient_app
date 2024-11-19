import { SvgXml } from "react-native-svg";

const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 8L2 12M2 12L6 16M2 12H22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> 

`;
export const Back = () => <SvgXml xml={icon} />;