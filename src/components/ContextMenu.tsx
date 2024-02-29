import { Menu, MenuItem, Box } from "@mui/material";
import { ReactNode, MouseEvent, useState } from "react";

interface ContextMenuProps {
  children: ReactNode;
  copyText: () => void;
  canCopy?: boolean;
  menuItem: Array<{
    label: string;
    onClick: () => void;
    menuText: string;
  }>;
}

interface ContextMenuState {
  mouseX: number;
  mouseY: number;
}

export default function ContextMenu({
  children,
  copyText,
  canCopy = true,
  menuItem,
}: ContextMenuProps) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX + 2, mouseY: event.clientY - 6 }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleCopy = () => {
    copyText();
    handleClose();
  };

  return (
    <Box onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      {children}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {canCopy && <MenuItem onClick={handleCopy}>Copy</MenuItem>}
        {menuItem
          .filter((item) => item.label)
          .map((item, index) => (
            <MenuItem key={index} onClick={item.onClick}>
              {item.menuText}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
}
