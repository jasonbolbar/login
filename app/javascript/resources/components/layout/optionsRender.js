import {DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import React from "react";

export default (options, history) => options.map(extraOption => {
    if (extraOption.options) {
        return (
            <UncontrolledDropdown nav inNavbar key={extraOption.text}>
                <DropdownToggle nav caret>
                    {extraOption.text}
                </DropdownToggle>
                <DropdownMenu right>
                    {
                        extraOption.options.map( item => (
                            <DropdownItem key={`${extraOption.text}>${item.text}`} onClick={() =>
                                item.callback ? item.callback() : history.push(item.link)}>
                                {item.text}
                            </DropdownItem>
                        ) )
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    } else {
        return (
            <NavItem key={extraOption.text}>
                <NavLink href={extraOption.link}>{extraOption.text}</NavLink>
            </NavItem>
        )
    }
});