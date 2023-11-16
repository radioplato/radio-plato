import { ICON_KEY } from "../../shared/icons/icons";

export interface MenuButton {
    label: string;
    route: string;
    className: string;
}

export interface SocialButton {
    name: string;
    icon: ICON_KEY;
    link: string;
}