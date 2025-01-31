import { SvgXml } from "react-native-svg";

const icon = `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3655_8537)">
<rect x="13" y="10" width="34" height="34" rx="17" fill="white"/>
<path d="M35.7071 28.7071L38.3552 31.3552C38.7113 31.7113 38.7113 32.2887 38.3552 32.6448C36.43 34.57 33.3821 34.7866 31.204 33.153L29.6286 31.9714C27.885 30.6638 26.3362 29.115 25.0286 27.3714L23.847 25.796C22.2134 23.6179 22.43 20.57 24.3552 18.6448C24.7113 18.2887 25.2887 18.2887 25.6448 18.6448L28.2929 21.2929C28.6834 21.6834 28.6834 22.3166 28.2929 22.7071L27.2717 23.7283C27.1095 23.8905 27.0692 24.1385 27.1719 24.3437C28.3585 26.7171 30.2829 28.6415 32.6563 29.8281C32.8615 29.9308 33.1095 29.8905 33.2717 29.7283L34.2929 28.7071C34.6834 28.3166 35.3166 28.3166 35.7071 28.7071Z" stroke="#44CE2D"/>
</g>
<defs>
<filter id="filter0_d_3655_8537" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-2" dy="1"/>
<feGaussianBlur stdDeviation="5.5"/>
<e in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3655_8537"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3655_8537" result="shape"/>
</filter>
</defs>
</svg>`

export const CallLogo = () => <SvgXml xml={icon}/>;