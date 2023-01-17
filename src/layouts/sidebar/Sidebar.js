import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@mui/material";
import LogoIcon from "../logo/LogoIcon";
import GridViewIcon from '@mui/icons-material/GridView'; 
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-router-dom'; 

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen, page }) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const SidebarContent = (
    <Box p={2} height="100%">
      <LogoIcon />
      <Box mt={2}>
        <List>
            <Link to="/recipes" style={{textDecoration: 'none', color: "#777e89"}}>
              <List component="li" disablePadding >
                  <ListItem button>
                    <ListItemIcon>
                      <GridViewIcon width="20" height="20" />
                    </ListItemIcon>
                    <ListItemText onClick={onSidebarClose}>
                        View all
                    </ListItemText>
                  </ListItem>
              </List>
            </Link>
            <Link to="planner" style={{textDecoration: 'none', color: "#777e89"}}>
              <List component="li" disablePadding >
                  <ListItem button>
                    <ListItemIcon>
                      <CalendarMonthIcon width="20" height="20" />
                    </ListItemIcon>
                    <ListItemText onClick={onSidebarClose}>
                        Planner
                    </ListItemText>
                  </ListItem>
              </List>
              </Link>
            <br />
            <Divider /> 
        </List>
      </Box>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
