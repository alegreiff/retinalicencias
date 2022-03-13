import NextLink from "next/link";
import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { StoreContext } from "../store";

export const TopMenu = () => {
  const {
    state: { elementosMenu },
  } = useContext(StoreContext);
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <NextLink href="/" passHref>
          <MenuItem icon={<ExternalLinkIcon />}>Inicio</MenuItem>
        </NextLink>

        {elementosMenu &&
          elementosMenu.map((elem) => (
            <NextLink key={elem[0]} href={`${elem[0]}`} passHref>
              <MenuItem icon={<ExternalLinkIcon />}>{elem[1]} </MenuItem>
            </NextLink>
          ))}
      </MenuList>
    </Menu>
  );
};
