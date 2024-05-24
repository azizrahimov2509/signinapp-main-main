import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import DescriptionIcon from "@mui/icons-material/Description";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 300;

export default function Layout() {
  const [hoveredIcons, setHoveredIcons] = useState(Array(4).fill(false));
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    avatar: "",
    name: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser({
        avatar: currentUser.avatar,
        name: currentUser.name,
      });
    }
  }, []);

  const handleIconHover = (index, isHovered) => {
    const newHoveredIcons = [...hoveredIcons];
    newHoveredIcons[index] = isHovered;
    setHoveredIcons(newHoveredIcons);
  };

  const handleNavigation = (path, item) => {
    setActiveItem(item);
    navigate(path);
  };

  const handleLogOut = () => {
    // localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const iconStyle = {
    fontSize: 45,
    borderRadius: "16px",
    padding: "10px",
  };

  const listItemButtonStyle = {
    padding: "15px",
    borderRadius: "20px",
    height: 70,
    fontSize: "20px",
    width: 250,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  };

  const activeItemStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#060B26",
            color: "white",
            fontFamily: "Poppins, sans-serif",
          },
        }}
        open
      >
        <div>
          <Toolbar>
            <div className="userData">
              <div className="usedInfo">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    width={45}
                    height={45}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    src="../../../public/vite.svg"
                    alt="Default Avatar"
                    width={45}
                    height={45}
                    style={{ borderRadius: "50%" }}
                  />
                )}
                {user.name && <span>{user.name}</span>}
              </div>
            </div>
          </Toolbar>

          <Divider />
          <List>
            {["Dashboard", "Products"].map((text, index) => (
              <ListItem key={text}>
                <ListItemButton
                  sx={{
                    ...listItemButtonStyle,
                    ...(activeItem === text ? activeItemStyle : {}),
                  }}
                  onMouseEnter={() => handleIconHover(index, true)}
                  onMouseLeave={() => handleIconHover(index, false)}
                  onClick={() =>
                    handleNavigation(
                      text === "Dashboard" ? "home" : "products",
                      text
                    )
                  }
                >
                  <ListItemIcon>
                    {index === 0 ? (
                      <HomeIcon
                        sx={{
                          ...iconStyle,
                          color:
                            activeItem === text || hoveredIcons[index]
                              ? "white"
                              : "blue",
                          background:
                            activeItem === text || hoveredIcons[index]
                              ? "blue"
                              : "#1A1F37",
                        }}
                      />
                    ) : (
                      <EqualizerIcon
                        sx={{
                          ...iconStyle,
                          color:
                            activeItem === text || hoveredIcons[index]
                              ? "white"
                              : "blue",
                          background:
                            activeItem === text || hoveredIcons[index]
                              ? "blue"
                              : "#1A1F37",
                        }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <h4
            style={{ textAlign: "start", paddingLeft: "28px", fontWeight: 500 }}
          >
            ACCOUNT PAGES
          </h4>
          <List>
            {["Sign up", "Log out"].map((text, index) => (
              <ListItem key={text}>
                <ListItemButton
                  sx={listItemButtonStyle}
                  onMouseEnter={() => handleIconHover(index + 2, true)}
                  onMouseLeave={() => handleIconHover(index + 2, false)}
                  onClick={() => {
                    if (text === "Log out") {
                      handleLogOut();
                    } else {
                      handleNavigation("/", text);
                    }
                  }}
                >
                  <ListItemIcon>
                    {index === 0 ? (
                      <DescriptionIcon
                        sx={{
                          ...iconStyle,
                          color:
                            activeItem === text || hoveredIcons[index + 2]
                              ? "white"
                              : "blue",
                          background:
                            activeItem === text || hoveredIcons[index + 2]
                              ? "blue"
                              : "#1A1F37",
                        }}
                      />
                    ) : (
                      <RocketLaunchIcon
                        sx={{
                          ...iconStyle,
                          color:
                            activeItem === text || hoveredIcons[index + 2]
                              ? "white"
                              : "blue",
                          background:
                            activeItem === text || hoveredIcons[index + 2]
                              ? "blue"
                              : "#1A1F37",
                        }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
