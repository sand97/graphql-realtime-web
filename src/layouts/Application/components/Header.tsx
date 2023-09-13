// @flow
import * as React from 'react';
import {AppBar, Button, Box, IconButton, Toolbar, MenuItem, Typography, Menu} from "@mui/material";
import useResponsive from "../../../hooks/useResponsive";
import {useHistory} from "react-router";
import { useLocation } from "react-router-dom";
import {useTranslation} from "react-i18next";
import {UserContext, UserContextType} from "../../../contexts/UserContext";

type HeaderProps = {
    handleOpenMenu: () => void
};
export const Header = (props: HeaderProps) => {
    const isDesktop = useResponsive('up', 'lg');
    const history = useHistory();
    const location = useLocation();
    const {t} = useTranslation();
    const {logout} = React.useContext(UserContext) as UserContextType;
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const menu = ["logout_user", "profile_user"] as const

    const handleCloseUserMenu = (value?: string) => {
        let href = "";
        if (value == "logout_user") {
            handleLogout();
        } else if (value === "profile_user") {
            href = "/app/profile";
        }
        if (location.pathname === href) window.location.reload();
        else if(href) history.push(href);
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        logout();
        history.push("/auth/login");
    };

    return (
        <AppBar
            sx={{
                width: '100%',
                borderBottom: '1px solid #E5E5E5'
            }}
            elevation={0}
            color={'transparent'}
            position="static">
            <Menu
                sx={{ mt: "50px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
            >
                {menu.map((item) => (
                    <MenuItem
                        key={item}
                        onClick={() => {
                            handleCloseUserMenu(item);
                        }}
                    >
                        {t(item)}
                    </MenuItem>
                ))}
            </Menu>
            <Toolbar>
                <Box width={64}>
                    {!isDesktop && <IconButton
                        size="large"
                        edge="start"
                        onClick={props.handleOpenMenu}
                        color="inherit"
                        aria-label="menu"
                    >
                        <img src="/icons/menu.svg" width={28} alt=""/>
                    </IconButton>}
                </Box>
                <Box component="div" sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                    <img src="/logo.svg" width={38} alt=""/>
                </Box>
                <Box width={64} display={'flex'} justifyContent={'flex-end'}>
                    <IconButton color="inherit" onClick={(e) => {
                        setAnchorElUser(e.currentTarget);
                    }}>
                        <img src="/icons/Profile.svg" width={28} alt=""/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};