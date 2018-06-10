import React from 'react';
import { Manager, Target, Popper, Arrow } from 'react-popper';

//style import
import withStyles from "material-ui/styles/withStyles";
import customDropdownStyle from "assets/jss/material-kit-react/components/customDropdownStyle.jsx";

//material-ui import
import MenuItem from "material-ui/Menu/MenuItem";
import MenuList from "material-ui/Menu/MenuList";
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
import Paper from "material-ui/Paper";
import Grow from "material-ui/transitions/Grow";
import Divider from "material-ui/Divider";

import Button from "components/CustomButtons/Button.jsx";

class SectionStandalone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleClick(e) {
    var el = document.createElement( 'html' );
    el.innerHTML = e.target.outerHTML
    var x=el.getElementsByTagName( 'li' );
    console.log(x[0].innerText);
  }
  render() {
    const { open } = this.state;
    const {
      classes,
      buttonText,
      buttonIcon,
      dropdownList,
      buttonProps,
      dropup,
      dropdownHeader,
      caret,
      hoverColor,
      left,
      rtlActive
    } = this.props;
    return (
      <Manager>
        <Target>
          <Button>TEST</Button>
        </Target>
        <Popper>
          <Paper>
            <MenuList role="menu">
              <MenuItem onClick={this.handleClick}>
                TEST
              </MenuItem>
            </MenuList>
          </Paper>
        </Popper>
      </Manager>
    )
  }
}

export default withStyles(customDropdownStyle)(SectionStandalone);
