import { SvgXml } from "react-native-svg";

const arrowback = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_1041_1647" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
<rect x="0.333313" width="20" height="20" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_1041_1647)">
<path d="M16.1653 10H4.49868M4.49868 10L10.332 4.16667M4.49868 10L10.332 15.8333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.1653 10H4.49868M4.49868 10L10.332 4.16667M4.49868 10L10.332 15.8333" stroke="black" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
`;
export const ArrowBack = () => <SvgXml xml={arrowback} />;