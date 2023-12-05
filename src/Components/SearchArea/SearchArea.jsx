import React, { useEffect } from 'react'
import './SearchArea.css'
import { Col, Row } from 'react-bootstrap'
import { MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../baseurl';

function SearchArea() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams() //Email id
  const myEmail = id;
  // console.log(myEmail);

  const [viewUser, setViewUser] = useState([])
  const [allUsers, setAllusers] = useState([])
  const [allReq, setAllReq] = useState([])
  const [searchName, setSearchname] = useState('')

  // function for view data of a particular user
  const handleViewUser = async () => {
    await axios.get(`${baseUrl}/users/view-user/` + myEmail).then((result) => {
      setViewUser(result.data)
    })
      .catch((response) => {
        alert(response.response.data.message)
      })
  }
  // console.log(viewUser);

  // function for getting search users
  const handleSearchUser = async () => {
    await axios.get(`${baseUrl}/users/all-users`).then((result) => {
      let newSearchName = searchName.toLowerCase();
      if (searchName == '') {
        alert("Please enter the name")
      }
      setAllusers([]);
      for (let n in result.data) {
        let fullname = (`${result.data[n].firstname} ${result.data[n].lastname}`).toLowerCase();
        if ((result.data[n].id).toLowerCase() != myEmail) {
          if ((result.data[n].firstname).toLowerCase() == newSearchName ||
            (result.data[n].lastname).toLowerCase() == newSearchName ||
            fullname == newSearchName) {
            setAllusers(current => [...current, result.data[n]]);
          }
        }
      }
    })
      .catch((response) => {
        alert(response.response.data.message)
      })
  }
  // console.log(allUsers);

  // function to sent chat request
  const handleSentReq = async (toId) => {
    let toEmail = toId;
    let id = viewUser.id;
    let fullname = `${viewUser.firstname} ${viewUser.lastname}`;
    let imageurl = viewUser.imageurl;
    const request = { toEmail, id, fullname, imageurl }
    await axios.post(`${baseUrl}/requests/sent-request`, request).then((response) => {
      alert(response.data.message)
    })
      .catch((response) => {
        alert(response.response.data.message)
      })
  }

  // function for getting all requests
  const handleAllReq = async () => {
    await axios.get(`${baseUrl}/requests/all-requests`).then((result) => {
      setAllReq([]);
      for (let n in result.data) {
        if (result.data[n].toEmail == myEmail) {
          setAllReq(currentReqs => [...currentReqs, result.data[n]])
        }
      }
    })
    .catch((response) => {
      alert(response.response.data.message)
    })
  }
  // console.log(allReq);

  
  const handleDeleteReq = async(id)=>{
    await axios.delete(`${baseUrl}/requests/delete-req/${id}`)
    // .then((response)=>{
    //   alert(response.data.message)
    // })
    // .catch((response)=>{
    //   alert(response.response.data.message)
    // })
    handleAllReq()
  }
  // function to accept chat request
  const handleAcceptReq = async(email,fullname,imageurl)=>{
    const reqBody = {email,fullname,imageurl}
    await axios.post(`${baseUrl}/requests/accept-req/${myEmail}`,reqBody).then((response)=>{
      alert(response.data.message);
    })
    .catch((response)=>{
      alert(response.response.data.message);
    })
    handleDeleteReq(email)
    handleAllReq()
  }


  useEffect(() => {
    handleViewUser()
    handleAllReq()
  }, [])

  return (
    <div className='py-3 ps-3'>
      <div className='d-flex'>
        <div className='position-relative d-inline-block w-75 me-1'>

          {/* Chat requests button */}
          <MDBBtn className='btn btn-primary w-100' onClick={handleShow}>Chat requests</MDBBtn>
          <MDBBadge color='danger' pill className='position-absolute translate-middle p-2'>
            {allReq.length}
          </MDBBadge>
        </div>
        <button onClick={handleAllReq} className='btn border-0 shadow-0 p-2'><i class="fa-solid fa-arrows-rotate"></i></button>
        <img className='me-1 ms-3' src={viewUser.imageurl} height="40px" style={{ borderRadius: "20px", cursor: "pointer", width: "40px" }} alt="" />
      </div>

      {/* Chat requests offcanvas */}
      <Offcanvas show={show} onHide={handleClose} placement='end' backdrop='static'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chat Requests</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='border-bottom' id='allReq'>

            {/* All requests */}
            {
              allReq.map((req) => (
                <Row className='border-bottom border-top rounded py-2 my-2 mx-1' id='request'>
                  <Col className='col-2'>
                    <img src={req.imageurl} height="40px" style={{ width: "40px", borderRadius: "20px" }} alt="" />
                  </Col>
                  <Col className='col-7 pt-1' style={{ marginLeft: "-10px" }}>
                    <h6 style={{ fontSize: "17px" }}>{req.fullname}</h6>
                    <p className='text-success' style={{ marginTop: "-13px", fontFamily: "'Titillium Web', sans-serif", fontSize: "12px" }}>{req.id}</p>
                    <p className='text-dark' style={{ marginTop: "-20px", fontFamily: "'Titillium Web', sans-serif", fontSize: "13px" }}>Requested for chat</p>
                  </Col>
                  <Col className='col-3 d-flex ps-1'>
                    <button onClick={()=>handleAcceptReq(req.id,req.fullname,req.imageurl)} className='h-50 mt-3 border-0 bg-white text-success'><b><i class="fa-solid fa-check fs-5"></i></b></button>
                    <button onClick={()=>handleDeleteReq(req.id)} className='h-50 mt-3 ms-3 border-0 bg-white text-danger'><b><i class="fa-solid fa-xmark fs-5"></i></b></button>
                  </Col>
                </Row>
              ))
            }

          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* <h5 className='mt-5 mb-2 text-center'>Search people here</h5> */}

      {/* Search */}
      <Row className='mt-4 mb-2' id='search'>
        <Col className='col-10'>
          <input type="search" onChange={(e) => setSearchname(e.target.value)} placeholder='🔍 Search people here...' className='form-control w-100' style={{ height: "40px", fontSize: "16px" }} />
        </Col>
        <Col className='col-2' >
          <button onClick={handleSearchUser} className='btn btn-primary' style={{ marginLeft: "-20px", height: "40px" }}><i class="fa-solid fa-magnifying-glass"></i></button>
        </Col>
      </Row>

      {/* Result */}
      <div className='ps-2 w-100 border-bottom' id='searchResult'>
        {
          allUsers.map((user) => (
            <Row className='border-0 pe-2 py-2 ms-1 my-2 rounded' id='resContact'>
              <Col className='col-2'>
                <img src={user.imageurl} height="40px" style={{ width: "40px", borderRadius: "20px" }} alt="" />
              </Col>
              <Col className='col-8 pt-1 ps-3'>
                <h6 style={{ fontSize: "16px" }}>{user.firstname} {user.lastname}</h6>
                <p className='text-primary' style={{ marginTop: "-13px", fontFamily: "'Titillium Web', sans-serif", fontSize: "12px" }}>{user.id}</p>
              </Col>

              <Col className='col-2'>
                <button onClick={() => handleSentReq(user.id)} className='my-2' style={{ cursor: "pointer", border: "none", backgroundColor: "rgb(199, 229, 235)" }}><i class="fa-solid fa-user-plus"></i></button>
              </Col>
            </Row>
          ))
        }

      </div>
    </div>
  )
}

export default SearchArea