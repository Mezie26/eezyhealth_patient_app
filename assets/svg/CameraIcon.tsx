import { SvgXml } from "react-native-svg";

const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="#3B97CC"/>
<path d="M4.5 10.2117C4.5 9.3584 5.19176 8.66665 6.04508 8.66665V8.66665C6.63032 8.66665 7.16533 8.33599 7.42705 7.81254L8.11111 6.44442C8.11378 6.43908 8.11512 6.43641 8.11637 6.43393C8.45523 5.76087 9.14364 5.33541 9.89719 5.33332C9.89996 5.33331 9.90295 5.33331 9.90893 5.33331H14.0911C14.0971 5.33331 14.1 5.33331 14.1028 5.33332C14.8564 5.33541 15.5448 5.76087 15.8836 6.43393C15.8849 6.43641 15.8862 6.43908 15.8889 6.44442L16.5729 7.81254C16.8347 8.33599 17.3697 8.66665 17.9549 8.66665V8.66665C18.8082 8.66665 19.5 9.3584 19.5 10.2117V14.3809C19.5 15.5779 19.5 16.1764 19.3316 16.6575C19.0301 17.5192 18.3526 18.1968 17.4908 18.4983C17.0097 18.6666 16.4112 18.6666 15.2143 18.6666H8.78571C7.58876 18.6666 6.99028 18.6666 6.50916 18.4983C5.64742 18.1968 4.96989 17.5192 4.66835 16.6575C4.5 16.1764 4.5 15.5779 4.5 14.3809V10.2117Z" stroke="white"/>
<circle cx="11.9998" cy="12.8333" r="2.83333" stroke="white"/>
</svg>
`;

export const CameraIcon = () => <SvgXml xml={icon}/>