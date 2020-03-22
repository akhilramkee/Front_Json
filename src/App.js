import React from 'react';
import './App.css';
import { API } from './API/constants';
import axios from 'axios';
import { Card, CardBody, CardHeader } from 'reactstrap';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      data:[],
      done:0
    }
    this.renderTableData = this.renderTableData.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.changeText = this.changeText.bind(this);
  }



  uploadDocument= async(e)=>{                                                                       
    this.setState({
      file:e.target.files[0]
    },()=>{

      let data = new FormData();
      data.append('file',this.state.file)
      axios(API+"upload",{
        method:'POST',
        data:data,
        withCredentials:true
      })
         .then(res => { this.setState({data:res.data},()=>{console.log(this.state.data)});})
         .catch(err=> { console.log(err)})
    });
  }



  purge = (e)=>{
    axios(API+"purge",{
      method:"GET"
    })
    .then(res=> { this.setState({data:res.data})})
    .catch(err=>{console.log(err)})
  }


  onDownload = (e)=>{

    console.log(e.target.value)
    let data = this.state.data.find(d=>{
      return d.language === e.target.value;
    })
    const filename = data.language;
    delete data['language']
    const json_data = JSON.stringify(data);
    const blob = new Blob([json_data], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  renderTableData(){
    return this.state.data.map((applicant,index)=>{
      const {language,application,applicant_details,applicant_name,aadhar_number,mobile_number,email} = applicant;
      return(
        <tr key={language}>
          <td>{language}</td>
          <td><input type="text" value={application} onChange={(e)=>{this.changeText(e)}}/></td>
          <td><input type="text" value={applicant_details} onChange={(e)=>{this.changeText(e)}}/></td>
          <td><input type="text" value={applicant_name} onChange={(e)=>{this.changeText(e)}}/></td>
          <td><input type="text" value={aadhar_number} onChange={(e)=>{this.changeText(e)}}/></td>
          <td><input type="text" value={mobile_number} onChange={(e)=>{this.changeText(e)}}/></td>
          <td><input type="text" value={email} onChange={(e)=>{this.changeText(e)}}/></td>
          <td><button value={language} id={language} key={language} onClick={(e)=>{this.onDownload(e)}}/>Download</td>
        </tr>
      )
    })
  }

  renderTableHeader(){
    var keys = Object.keys(this.state.data[0])
    console.log(keys)
  }
  
  render(){
    return(
      <Card body>
        <CardHeader>
          <input type="file" onChange={this.uploadDocument.bind(this)} />
          <button value="reset" onClick={this.purge.bind(this)} > Reset</button>
        </CardHeader>
          <CardBody>
              {this.state.data.length!==0 ?  (
              <table border="1" width="700px">
                <thead>
                  <tr>
                  <th>Language</th>
                  <th>Application</th>
                  <th>Application_details</th>
                  <th>Applicant_name</th>
                  <th>Aadhar_number</th>
                  <th>Mobile_number</th>
                  <th>Email</th>
                  <th>Download</th>
                  </tr>              
                </thead>
                <tbody>
                  {this.renderTableData()}
                </tbody>
              </table>
            ) : null
          }
         </CardBody>
      </Card>
    )
  }

}


export default App;
