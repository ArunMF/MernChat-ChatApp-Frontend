import React, { useEffect, useState } from 'react'
import './MessageArea.css'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { baseUrl } from '../baseurl'
import { useParams } from 'react-router-dom'
import { MDBTooltip } from 'mdb-react-ui-kit';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

function MessageArea() {

    const { id } = useParams() //Email id
    const myEmail = id;

    const [allContacts, setAllContacts] = useState([])
    const [chatUser, setChatUser] = useState([])
    const [message, setMessage] = useState('')
    const [allChats, setAllChats] = useState([])

    // function for view data of a particular user
    const handleViewAllContacts = async () => {
        await axios.get(`${baseUrl}/users/view-user/`+myEmail).then((result) => {
            setAllContacts(result.data.allContacts)
        })
            .catch((response) => {
                alert(response.response.data.message)
            })
    }
    // console.log(allContacts);

    const handleAllMessages = async (chatEmail) => {
        await axios.get(`${baseUrl}/messages/all-messages/`+myEmail).then((result) => {
            setAllChats([]);
            for (let n in result.data) {
                if ((result.data[n].from == myEmail && result.data[n].to == chatEmail) ||
                    (result.data[n].from == chatEmail && result.data[n].to == myEmail)) {
                    setAllChats(current => [...current, result.data[n]])
                }
            }
        })
    }

    const handleViewContact = (userEmail) => {
        // handleAllMessages()
        document.getElementById('chatarea').style.visibility = "visible";
        document.getElementById('chatCol').style.boxShadow = "none";
        setChatUser(allContacts.find(contact => contact.email == userEmail))
    }
    // console.log(allChats);

    const handleSendMsg = async (toEmail) => {
        const msgBody = { fromEmail: myEmail, toEmail, chatMsg: message }
        var msgElement = document.getElementById('enterMsg');
        if (msgElement.value=='') {
            alert("Enter message")
        }
        else{
            await axios.post(`${baseUrl}/messages/send-msg`, msgBody).then((response) => {
                // alert(response.data.message);
            })
                .catch((response) => {
                    console.log(response.response.data.message);
                })
    
            handleAllMessages(toEmail)
            msgElement.value=""
        }
    }


    useEffect(() => {
        handleViewAllContacts()
    })

    return (
        <Row>

            {/* All contacts area */}
            <Col className='col-4 p-1'>
                <div className='p-3'>
                    <h4 className='mb-3'>All Contacts</h4>

                    {/* All contacts */}
                    <div className='border-bottom' id='allContact'>
                        {
                            allContacts.map((contact) => (
                                <Row onClick={() => {handleAllMessages(contact.email);handleViewContact(contact.email);}} className='border-bottom rounded py-2 my-2 mx-1' id='contact'>
                                    <Col className='col-2'>
                                        <img src={contact.imageurl} height="40px" style={{ width: "40px", borderRadius: "20px" }} alt="" />
                                    </Col>
                                    <Col className='col-10 pt-1 ps-3'>
                                        <h6 style={{ fontSize: "18px" }}>{contact.fullname}</h6>
                                        <p className='text-success' style={{ marginTop: "-13px", fontFamily: "'Titillium Web', sans-serif", fontSize: "12px" }}>{contact.email}</p>
                                    </Col>
                                </Row>
                            ))
                        }

                    </div>
                </div>
            </Col>

            {/* Chat Area */}
            <Col className='col-8 p-1' id='chatCol'>
                <div className='p-3 rounded shadow' style={{ height: "480px" }} id='chatarea'>

                    {/* Chat person name and image */}
                    <Row className='p-2 rounded text-white' style={{ backgroundColor: "#008069" }}>
                        <Col className='col-10 d-flex pt-1'>
                            <img src={chatUser.imageurl} height="40px" style={{ width: "40px", borderRadius: "20px" }} alt="" />
                            <h6 className='m-2'>{chatUser.fullname}</h6>
                        </Col>
                        <Col className='col-2 d-flex'>
                            <button className='border-0 btn text-white shadow-0 p-1 mt-1'><i class="fa-solid fa-circle-info fs-5"></i></button>

                            <MDBDropdown animation={false}>
                                <MDBDropdownToggle className='border-0 shadow-0 ms-4 mt-1 px-1' style={{ backgroundColor: "#008069" }}><i class="fa-solid fa-ellipsis-vertical fs-6"></i></MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link>Delete Chat</MDBDropdownItem>
                                    <MDBDropdownItem link>Remove Contact</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </Col>
                    </Row>

                    {/* Messages */}
                    <Row className='p-3 pb-2' id='allMessages'>
                        {
                            allChats.map((chat) => (
                                <div>
                                    <p className='p-2 px-3' id='sendMsg'>{chat.sentMsg}</p>
                                    <p className='p-2 px-3' id='recvMsg'>{chat.recieveMsg}</p>
                                </div>
                            ))
                        }

                    </Row>

                    {/* Message type area */}
                    <Row className='px-3 d-flex' id='typeMsg'>
                        <Col className='col-11'>
                            <input id='enterMsg' type="text" onChange={(e) => setMessage(e.target.value)} className='form-control' placeholder='Type a message' />
                        </Col>
                        <Col className='col-1'>
                            <button onClick={() => handleSendMsg(chatUser.email)} className='btn btn-success'><i class="fa-solid fa-paper-plane" style={{ marginLeft: "-8px" }}></i></button>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default MessageArea