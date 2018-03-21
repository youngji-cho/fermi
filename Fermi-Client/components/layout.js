import React from 'react';

export class Layout extends React.Component{
  render(){
    return(
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
          <div className="mdl-layout__header-row"><span className="mdl-layout-title">페르미 프로젝트</span>
            <div className="mdl-layout-spacer"></div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label htmlFor="search" className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons">search</i></label>
              <div className="mdl-textfield__expandable-holder">
                <input id="search" type="text" className="mdl-textfield__input" />
                <label htmlFor="search" className="mdl-textfield__label">Enter your query...</label>
              </div>
            </div>
          </div>
        </header>
        <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
            <header className="demo-drawer-header">
              <p>서비스 목록</p>
            </header>
            <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
              <a href="./" className="mdl-navigation__link">
                <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">home</i>소개
              </a>
              <a href="./smp_price" className="mdl-navigation__link">
                <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">monetization_on
                </i>
                SMP 가격
              </a>
              <a href="./rec_price" className="mdl-navigation__link">
                <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">monetization_on</i>
                REC가격</a>
              <a href="./media" className="mdl-navigation__link">
                <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">description</i>
              미디어
              </a>
              <a href="" className="mdl-navigation__link">
              <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">help_outline</i>
              개발자정보: admin@fermi.me</a>
            </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-100">
            <div className="mdl-grid demo-content">
            {this.props.children}
            </div>
        </main>
      </div>
    )
  }
}



export class Header extends React.Component{
  render(){
    return(
      <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
        <div className="mdl-layout__header-row"><span className="mdl-layout-title">페르미 프로젝트</span>
          <div className="mdl-layout-spacer"></div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label htmlFor="search" className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons">search</i></label>
              <div className="mdl-textfield__expandable-holder">
                <input id="search" type="text" className="mdl-textfield__input" />
                <label htmlFor="search" className="mdl-textfield__label">Enter your query...</label>
              </div>
            </div>
          </div>
        </header>
    )
  }
}

export class Drawer extends React.Component{
  render(){
    return(
      <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header className="demo-drawer-header">
          <p>서비스 목록</p>
        </header>
        <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
          <a href="./" className="mdl-navigation__link">
            <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">home</i>소개
          </a>
          <a href="./smp_price" className="mdl-navigation__link">
            <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">monetization_on
            </i>
            SMP 가격
          </a>
          <a href="./rec_price" className="mdl-navigation__link">
            <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">monetization_on</i>
            REC가격</a>
          <a href="./media" className="mdl-navigation__link">
            <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">description</i>
          미디어
          </a>
          <a href="" className="mdl-navigation__link">
          <i role="presentation" className="mdl-color-text--blue-grey-400 material-icons">help_outline</i>
          개발자정보: admin@fermi.me</a>
        </nav>
      </div>
    )
  }
}

export class Table extends React.Component{
  render(){
    return(
      <div className="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
        <div>
          <h4>{this.props.name}</h4>
          <p>{this.props.content}</p>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export class TimeButton extends React.Component{
  render(){
    return(
      <button className="mdl-button mdl-js-button mdl-button--accent" value={this.props.buttonValue} onClick={this.props.onClick}>
          {this.props.buttonName}
      </button>
    )
  }
}
