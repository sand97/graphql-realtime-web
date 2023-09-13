import * as React from 'react';
import styles from "../Application.module.css";
import navigation_config from "../navigation_config";
import {Box, ButtonBase, Drawer, IconButton} from "@mui/material";
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import useResponsive from "../../../hooks/useResponsive";

interface NavbarProps {
    open: boolean
    onClose: () => void
}

const Navbar = (props: NavbarProps) => {
    const history = useHistory();
    const {t} = useTranslation();
    const isDesktop = useResponsive('up', 'lg');

    const content = <div className={styles.navbar}>
        {
            navigation_config.map(menu => {
                const active = history.location.pathname === menu.href;
                const {icon: Icon} = menu;
                return <ButtonBase
                    key={menu.title}
                    onClick={() => {
                        history.push(menu.href);
                        props.onClose();
                    }}
                    sx={{
                        py: 2,
                        pl: 2,
                        display: 'flex',
                        justifyContent: "flex-start",
                        fontWeight: active ? 600 : 400,
                        '& path': {
                            transitionDuration: '200ms',
                            strokeWidth: active ? 1.5 : 1,
                            fill: theme =>  active ? theme.palette.primary.main : 'transparent',
                        }
                    }}>
                    {Icon && <Box sx={{
                        mr: 2,
                    }}>
                        <Icon/>
                    </Box>}
                    {t(menu.title)}
                </ButtonBase>
            })
        }
    </div>;

    return (
        isDesktop ? content : <Drawer sx={{ position: 'relative' }}
                                      open={props.open}
                                      onClose={props.onClose}>
            <IconButton
                onClick={props.onClose}
                sx={{
                position: 'absolute',
                right: 16,
                top: 24
            }}>
                <img src="/icons/CloseSquare.svg" width={32} alt=""/>
            </IconButton>
            {content}
        </Drawer>
    );
};

export default Navbar