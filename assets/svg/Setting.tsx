import { SvgXml } from "react-native-svg";

const setting = `<svg width="18" height="18" viewBox="0 0 18 18" fill="#1E2428" xmlns="http://www.w3.org/2000/svg">
<path d="M0 14V16H6V14H0ZM0 2V4H10V2H0ZM10 18V16H18V14H10V12H8V18H10ZM4 6V8H0V10H4V12H6V6H4ZM18 10V8H8V10H18ZM12 6H14V4H18V2H14V0H12V6Z" fill="black"/>
</svg>

`;
export const Setting = () => <SvgXml xml={setting} width="38%" height="38%" />;