import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
    Link
} from 'react-router-dom'

const NavBar = () => {
    return (
        <NavigationMenu className="bg-header rounded-md text-white h-full">
            <NavigationMenuList className="h-full">
                <NavigationMenuItem className="h-full">
                    <NavigationMenuTrigger className="hover:bg-header-light h-full rounded-none px-6" >Home</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-header text-white p-0 rounded-none">
                        <ul className="grid w-[150px]">
                            <li className="hover:bg-header-light">
                                <NavigationMenuLink className="hover:bg-header-light" render={<Link className="flex-row items-center" to="/">home</Link>}></NavigationMenuLink>
                            </li>
                            <li className="hover:bg-header-light">
                                <NavigationMenuLink className="hover:bg-header-light" render={<Link className="flex-row items-center" to="/login">login</Link>}></NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavBar