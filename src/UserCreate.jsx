import { Container, Box, CssBaseline, Typography, Grid, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { api } from './services/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const UserCreate = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()
       await axios.post(`${api}/users/create`, {
            "fname" : fname,
            "lname" : lname,
            "username" : username,
            "password" : "1234",
            "email" : email,
            "avatar" : avatar
        }).then( async (response) => {
            if(response.data.status == "ok") {
               await Swal.fire({
                    title: 'เพิ่มข้อมูลสำเร็จ!',
                    text: 'เรียบร้อย',
                    icon: 'success'
                  })
                 await navigate("/")
            }
        }).catch((err) => {
            console.log(err)
        })
    }


  return (
    <>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p:2 }}>
            <Typography variant='h6' gutterBottom component="div">
                เพิ่มผู้ใช้
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField id="fname" label="ชื่อจริง" variant='outlined'
                        fullWidth required
                        onChange={(e) => setFname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="lname" label="นามสกุล" variant='outlined'
                        fullWidth required
                        onChange={(e) => setLname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="username" label="ชื่อผู้ใช้" variant='outlined'
                        fullWidth required
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="email" label="อีเมล" variant='outlined'
                        fullWidth required
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField id="avatar" label="รูปโปรไฟล์" variant='outlined'
                        fullWidth required
                        onChange={(e) => setAvatar(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant='contained'>
                            ยืนยัน
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </>
  )
}

export default UserCreate