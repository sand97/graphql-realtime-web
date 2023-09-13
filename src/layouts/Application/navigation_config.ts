import React from "react";
import {ReactComponent as SupervisionIcon} from "assets/Bag.svg";
import {ReactComponent as StoreIcon} from "assets/Home.svg";
import {ReactComponent as CategoryIcon} from "assets/Graph.svg";
import {ReactComponent as CitiesIcon} from "assets/Location.svg";
import {ReactComponent as UsersIcon} from "assets/Users.svg";


interface Menu {
    title: string
    href: string
    roles?: string[]
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const navigation_config: Menu[] = [
    {
        title: 'navigation_config_store',
        href: '/',
        icon: StoreIcon
    },
    {
        title: 'navigation_config_orders',
        href: '/orders',
        icon: SupervisionIcon
    }, {
        title: 'navigation_config_users',
        href: '/users',
        icon: UsersIcon,
    }
]

export default navigation_config