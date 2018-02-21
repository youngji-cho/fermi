import React from 'react'
export class Table extends React.Component{
  render(){
    return(
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <div className="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
            <div>
              <h4>{this.props.name}</h4>
              <p>{this.props.content}</p>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
