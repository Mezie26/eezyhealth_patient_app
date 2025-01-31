import { SvgXml } from "react-native-svg";

const successIcon = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#91DD85"/>
<path d="M16 34L23.2331 39.4248C23.6618 39.7463 24.2677 39.6728 24.607 39.2581L42 18" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`;
export const SuccessIcon = () => <SvgXml xml={successIcon} width="15%" height="15%" />;