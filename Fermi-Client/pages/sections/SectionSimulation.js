import React from "react";
// react plugin that creates slider
import Nouislider from "react-nouislider";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputAdornment from "material-ui/Input/InputAdornment";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import Checkbox from "material-ui/Checkbox";
import Radio from "material-ui/Radio";
import Switch from "material-ui/Switch";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import People from "@material-ui/icons/People";
import Check from "@material-ui/icons/Check";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import Paginations from "components/Pagination/Pagination.jsx";
import Badge from "components/Badge/Badge.jsx";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

class SectionSimulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      components: [{name: 'PV'},{name: 'Wind'}]
    };
    //
    this.handleAddComponents=this.handleAddComponents.bind(this);
    this.handleRemoveComponents=this.handleRemoveComponents.bind(this);
  }
  //
  handleAddComponents(){
    this.setState({
      components: this.state.components.concat([{ name: '' }])
    });
  }
  handleRemoveComponents(idx){
    return () => {
      this.setState({
        components: this.state.components.filter((s, sidx) => idx !== sidx)
      });
    }
  }
  render() {
    this.state.components.map((name,idx)=>{
      console.log(name.name,idx)
    })
    const { classes } = this.props;
    return (
      <div className={classes.sections}>
        <div className={classes.container}>
          <div id="inputs">
            <div className={classes.title}>
              <div className={classes.space30} />
              <h3>Simulation</h3>
            </div>
            <GridContainer>
              <GridItem xs={12} sm={2} md={2} lg={3}>
                <CustomDropdown dropdownList={["a","b","c"]}  buttonProps={{color:"rose"}} buttonText={"country"} />
              </GridItem>
              <GridItem xs={12} sm={2} md={2} lg={3}>
                <CustomDropdown dropdownList={["a","b","c"]}  buttonProps={{color:"rose"}} buttonText={"currency"} />
              </GridItem>
            </GridContainer>
              <div className={classes.space50} />
              <h3>Construction Cost</h3>
            {this.state.components.map((name, idx) =>
            (<GridContainer key={`consturction-container${idx}`}>
              <GridItem xs={6} sm={2} md={3} lg={2}key={`construction-name${idx}`}>
                <CustomInput
                  labelText={name.name}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2} key={`construction-unit-cost${idx}`}>
                <CustomInput
                  labelText={"unit-cost"}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2} key={`construction-units${idx}`}>
                <CustomInput
                  labelText={"unit"}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2} key={`total-cost${idx}`}>
                <CustomInput
                  labelText={"total cost"}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2}>
                <CustomDropdown dropdownList={["pv","solar-thermal","lithium-ion-storage","power-converstion"]} buttonProps={{color:"rose"}} buttonText={"Add"} />
              </GridItem>
              <GridItem xs={6} sm={4} md={5} lg={2}>
              <Button color="rose" onClick={this.handleRemoveComponents(idx)}>Remove</Button>
              </GridItem>
            </GridContainer>)
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(SectionSimulation);
