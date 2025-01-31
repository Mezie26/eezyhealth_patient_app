import { SvgXml } from "react-native-svg";

const icon = `<svg width="20" height="20" viewBox="0 3 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path d="M16.25 10C16.25 14.1083 11.8355 16.9028 10.4267 17.6901C10.1595 17.8393 9.84048 17.8393 9.57334 17.6901C8.16447 16.9028 3.75 14.1083 3.75 10C3.75 6.25 6.77834 3.75 10 3.75C13.3333 3.75 16.25 6.25 16.25 10Z" stroke={color} />
<circle cx="10" cy="9.99996" r="2.83333" stroke={color}/>
</svg>
`;
export const Locations = ({color}: {color: string}) => <SvgXml xml={icon.replace('{color}', color).replace('{color}', color)} />;