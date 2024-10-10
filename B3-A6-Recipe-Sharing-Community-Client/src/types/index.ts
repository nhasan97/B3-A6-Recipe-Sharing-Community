import { SVGProps } from "react";
import { ThemeProviderProps } from "next-themes/dist/types";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
