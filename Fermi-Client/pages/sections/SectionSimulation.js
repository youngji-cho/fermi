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
import InputLabel from "material-ui/Input/InputLabel";
//react datetime
import Datetime from "react-datetime";
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

import {datechange,datechangeDate,datechangeYear,datechangeQuarter,datechangeMonth} from "util";

const moment = require('moment');

class SectionSimulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [{name:'PV',unitcost:230,units:99},{name: 'Energy Storage System',unitcost:100,units:10},{name: 'Energy Storage System',unitcost:100,units:10}],
      finance:[
        {name:'Debt',amount:10000,startdate:new Date(new Date().setMonth(new Date().getMonth()+2)),duration:10,interest:0.05,payment_type:"constant payment mortgage"},
        {name:'Equity',amount:10000,startdate:new Date(new Date().setMonth(new Date().getMonth()+2))},
        {name:'Government Subsidary',amount:10000,startdate:new Date()}
      ]
    };
    //투자비 조건 변경
    this.handleComponentsChange=this.handleComponentsChange.bind(this);
    this.handleAddComponents=this.handleAddComponents.bind(this);
    this.handleRemoveComponents=this.handleRemoveComponents.bind(this);
    //금융조건 변경
    this.handleFinanceChange=this.handleFinanceChange.bind(this);
    this.handleAddFinance=this.handleAddFinance.bind(this);
    this.handleRemoveFinance=this.handleRemoveFinance.bind(this);
    //테스트 조건
    this.handleChange=this.handleChange.bind(this);
  }
  handleComponentsChange(idx){
    return (evt) => {
      console.log("evt",evt.target.outerHTML);
      const newComponents = this.state.components.map((components, sidx) => {
        if (idx !== sidx)
          return components;
        else
          if(evt.target.name==="components-name")
            return { ...components, name: evt.target.value };
          else if(evt.target.name==="components-unitcost")
            return { ...components, unitcost: parseFloat(evt.target.value)};
          else if(evt.target.name==="components-units")
            return { ...components, units: parseFloat(evt.target.value) };
      });
      this.setState({components: newComponents });
    }
  }
  handleAddComponents(e){
    let el = document.createElement( 'html' );
    el.innerHTML = e.target.outerHTML
    let x=el.getElementsByTagName( 'li' );
    console.log(x[0].innerText)
    this.setState({
      components: this.state.components.concat([{
        name: x[0].innerText,
        unitcost:0,
        units:0
      }])
    });
  }
  handleRemoveComponents(idx){
    console.log("idx",idx)
    return (a) => {
      this.setState({
        components: this.state.components.filter((s, sidx) => idx !== sidx)
      });
    }
  }
  //투자비 조건
  handleFinanceChange(idx){
    return (evt) => {
      console.log(moment.isMoment(evt))
      const newComponents = this.state.finance.map((finance, sidx) => {
        if (idx !== sidx){
          return finance;
        }
        else if(moment.isMoment(evt)===true){
          console.log("moment!")
          return { ...finance, startdate:new Date(`${evt.year()}-${evt.month()}-${evt.date()}`)}
        }
        else if(evt.target.tagName==="LI"){
          var el = document.createElement( 'html' );
          el.innerHTML = evt.target.outerHTML
          var x=el.getElementsByTagName( 'li' );
          return { ...finance, payment_type:x[0].innerText};
        }
        else if(evt.target.name==="finance-name"){
          return { ...finance, name: evt.target.value };
        }
        else if(evt.target.name==="finance-amount"){
          return { ...finance, amount: parseFloat(evt.target.value) };
        }
        else if(evt.target.name==="finance-duration"){
          return { ...finance, duration: parseFloat(evt.target.value) };
        }
        else if(evt.target.name==="finance-interest"){
          return { ...finance, interest: parseFloat(evt.target.value) };
        }
      });
      this.setState({finance: newComponents});
    }
  }
  handleAddFinance(e){
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
    return (a) => {
      this.setState({
        finance: this.state.finance.filter((s, sidx) => idx !== sidx)
      });
    }
  }
  handleChange(e){
    console.log(e)
    console.log("altkey",e.altKey)
    console.log("button",e.button)
    console.log("buttons",e.buttons)
    console.log("bubbles",e.bubbles)
    console.log("type",e.type)
    console.log("view",e.view)
    console.log("detail",e.detail)
    console.log("target",e.target)
    console.log("target name",e.target.name)
    console.log("target role",e.target.role)
    console.log("target children",e.target.children)
    console.log("target className",e.target.className)
    console.log("target accessKey",e.target.accessKey)
    console.log("target attributes",e.target.attributes)
    console.log("target tagName",e.target.tagName)

    let el = document.createElement( 'html' );
    el.innerHTML = e.target.outerHTML
    let x=el.getElementsByTagName( 'li' );
    console.log(x[0].innerText)
  }
  render() {
    console.log(this.state)
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
              <GridItem xs={6} sm={4} md={3} lg={2}>
                <CustomDropdown dropdownList={["a","b","c"]}  buttonProps={{color:"transparent"}} buttonText={"country"} />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2}>
                <CustomDropdown dropdownList={["a","b","c"]}  buttonProps={{color:"transparent"}} buttonText={"currency"} />
              </GridItem>
            </GridContainer>
            <div className={classes.space50} />
            <h3>Components</h3>
            {this.state.components.map((components, idx) =>
            (<GridContainer key={`consturction-container${idx}`}>
              <GridItem xs={6} sm={2} md={3} lg={2} key={`construction-name${idx}`}>
                <CustomInput
                  labelText={components.name}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name:"components-name",
                    defaultValue:components.name,
                    onChange:this.handleComponentsChange(idx)
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
                  inputProps={{
                    name:"components-unitcost",
                    type:"number",
                    defaultValue:components.unitcost,
                    onChange:this.handleComponentsChange(idx)
                  }}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2} key={`construction-units${idx}`}>
                <CustomInput
                  labelText={"units"}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name:"components-units",
                    type:"number",
                    defaultValue:components.units,
                    onChange:this.handleComponentsChange(idx)
                  }}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2} key={`total-cost${idx}`}>
                <CustomInput
                  labelText={"Total Cost"}
                  inputProps={{value:components.unitcost*components.units}}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={1}>
                <CustomDropdown dropdownList={["pv","solar-thermal","lithium-ion-storage","power-converstion"]} buttonProps={{color:"rose",size:"sm"}} buttonText={"Add"} menuProps={{onClick:this.handleAddComponents}} />
              </GridItem>
              <GridItem xs={6} sm={4} md={5} lg={1}>
              <Button color="rose" onClick={this.handleRemoveComponents(idx)} size="sm">Remove</Button>
              </GridItem>
            </GridContainer>)
            )}
            <div className={classes.space50} />
            <h3>Finance</h3>
            {this.state.finance.map((finance, idx) =>
            (finance.name==="Debt"?
              (<GridContainer key={`finance-container${idx}`}>
                <GridItem xs={6} sm={4} md={4} lg={2} key={`finance-name${idx}`}>
                  <CustomInput
                    labelText={finance.name}
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:"finance-name",
                      defaultValue:finance.name,
                      onChange:this.handleFinanceChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2} lg={1} key={`finance-amount${idx}`}>
                  <CustomInput
                    labelText={"amount"}
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:"finance-amount",
                      type:"number",
                      defaultValue:finance.amount,
                      onChange:this.handleComponentsChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2} lg={1} key={`finance-duration${idx}`}>
                  <CustomInput
                    labelText={"duartion"}
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:"finance-duration",
                      type:"number",
                      defaultValue:finance.duration,
                      onChange:this.handleFinanceChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2} lg={1} key={`finance-interest${idx}`}>
                  <CustomInput
                    labelText={"interest"}
                    id="float"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:"finance-duration",
                      type:"number",
                      defaultValue:finance.duration,
                      onChange:this.handleFinanceChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={4} lg={2} key={`finance-startdate${idx}`}>
                  <InputLabel className={classes.label}>
                  start-date
                  </InputLabel>
                  <Datetime viewMode='days' inputProps={{placeholder:finance.startdate}} dateFormat='YYYY-MM-DD' timeFormat={false} onChange={this.handleFinanceChange(idx)} defaultValue={finance.startdate}/>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={3}>
                  <CustomDropdown dropdownList={["constant payment mortgage","irregular payment mortgage","constant amortized mortgage"]} buttonProps={{color:"transparent"}} buttonText={finance.payment_type} menuProps={{onClick:this.handleFinanceChange(idx), name:"finance-payment_type"}} />
                </GridItem>
                <GridItem xs={4} sm={3} md={2} lg={1}>
                  <CustomDropdown dropdownList={["Equity","Debt","Government subsidy"]} buttonProps={{color:"rose", size:"sm"}} buttonText={"Add"} menuProps={{onClick:this.handleAddFinance}} />
                </GridItem>
                <GridItem xs={4} sm={3} md={2} lg={1}>
                  <Button color="rose" size="sm" onClick={this.handleRemoveFinance(idx)}>Remove</Button>
                </GridItem>
              </GridContainer>)
            :(<GridContainer key={`finance-container${idx}`}>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-name${idx}`}>
                <CustomInput
                  labelText={finance.name}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name:"finance-name",
                    defaultValue:finance.name,
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
                    defaultValue:finance.amount,
                    onChange:this.handleComponentsChange(idx)
                  }}
                />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={2} key={`finance-startdate${idx}`}>
                <InputLabel className={classes.label}>
                  start-date
                </InputLabel>
                <Datetime viewMode='days' inputProps={{placeholder:finance.startdate}} dateFormat='YYYY-MM-DD' timeFormat={false} onChange={this.handleFinanceChange(idx)} defaultValue={finance.startdate} />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={1}>
                <CustomDropdown dropdownList={["Equity","Debt","Government subsidy"]} buttonProps={{color:"rose",size:"sm"}} buttonText={"Add"} menuProps={{onClick:this.handleAddFinance}} />
                </GridItem>
                <GridItem xs={6} sm={4} md={3} lg={1}>
                <Button color="rose" size="sm" onClick={this.handleRemoveFinance(idx)}>Remove</Button>
                </GridItem>
                </GridContainer>
              )
             )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(SectionSimulation);
