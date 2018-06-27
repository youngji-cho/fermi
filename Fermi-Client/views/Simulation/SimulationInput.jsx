import React from "react";
import Datetime from "react-datetime";
//moment
const moment = require('moment');

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import simulationInputStyle from "assets/jss/material-dashboard-pro-react/views/simulationInputStyle.jsx";

class SimulationInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      investment: [
        {name:'Fermi PV Power Plant',type:"PV",unitcost:230,units:99},
        {name:'Fermi Energy Storage System',type:"energy storage system",unitcost:100,units:10}
      ],
      finance:[
        {name:'Equity',amount:10000,startdate:new Date(new Date().setMonth(new Date().getMonth()+2))},
        {name:'Government Subsidary',amount:10000,startdate:new Date()},
        {name:'Debt',amount:10000,startdate:new Date(new Date().setMonth(new Date().getMonth()+2)),duration:10,interest:0.05,debt_type:"CAM",principal_type:"month", interest_type:"year"}
      ],
      revenue:[]
    };
    this.handleInvestmentChange=this.handleInvestmentChange.bind(this);
    this.handleAddInvestment=this.handleAddInvestment.bind(this);
    this.handleRemoveInvestment=this.handleRemoveInvestment.bind(this);
    //금융조건 변경
    this.handleFinanceChange=this.handleFinanceChange.bind(this);
    this.handleAddFinance=this.handleAddFinance.bind(this);
    this.handleRemoveFinance=this.handleRemoveFinance.bind(this);
    //Test 용
    this.handleChange=this.handleChange.bind(this);
  }
  handleInvestmentChange(idx){
    return (evt) => {
      console.log("evt",evt.target.outerHTML);
      const newComponents = this.state.investment.map((components, sidx) => {
      if (idx !== sidx)
        return components;
      else
        if(evt.target.name==="investment-name")
          return { ...components, name: evt.target.value };
        else if(evt.target.name==="investment-unitcost")
          return { ...components, unitcost: parseFloat(evt.target.value)};
        else if(evt.target.name==="investment-units")
          return { ...components, units: parseFloat(evt.target.value) };
     });
     this.setState({investment: newComponents });
   }
  }
  handleAddInvestment(e){
    console.log("target is",e.target)
    console.log("target value is",e.target.value)
    let el = document.createElement( 'html' );
    el.innerHTML = e.target.outerHTML
    let x=el.getElementsByTagName( 'li' );
    this.setState({
     investment: this.state.investment.concat([{
       name:"",
       type: x[0].innerText,
       unitcost:0,
       units:0
     }])
   });

  }
  handleRemoveInvestment(idx){
    return () => {
     this.setState({
       investment: this.state.investment.filter((s, sidx) => idx !== sidx)
     });
   }
  }
  handleFinanceChange(idx){
   return (evt) => {
     console.log(evt);
     const newComponents = this.state.finance.map((component, sidx) => {
       if (idx !== sidx){
         return component;
       }
       else if(moment.isMoment(evt)===true){
         console.log("moment!")
         return { ...component, startdate:new Date(`${evt.year()}-${evt.month()}-${evt.date()}`)}
       }
       else if(evt.target.name==="finance-name"){
         return { ...component, name: evt.target.value };
       }
       else if(evt.target.name==="finance-amount"){
         return { ...component, amount: parseFloat(evt.target.value) };
       }
       else if(evt.target.name==="finance-duration"){
         return { ...component, duration: parseFloat(evt.target.value) };
       }
       else if(evt.target.name==="finance-interest"){
         return { ...component, interest: parseFloat(evt.target.value) };
       }
       else if(evt.target.name==="finance-debt-type"){
         return { ...component, debt_type: evt.target.value};
       }
       else if(evt.target.name==="finance-principal-type"){
         return { ...component, principal_type: evt.target.value};
       }
       else if(evt.target.name==="finance-interest-type"){
         return { ...component, interest_type: evt.target.value};
       }
     });
     this.setState({finance: newComponents});
   }
  }
  handleAddFinance(e){
    console.log(e.target.value);
    let el = document.createElement( 'html' );
    el.innerHTML = e.target.outerHTML
    let x=el.getElementsByTagName( 'li' );
    if (x[0].innerText==="Debt")
      this.setState({
        finance: this.state.finance.concat([{
         name: x[0].innerText,
         amount:0,
         duration:0,
         interest:0,
         startdate:new Date(new Date().setMonth(new Date().getMonth()+2))
       }])
     })
    else
      this.setState({
        finance: this.state.finance.concat([{
         name: x[0].innerText,
         amount:0,
         duration:12,
         interest:0.05,
         startdate:new Date(new Date().setMonth(new Date().getMonth()+2))
       }])
     })
  }
  handleRemoveFinance(idx){
    console.log("idx",idx)
    return () => {
      this.setState({
       finance: this.state.finance.filter((s, sidx) => idx !== sidx)
      });
    }
  }
  // Electricity Market Policy 

  handleChange(e){
    let el = document.createElement( 'html' );
    el.innerHTML = e.outerHTML
    console.log(el)
    console.log("target is",e.target)
    console.log("target value is",e.target.value)
    console.log("target name is",e.target.name)
  }
  render() {
    console.log(this.state)
    const { classes } = this.props;
    return(
      <div>
        <Card>
          <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Country and Policy</h4>
              </CardText>
              <GridContainer key={`investment-container`}>
                <GridItem xs={6} sm={4} md={2} lg={2}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                >
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    Choose City
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select"
                    }}
                    value={""}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Choose City
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value="17"
                    >
                      New York
                    </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="18"
                      >
                        Miami
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <CustomInput />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <CustomInput />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <InputLabel className={classes.label}>Date Picker</InputLabel>
                  <Datetime
                    timeFormat={false}
                    inputProps={{ placeholder: "Date Picker Here" }}
                    />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <CustomInput labelText="text"/>
                </GridItem>
              </GridContainer>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>Investment Cost Assumptions</h4>
            </CardText>
          {this.state.investment.map((component, idx) =>
          (<GridContainer key={`investment-container${idx}`}>
            <GridItem xs={6} sm={2} md={3} lg={2} key={`investment-name${idx}`}>
              <CustomInput
                labelText={component.type}
                id="float"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name:"investment-name",
                  defaultValue:component.name,
                  onChange:this.handleInvestmentChange(idx)
                }}
              />
            </GridItem>
            <GridItem xs={6} sm={4} md={3} lg={2} key={`investment-unit-cost${idx}`}>
              <CustomInput
                labelText={"unit-cost"}
                id="float"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name:"investment-unitcost",
                  type:"number",
                  defaultValue:component.unitcost,
                  onChange:this.handleInvestmentChange(idx)
                }}
              />
            </GridItem>
            <GridItem xs={6} sm={4} md={3} lg={2} key={`investment-units${idx}`}>
              <CustomInput
                labelText={"units"}
                id="float"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name:"investment-units",
                  type:"number",
                  defaultValue:component.units,
                  onChange:this.handleInvestmentChange(idx)
                }}
              />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2} key={`investment-total-cost${idx}`}>
              <CustomInput
                labelText={"Total Cost"}
                inputProps={{value:component.unitcost*component.units}}
                id="float"
                formControlProps={{
                  fullWidth: true
                }}
              />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2}>
              <CustomDropdown
                dropup
                buttonText="Add"
                buttonProps={{
                  fullWidth: true,
                  color: "rose",
                  size:"sm",
                  onClick:this.handleAddInvestment
                }}
                menuProps={{onClick:this.handleAddInvestment}}
                dropdownHeader="Choose Components"
                dropdownList={[
                  "PV",
                  "Solar Thermal",
                  "Wind",
                  "Diesel",
                  { divider: true },
                  "Lithium Ion Battery",
                  { divider: true },
                  "Inverter",
                  "Other PCS",
                  { divider: true },
                  "Other Cost"
                ]}
              />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2}>
              <Button color="rose" onClick={this.handleRemoveInvestment(idx)} size="sm" fullWidth={true}>Remove</Button>
              </GridItem>
            </GridContainer>)
            )}
          </CardHeader>
        </Card>
        <Card>
          <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Finance Assumptions</h4>
          </CardText>
          {this.state.finance.sort().map((component, idx) =>
            component.name==="Debt"?
              (<GridContainer key={`finance-container${idx}`}>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-name${idx}`}>
                  <CustomInput
                    labelText={component.name}
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:"finance-name",
                      defaultValue:component.name,
                      onChange:this.handleFinanceChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-amount${idx}`}>
                  <CustomInput
                    labelText={"amount"}
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:"finance-amount",
                      type:"number",
                      defaultValue:component.amount,
                      onChange:this.handleFinanceChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-duration${idx}`}>
                  <CustomInput
                    labelText={"duartion"}
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:"finance-duration",
                      type:"number",
                      defaultValue:component.duration,
                      onChange:this.handleFinanceChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-interest${idx}`}>
                  <CustomInput
                    labelText={"interest"}
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:"finance-duration",
                      type:"number",
                      defaultValue:component.duration,
                      onChange:this.handleFinanceChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-startdate${idx}`}>
                  <InputLabel className={classes.label}>
                  Start Date
                  </InputLabel>
                  <Datetime viewMode='days' inputProps={{placeholder:component.startdate}} dateFormat='YYYY-MM-DD' timeFormat={false} onChange={this.handleFinanceChange(idx)} defaultValue={component.startdate}/>
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                  >
                    <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                    >
                    Debt Type
                    </InputLabel>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      inputProps={{
                        name: "finance-debt-type",
                        id: "finance-debt-type"
                      }}
                      value={component.debt_type}
                      onChange={this.handleFinanceChange(idx)}
                      >
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="CPM"
                      >
                      Constant Payment Mortgage
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="IPM"
                      >
                      Irregular Payment Mortgage
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="CAM"
                      >
                      Constant Amortized Mortgage
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                  >
                    <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                    >
                    Principal Payment Type
                    </InputLabel>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      inputProps={{
                        name: "finance-principal-type",
                        id: "finance-principal-type"
                      }}
                      value={component.principal_type}
                      onChange={this.handleFinanceChange(idx)}
                      >
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="month"
                      >
                      month
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="quarter"
                      >
                      quarter
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="year"
                      >
                      year
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                {(component.debt_type==="CAM")?(<div></div>):(
                  <GridItem xs={12} sm={6} md={4} lg={2}>
                    <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                    >
                      <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                      >
                      Interest Payment Type
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        inputProps={{
                          name: "finance-interest-type",
                          id: "finance-interest-type"
                        }}
                        value={component.interest_type}
                        onChange={this.handleFinanceChange(idx)}
                        >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="month"
                        >
                        month
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="quarter"
                        >
                        quarter
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="year"
                        >
                        year
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                )}
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <CustomDropdown dropdownList={["Equity","Debt","Government subsidy"]} buttonProps={{color:"rose", size:"sm",fullWidth:true}} buttonText={"Add"} menuProps={{onClick:this.handleAddFinance}} />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <Button color="rose" size="sm" onClick={this.handleRemoveFinance(idx)} fullWidth={true}>Remove</Button>
                </GridItem>
              </GridContainer>)
            :(<GridContainer key={`finance-container${idx}`}>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-name${idx}`}>
                <CustomInput
                  labelText={component.name}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name:"finance-name",
                    defaultValue:component.name,
                    onChange:this.handleFinanceChange(idx)
                  }}
                />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-amount${idx}`}>
                <CustomInput
                  labelText={"amount"}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name:"finance-amount",
                    type:"number",
                    defaultValue:component.amount,
                    onChange:this.handleFinanceChange(idx)
                  }}
                />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-startdate${idx}`}>
                <InputLabel className={classes.label}>
                  start-date
                </InputLabel>
                <Datetime viewMode='days' inputProps={{placeholder:component.startdate}} dateFormat='YYYY-MM-DD' timeFormat={false} onChange={this.handleFinanceChange(idx)} defaultValue={component.startdate} />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                <CustomDropdown dropdownList={["Equity","Debt","Government subsidy"]} buttonProps={{color:"rose",size:"sm",fullWidth:true}} buttonText={"Add"} menuProps={{onClick:this.handleAddFinance}} />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                <Button color="rose" size="sm" onClick={this.handleRemoveFinance(idx)} fullWidth={true}>Remove</Button>
                </GridItem>
              </GridContainer>
              )
           )
          }
         }
          </CardHeader>
        </Card>
        <Card>
          <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Electricity Market Assumptions</h4>
              </CardText>
              <GridContainer key={`investment-container`}>
                <GridItem xs={6} sm={4} md={2} lg={2}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                >
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    Renewable Energy Policy
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select"
                    }}
                    value={"17"}
                  >
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value=""
                    >
                      TEST
                    </MenuItem>
                  </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <CustomInput />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <CustomInput />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <InputLabel className={classes.label}>Date Picker</InputLabel>
                  <Datetime
                    timeFormat={false}
                    inputProps={{ placeholder: "Date Picker Here" }}
                    />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2}>
                  <CustomInput labelText="text"/>
                </GridItem>
              </GridContainer>
          </CardHeader>
        </Card>
      </div>
    )
  }

}

export default withStyles(simulationInputStyle)(SimulationInput);
