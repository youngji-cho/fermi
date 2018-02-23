import React from 'react';

export class Header extends React.Component {
    render(){
        return (
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
        );
    }
}
