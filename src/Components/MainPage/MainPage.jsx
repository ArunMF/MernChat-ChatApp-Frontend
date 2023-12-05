import React, { useContext, useState } from 'react'
import './MainPage.css'
import { Col, Row } from 'react-bootstrap'
import SearchArea from '../SearchArea/SearchArea'
import { Link, useParams } from 'react-router-dom'
import MessageArea from '../MessageArea/MessageArea'
// import SignIn from '../SignIn/SignIn'

function MainPage() {

  // console.log(SignIn);

  return (
    <div className='px-4' style={{ height: "630px" }}>
      <Row>

      {/* Message area */}
      <Col className='col-9'>
        <MessageArea/>
      </Col>

        {/* All contacts */}
        {/* <Col className='col-3 p-1'>
          <AllContacts />
        </Col> */}

        {/* Chat area */}
        {/* <Col className='col-6 p-1'>
          <ChatArea />
        </Col> */}

        {/* Search area */}
        <Col className='col-3 p-1'>
          <SearchArea />
        </Col>
      </Row>

      {/* Logout button */}
      <Row className='py-4'>
        <Link to={'/'} className='d-flex justify-content-center'>
          <button className='btn btn-success w-25'><b>Logout</b></button>
        </Link>
      </Row>
    </div>
  )
}

export default MainPage