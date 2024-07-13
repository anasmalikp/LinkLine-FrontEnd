import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AddContact, GetAllContacts, switchSpam } from '../../services/ContactServices';
import Button from '@mui/material/Button';
import NavBar from './NavBar';
import './HomeComponent.css'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { GetAllUSers } from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 5,
};

const HomeComponent = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [newContact, setNewContact] = useState()
    const [users, setUsers] = useState([])
    const [isSpam, setIsSpam] = useState(false)
    const fetchContacts = async () => {
        if (isSpam) {
            const response = await GetAllContacts("spam")
            setData(response)
        } else {
            const response = await GetAllContacts("all")
            setData(response)
        }
    }

    const AllUsers = async () => {
        const response = await GetAllUSers()
        if (response != null) {
            setUsers(response)
        }
    }

    const Add = async (e) => {
        e.preventDefault();
        const response = await AddContact(newContact);
        if (response == 200) {
            fetchContacts()
            handleClose()
        } else {
            console.log(res);
            alert("something went wrong")
        }
    }

    const spamSwitch = async (contact_id) => {
        var response = await switchSpam(contact_id);
        if (response == 200) {
            fetchContacts()
        }

    }

    const LogOut = ()=>{
        Cookies.remove('token')
        navigate('/')
    }

    const GetDate = (date) => {
        const formatted = date.slice(0, 10);
        return formatted;
    }

    useEffect(() => {
        fetchContacts()
        AllUsers()
    }, [isSpam])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setNewContact(null)
    };
    return (
        <>
            <NavBar />
            <div className='home_sub'>
                <div className='home_sub_btns'>
                    <Button onClick={handleOpen}>Create Contact</Button>
                    {isSpam ? <Button onClick={() => setIsSpam(false)}>View All</Button> : <Button onClick={() => setIsSpam(true)}>Sort Spam</Button>}
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Phone Number</TableCell>
                                <TableCell align="right">E-Mail</TableCell>
                                <TableCell align="right">Created By</TableCell>
                                <TableCell align="right">Created At</TableCell>
                                <TableCell align="right">is Spam? </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <TableRow
                                    className={row.isSpam ? 'table_row' : null}
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.number}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{users.filter(val => val.id == row.createdBy)[0]?.email}</TableCell>
                                    <TableCell align="right">{GetDate(row.createdAt)}</TableCell>
                                    <TableCell align="right">
                                        {row.isSpam ? <Button onClick={() => spamSwitch(row.id)}>UnSpam</Button> : <Button onClick={() => spamSwitch(row.id)} color='error'>Spam</Button>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create New Contact
                    </Typography>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <form className='home_form' onSubmit={Add}>
                            <label>Contact Name:</label>
                            <Input required className='modal_inputs' type='text' onChange={e => setNewContact({ ...newContact, name: e.target.value })} />
                            <br />
                            <label>Phone Number</label>
                            <Input required className='modal_inputs' type='text' onChange={e => setNewContact({ ...newContact, number: e.target.value })} />
                            <br />
                            <label>E-Mail</label>
                            <Input required className='modal_inputs' type='email' onChange={e => setNewContact({ ...newContact, email: e.target.value })} />
                            <br />
                            <Button type='submit'>Add</Button>
                            <Button onClick={handleClose} color='error'>Cancel</Button>
                        </form>
                    </div>
                </Box>
            </Modal>
            <div  className='logoutbtn' >
                <Button style={{color:'black'}} onClick={LogOut}>Log Out</Button>
            </div>
        </>
    )
}

export default HomeComponent