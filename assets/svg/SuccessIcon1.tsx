import { SvgXml } from "react-native-svg";

const icon = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4805_15326)">
<rect x="2" y="1" width="56" height="56" rx="12" fill="white"/>
<rect x="2.5" y="1.5" width="55" height="55" rx="11.5" stroke="#EAECF0"/>
<path d="M24.7499 29L28.2499 32.5L35.2499 25.5M41.6666 29C41.6666 35.4434 36.4432 40.6667 29.9999 40.6667C23.5566 40.6667 18.3333 35.4434 18.3333 29C18.3333 22.5567 23.5566 17.3334 29.9999 17.3334C36.4432 17.3334 41.6666 22.5567 41.6666 29Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_d_4805_15326" x="0" y="0" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4805_15326"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4805_15326" result="shape"/>
</filter>
</defs>
</svg>
`;

export const SuccessIcon1 = () => <SvgXml xml={icon}/>