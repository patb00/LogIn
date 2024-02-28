import { Menu, MenuItem } from "@mui/material";
import React, { ReactNode, MouseEvent } from "react";

interface ContextMenuProps {
  children: ReactNode;
  copyText: () => void;
}

interface ContextMenuState {
  mouseX: number;
  mouseY: number;
}

export default function ContextMenu({ children, copyText }: ContextMenuProps) {
  const [contextMenu, setContextMenu] = React.useState<ContextMenuState | null>(
    null
  );

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
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
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
        <MenuItem onClick={handleCopy}>Copy</MenuItem>
      </Menu>
    </div>
  );
}
