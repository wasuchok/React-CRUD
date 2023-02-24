import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, Button, Paper, Table, TableBody, 
TableCell, TableContainer, TableHead, TableRow, Avatar, ButtonGroup} 
from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { api } from './services/api'
import axios from 'axios';



 const  Users = () => {
  const [items, setItems] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    get_user()
  },[])

  const get_user = async () => {
   await axios.get(`${api}/users`).then((response) => {
      // console.log(response.data)
      setItems(response.data)
    })
  }

  const user_del = async id => {
   await axios.delete(`https://www.melivecode.com/api/users/delete`,{
      data : { "id" : id}
    }).then((response) => {
      console.log(response)
      get_user()
    }).catch((err) => {
      console.log(err)
    })
  }

  const show_user_single = async id => {
    navigate(`/edit/${id}`)
  }


  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p:2 }}>
        <Paper sx={{ p:2 }}>
        <Box display="flex">
          <Box sx={{ flexGrow : 1 }}>
          <Typography variant="h6" gutterBottom component="div">
        ผู้ใช้
      </Typography>
          </Box>
          <Box>
            <Link to="/create">
            <Button variant="contained">+ เพิ่ม</Button>
            </Link>
          </Box>
        </Box>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ไอดี</TableCell>
            <TableCell align="center">รูป</TableCell>
            <TableCell align="right">ชื่อจริง</TableCell>
            <TableCell align="right">นามสกุล</TableCell>
            <TableCell align="right">ชื่อผู้ใช้</TableCell>
            <TableCell align="right">เครื่องมือ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center">
                <Avatar alt={row.username} src={row.avatar} />
                </Box>
              </TableCell>
              <TableCell align="right">{row.fname}</TableCell>
              <TableCell align="right">{row.lname}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button onClick={() => show_user_single(row.id)}>แก้ไข</Button>
                  <Button onClick={() => user_del(row.id)}>ลบ</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </Paper>
      </Container>
    </>
  );
}


export default Users
