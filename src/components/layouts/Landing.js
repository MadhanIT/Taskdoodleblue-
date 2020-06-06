import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import { GetUserData,UserCreate,UserDelete} from '../../actions/authAction';
import Swal from 'sweetalert2';
import moment from "moment";
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  confirmButtonColor: '#D3D3D3',
  timer: 10000
})
class Landing extends Component {
  constructor(){
    super();
    this.state={
      errors:{},
      UserDataLoading  : false,
      userData : [],
      UserId : "",
    }   
    this.onSubmit = this.onSubmit.bind(this); 
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.GetUserData();
  }
  onChange(e) {
    this.setState({[e.target.name]:e.target.value})
  }
  deleteUser(e,result){
    e.preventDefault();
    var UserData = {
      UserId : result._id
    }
    this.props.UserDelete(UserData);
  }
  EditUser(e,result){
    e.preventDefault();
    this.setState({
      UserName : result.UserName,
      Email : result.Email,
      MobileNumber : result.MobileNumber,
      CompanyName : result.CompanyName,
      UserId : result._id
    })
  }
  addUser(e){
    e.preventDefault();
    this.setState({
      UserName : "",
      Email : "",
      MobileNumber : "",
      CompanyName : "",
      UserId : ""
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.getUsers !== this.props.auth.getUsers){

      this.setState({
        userData : nextProps.auth.getUsers.Data,
        UserDataLoading : true
      })
      window.$("#addEmployeeModal").modal("hide");
      
    }
    if(nextProps.auth.createNewUser !== this.props.auth.createNewUser){
      this.props.GetUserData();
      if(this.state.UserId){
        Toast.fire({ type: 'success',title: "User Updated Successfully"})
      }else {
        Toast.fire({ type: 'success',title: "User Create Successfully"})
      }
      
    }
    if(nextProps.auth.deleteUser !== this.props.auth.deleteUser){
      this.props.GetUserData();
      Toast.fire({ type: 'success',title: "User Deleted Successfully"})
    }
  }
  onSubmit(e){
    e.preventDefault();
    if(!this.state.UserName){
      Toast.fire({ type: 'error',title: "Plesae fill the username"})
      return false;
    }
    if(!this.state.Email){
      Toast.fire({ type: 'error',title: "Plesae fill the Email"})
      return false;
    }
    if(!this.state.MobileNumber){
      Toast.fire({ type: 'error',title: "Plesae fill the Mobile number"})
      return false;
    }
    if(!this.state.CompanyName){
      Toast.fire({ type: 'error',title: "Plesae fill the Company Name"})
      return false;
    }
    var UserData = {
      UserName : this.state.UserName,
      Email : this.state.Email,
      MobileNumber : this.state.MobileNumber,
      CompanyName : this.state.CompanyName,
      UserId : this.state.UserId
    }
    this.props.UserCreate(UserData)
  }
  render() {
    var UserDataList;
    if(this.state.UserDataLoading){
      if(this.state.userData.length > 0){
        UserDataList =  this.state.userData.map((result,index)=>{ 
          return (
            <tr>
              <td>{index++ +1}</td>
              <td>{result.UserName}</td>
              <td>{result.Email}</td>
              <td>{result.CompanyName}</td>
              <td>{result.MobileNumber}</td>
              <td>{moment(result.CreatedAt).format("DD-MM-YYYY")}</td>
              <td>
                <a href="#addEmployeeModal" onClick={(e)=>this.EditUser(e,result)} className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                <a href="JavaScript:void(0)" onClick={(e)=>this.deleteUser(e,result)} ><i className="material-icons" data-toggle="tooltip" title="Delete"></i></a>
                <a><i className="fa fa-comment-o" data-toggle="tooltip" title="Chat"></i></a>
              </td>
            </tr>
          )
        });
      }else {
        UserDataList =  (<tr><td colSpan="7" className="text-center">No Records Found</td></tr>)
      }
      
    }else {
      UserDataList =  (<tr><td colSpan="7" className="text-center">No Records Found</td></tr>)
    }
    
              
    return (
      <div>
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Manage <b>Users</b></h2>
              </div>
              <div className="col-sm-6">
                <a href="#addEmployeeModal" onClick={(e)=>this.addUser(e)} className="btn btn-success" data-toggle="modal"><i className="material-icons"></i> <span>Add New User</span></a>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>company Name</th>
                <th>Phone</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {UserDataList}
            </tbody>
          </table>
        </div>
        {/* Edit Modal HTML */}
        <div id="addEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={this.onSubmit}>
                <div className="modal-header">						
                  <h4 className="modal-title">{this.state.UserId ? "Edit User"  : "Add User"}</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div className="modal-body">					
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" onChange={this.onChange} name="UserName" value={this.state.UserName} className="form-control"  />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={this.onChange} name="Email" value={this.state.Email} className="form-control"  />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" onChange={this.onChange} name="MobileNumber" value={this.state.MobileNumber} className="form-control"  />
                  </div>
                  <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" onChange={this.onChange} name="CompanyName" value={this.state.CompanyName} className="form-control"  />
                  </div>
                  					
                </div>
                <div className="modal-footer">
                  <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                  <button type="submit" className="btn btn-success"  >{this.state.UserId ? "Update User"  : "Add User"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes ={
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=>({
  auth : state.auth
});

export default connect(mapStateToProps,{GetUserData,UserCreate,UserDelete})(Landing);
