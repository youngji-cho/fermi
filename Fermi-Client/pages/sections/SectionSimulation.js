import React from "react";
// react plugin that creates slider
import Nouislider from "react-nouislider";
// material-ui components
import withStyles from "material-ui/styles/withStyles";

import customInputStyle from "assets/jss/material-kit-react/components/customInputStyle.jsx";

import InputAdornment from "material-ui/Input/InputAdornment";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import Checkbox from "material-ui/Checkbox";
import Radio from "material-ui/Radio";
import Switch from "material-ui/Switch";
import InputLabel from "material-ui/Input/InputLabel";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
import CustomInputDropdown from "components/CustomInput/CustomInputDropdown.jsx";
import CustomInputDatetime from "components/CustomInput/CustomInputDatetime.jsx";
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
      investment: [
        {name:'Fermi PV Power Plant',type:"PV",unitcost:230,units:99},
        {name:'Fermi Energy Storage System',type:"energy storage system",unitcost:100,units:10}
      ],
      finance:[
        {name:'Debt',amount:10000,startdate:new Date(new Date().setMonth(new Date().getMonth()+2)),duration:10,interest:0.05,payment_type:"constant payment mortgage"},
        {name:'Equity',amount:10000,startdate:new Date(new Date().setMonth(new Date().getMonth()+2))},
        {name:'Government Subsidary',amount:10000,startdate:new Date()}
      ],revenue:[]
    };
    //투자비 조건 변경
    this.handleInvestmentChange=this.handleInvestmentChange.bind(this);
    this.handleAddInvestment=this.handleAddInvestment.bind(this);
    this.handleRemoveInvestment=this.handleRemoveInvestment.bind(this);
    //금융조건 변경
    this.handleFinanceChange=this.handleFinanceChange.bind(this);
    this.handleAddFinance=this.handleAddFinance.bind(this);
    this.handleRemoveFinance=this.handleRemoveFinance.bind(this);
    //revenue
    this.startRevenue=this.startRevenue.bind(this)
    this.handleCheckClick=this.handleCheckClick.bind(this)
    //테스트 조건
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
    let el = document.createElement( 'html' );
    el.innerHTML = e.target.outerHTML
    let x=el.getElementsByTagName( 'li' );
    this.setState({
      investment: this.state.investment.concat([{
        name:x[0].innerText,
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
  //투자비 조건
  handleFinanceChange(idx){
    return (evt) => {
      const newComponents = this.state.finance.map((component, sidx) => {
        if (idx !== sidx){
          return component;
        }
        else if(moment.isMoment(evt)===true){
          console.log("moment!")
          return { ...component, startdate:new Date(`${evt.year()}-${evt.month()}-${evt.date()}`)}
        }
        else if(evt.target.tagName==="LI"){
          var el = document.createElement( 'html' );
          el.innerHTML = evt.target.outerHTML
          var x=el.getElementsByTagName( 'li' );
          return { ...component, payment_type:x[0].innerText};
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
    return () => {
      this.setState({
        finance: this.state.finance.filter((s, sidx) => idx !== sidx)
      });
    }
  }
  //수입예상
  startRevenue(){
    let names=[];
    this.state.investment.map((component,idx)=>names[idx]={name:component.name,checked:true,operation_period:20})
    this.setState({revenue:names});
  }
  handleCheckClick(idx){
    let component=this.state.revenue;
    component[idx].checked=component[idx].checked?false:true;
    this.setState({
      revenue: component
    });
  }
  handleChange(e){
    let el = document.createElement( 'html' );
    el.innerHTML = e.outerHTML
    console.log(el)
    console.log("target is",e.target)
    console.log("target value is",e.target.value)
    console.log("target children is",e.target.children)
  }
  render() {
    console.log(this.state)
    console.log("classes",classes)
    const { classes } = this.props;
    return (
      <div className={classes.sections}>
        <div className={classes.container}>
          <div id="inputs">
            <div className={classes.title}>
              <div className={classes.space30} />
              <h3>Basic Assumption</h3>
            </div>
            <GridContainer>
              <GridItem xs={6} sm={4} md={3} lg={2}>
                <CustomInputDropdown id="float"
                  labelText="fd"
                 formControlProps={{
                  fullWidth: true
                }} />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2}>
              <CustomInput
                labelText="inflation rate"
                id="regular"
                formControlProps={{
                  fullWidth: true,
                  children:"<select>a</select>"
                }}
                inputProps={{
                  name:"components-name",
                  type:"number",
                  defaultValue:0.05
                }}
              />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2}>
              <CustomInputDatetime id="float"
                labelText="start time"
               formControlProps={{
                fullWidth: true
              }} />
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2}>
                <TextField select label="currency" helperText="select currency for financial simulation">
                <MenuItem>
                "test"
                </MenuItem>
                </TextField>
              </GridItem>
              <GridItem xs={6} sm={4} md={3} lg={2}>
              <TextField label="currency" helperText="select currency for financial simulation" type="number" onChange={this.handleChange}>
              </TextField>
              </GridItem>


            </GridContainer>
            <div className={classes.space50} />
            <h3>Investment Assumption</h3>
            {this.state.investment.map((component, idx) =>
            (<GridContainer key={`investment-container${idx}`}>
              <GridItem xs={6} sm={2} md={3} lg={2} key={`investment-name${idx}`}>
                <CustomInput
                  labelText={component.name}
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
              <GridItem xs={6} sm={4} md={3} lg={1}>
                <CustomDropdown dropdownList={["pv","solar-thermal","lithium-ion-storage","power-converstion"]} buttonProps={{color:"rose",size:"sm"}} buttonText={"Add"} menuProps={{onClick:this.handleAddInvestment}} />
              </GridItem>
              <GridItem xs={6} sm={4} md={5} lg={1}>
              <Button color="rose" onClick={this.handleRemoveInvestment(idx)} size="sm">Remove</Button>
              </GridItem>
            </GridContainer>)
            )}
            <div className={classes.space50} />
            <h3>Finance Assumption</h3>
            {this.state.finance.map((component, idx) =>
            (component.name==="Debt"?
              (<GridContainer key={`finance-container${idx}`}>
                <GridItem xs={6} sm={4} md={4} lg={2} key={`finance-name${idx}`}>
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
                      defaultValue:component.amount,
                      onChange:this.handleFinanceChange(idx)
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
                      defaultValue:component.duration,
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
                      defaultValue:component.duration,
                      onChange:this.handleFinanceChange(idx)
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={4} lg={2} key={`finance-startdate${idx}`}>
                  <InputLabel className={classes.label}>
                  start-date
                  </InputLabel>
                  <Datetime viewMode='days' inputProps={{placeholder:component.startdate}} dateFormat='YYYY-MM-DD' timeFormat={false} onChange={this.handleFinanceChange(idx)} defaultValue={component.startdate}/>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={3}>
                  <CustomDropdown dropdownList={["constant payment mortgage","irregular payment mortgage","constant amortized mortgage"]} buttonProps={{color:"transparent"}} buttonText={component.payment_type} menuProps={{onClick:this.handleFinanceChange(idx), name:"finance-payment_type"}} />
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
            <div className={classes.space50} />
            <h3>Revenue Assumption</h3>
            <Button color="rose" size="sm" onClick={this.startRevenue}>START</Button>
            {this.state.revenue.map((component, idx) =>(
            <GridContainer key={`revenue-container(${idx})`}>
              <GridItem xs={12} sm={6} md={6} lg={2} >
              <FormControlLabel
                control={
                <Checkbox onClick={()=>this.handleCheckClick(idx)} />
              }
              label={component.name}
              checked={component.checked}/>
              </GridItem>
              {component.checked?(
                <GridItem xs={12} sm={6} md={6} lg={2} >
                <TextField
                  select label="With Select"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Kg</InputAdornment>
                  }}>
                    <MenuItem>
                    "test"
                    </MenuItem>
                  </TextField>
                </GridItem>
              ):(<span></span>)}
              {component.checked?(
                <GridItem xs={12} sm={6} md={6} lg={2} >
                <CustomInput
                  labelText={"revenue-operating-period"}
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name:"operating-period",
                    type:"number",
                    defaultValue:component.operation_period
                  }}
                />
                </GridItem>
              ):(<span></span>)}
            </GridContainer>
            ))}
            <div className={classes.space50} />
            <h3>Operation Assumption</h3>
            <div className={classes.space50} />
            <h3>Other Scenarios</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(SectionSimulation);
