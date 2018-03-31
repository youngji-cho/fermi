import React from 'react';

export class Simulation extends React.Component{
  constructor(props){
    super(props);
    this.state={
      type:["지상형","옥상형","지상형"],
      value:{test:"test"}
    };
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    alert("submitted!")
    fetch("http://localhost:8080/economic/result",{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title:e.target[0].value,
        size:e.target[1].value,
        type:e.target[2].value
      })
      }).then(response=>{
      if (response.ok){
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError=> console.log(networkError.message)
    ).then(
      jsonResponse=>{
      console.log(jsonResponse)
    });
  }
  render(){
    let type_table= this.state.type.map((d,i)=>
      <option key={`${i}`}value={d}>{d}</option>
    );
    return(
      <form method="post" onSubmit={this.handleSubmit}>
        위치: <input type="text" name="location"/> <br />
        용량: <input type="text" name="size"/> <br />
        형태: <select name="selected">{type_table}</select><br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
