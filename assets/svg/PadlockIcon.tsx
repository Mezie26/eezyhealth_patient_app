import { SvgXml } from "react-native-svg";

const icon = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4805_15331)">
<rect x="2" y="1" width="56" height="56" rx="12" fill="white"/>
<rect x="2.5" y="1.5" width="55" height="55" rx="11.5" stroke="#EAECF0"/>
<path d="M35.8334 26.6667V24.3333C35.8334 21.1117 33.2217 18.5 30.0001 18.5C26.7784 18.5 24.1667 21.1117 24.1667 24.3333V26.6667M30.0001 31.9167V34.25M26.2667 39.5H33.7334C35.6936 39.5 36.6737 39.5 37.4224 39.1185C38.081 38.783 38.6164 38.2475 38.9519 37.589C39.3334 36.8403 39.3334 35.8602 39.3334 33.9V32.2667C39.3334 30.3065 39.3334 29.3264 38.9519 28.5777C38.6164 27.9191 38.081 27.3837 37.4224 27.0481C36.6737 26.6667 35.6936 26.6667 33.7334 26.6667H26.2667C24.3066 26.6667 23.3265 26.6667 22.5778 27.0481C21.9192 27.3837 21.3838 27.9191 21.0482 28.5777C20.6667 29.3264 20.6667 30.3065 20.6667 32.2667V33.9C20.6667 35.8602 20.6667 36.8403 21.0482 37.589C21.3838 38.2475 21.9192 38.783 22.5778 39.1185C23.3265 39.5 24.3066 39.5 26.2667 39.5Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_d_4805_15331" x="0" y="0" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4805_15331"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4805_15331" result="shape"/>
</filter>
</defs>
</svg>
`;

export const PadlockIcon = () => <SvgXml xml={icon}/>