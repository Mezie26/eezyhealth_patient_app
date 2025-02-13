import { SvgXml } from "react-native-svg";

const icon = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4801_21628)">
<rect x="2" y="1" width="56" height="56" rx="12" fill="white"/>
<rect x="2.5" y="1.5" width="55" height="55" rx="11.5" stroke="#EAECF0"/>
<path d="M18.3333 23.1666L27.859 29.8346C28.6304 30.3746 29.016 30.6446 29.4356 30.7492C29.8061 30.8415 30.1937 30.8415 30.5643 30.7492C30.9838 30.6446 31.3695 30.3746 32.1408 29.8346L41.6666 23.1666M23.9333 38.3333H36.0666C38.0268 38.3333 39.0069 38.3333 39.7556 37.9518C40.4141 37.6163 40.9496 37.0808 41.2851 36.4223C41.6666 35.6736 41.6666 34.6935 41.6666 32.7333V25.2666C41.6666 23.3064 41.6666 22.3264 41.2851 21.5777C40.9496 20.9191 40.4141 20.3837 39.7556 20.0481C39.0069 19.6666 38.0268 19.6666 36.0666 19.6666H23.9333C21.9731 19.6666 20.993 19.6666 20.2443 20.0481C19.5857 20.3837 19.0503 20.9191 18.7147 21.5777C18.3333 22.3264 18.3333 23.3064 18.3333 25.2666V32.7333C18.3333 34.6935 18.3333 35.6736 18.7147 36.4223C19.0503 37.0808 19.5857 37.6163 20.2443 37.9518C20.993 38.3333 21.9731 38.3333 23.9333 38.3333Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_d_4801_21628" x="0" y="0" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4801_21628"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4801_21628" result="shape"/>
</filter>
</defs>
</svg>
`;
export const EmailIcon = () => <SvgXml xml={icon} />;