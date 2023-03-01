import type { FC, PropsWithChildren } from "react";
import Styles from "./Header.module.css";

export const Header: FC<PropsWithChildren<{}>> = ({ children }) => (
  <h2 className={Styles["my-h2"]}>Ащщ{children}</h2>
);
