import { SvgXml } from "react-native-svg";

const email = `<svg width="47" height="48" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="23.4956" cy="23.9761" r="23.2705" fill="#D9D9D9"/>
<path d="M34.5215 16.9705L23.4966 26.4161L12.4717 16.9705V16.4248H34.5215V16.9705ZM34.5215 30.2923L27.2285 25.038L34.5215 18.7217V30.2923ZM12.4717 18.7217L19.7647 25.038L12.4717 30.2923V18.7217ZM23.4966 28.283L26.511 25.6416L34.5215 31.4123V31.5271H12.4717V31.4123L20.4822 25.6416L23.4966 28.283Z" fill="#44CE2D"/>
</svg>

`;
export const Email = () => <SvgXml xml={email} width="100%" height="100%" />;