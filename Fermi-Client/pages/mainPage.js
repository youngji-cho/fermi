import React from 'react';
import classNames from "classnames";
import { Link } from "react-router-dom";
import withStyles from "material-ui/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
//sections
import SectionHeader from "./sections/SectionHeader"
import SectionSimulation from "./sections/SectionSimulation"

//sections
import SectionBasics from "./section/SectionBasics.jsx";

//componentsStyle
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class Mainpage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <SectionHeader />
        <Parallax image={require("../assets/img/solarpark.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Fermi Project</h1>
                  <h3 className={classes.subtitle}>
                    Free renwable energy simulation
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionSimulation />
          <SectionBasics />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(componentsStyle)(Mainpage);
