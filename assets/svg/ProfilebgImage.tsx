import { SvgXml } from "react-native-svg";

const profilebg = `<svg width="31" height="22" viewBox="0 0 31 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.657 1.37684L15.6952 14.1954L0.733398 1.37684V0.63623H30.657V1.37684ZM30.657 19.4557L20.7598 12.3251L30.657 3.75327V19.4557ZM0.733398 3.75327L10.6306 12.3251L0.733398 19.4557V3.75327ZM15.6952 16.7289L19.786 13.1443L30.657 20.9756V21.1314H0.733398V20.9756L11.6044 13.1443L15.6952 16.7289Z" fill="#44CE2D"/>
</svg> 
`;
export const Profilebg = () => <SvgXml xml={profilebg} width="100%" height="100%" />;