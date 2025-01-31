import { SvgXml } from "react-native-svg";

const icon = `<svg width="25" height="24" viewBox="0 4 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.83331 10C3.83331 8.11438 3.83331 7.17157 4.4191 6.58579C5.00489 6 5.94769 6 7.83331 6H17.8333C19.7189 6 20.6617 6 21.2475 6.58579C21.8333 7.17157 21.8333 8.11438 21.8333 10V11H3.83331V10Z" stroke="#44CE2D" stroke-opacity="0.25" stroke-width="1.2"/>
<rect x="3.83331" y="6" width="18" height="15" rx="2" stroke="#44CE2D" stroke-width="1.2"/>
<path d="M7.83331 3L7.83331 8" stroke="#44CE2D" stroke-width="1.2" stroke-linecap="round"/>
<path d="M17.8333 3L17.8333 8" stroke="#44CE2D" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;

export const CalenderIcon = () => <SvgXml xml={icon}/>