import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import NavBar from './components/NavBar';
import {Box, Stack, Typography, TextField, Button, Avatar} from "@mui/material"
import PosterPub from './components/PosterPub';
import axios from 'axios'
import { useQueryClient, useQuery } from "@tanstack/react-query"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CartePub from './components/CartePub';



export default function Dashboard() {
    const navigate = useNavigate();
    //const [posts, setPosts] = useState([])

    function formatDate(date) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);

        // Split the formatted date into day, month, and year parts
        const [month, day, year] = formattedDate.split(' ');

        // Convert the month abbreviation to uppercase
        const capitalizedMonth = month.toLowerCase();

        return `${day} ${capitalizedMonth} ${year}`;
    }

    useEffect(()  => {
        if(!localStorage.getItem("user")){
            navigate("/connexion");
        }
    })

    const queryClient = useQueryClient();
    const {data: posts, error, isLoading} = useQuery({
        queryKey: ["publications"],
        queryFn: () => axios.get("http://localhost:3004/posts")
                       .then((res) => res.data),
        onerror: (error) => console.log(error),

    })

    if(isLoading){
        return <div>Chargement...</div>
    }
    
    let pubTrier = posts.sort((a, b) => {
        return new Date(b.datePub) - new Date(a.datePub);
    })

  return (
    <Box bgcolor={"#eef4ff"}>
        <NavBar/>
        <PosterPub/>
        <Box  width={"60%"} margin={"auto"} marginTop={4}>
            {posts && pubTrier.map((post) => ( 
            <CartePub key={post.id} post={post}  formatDate={formatDate}/>

            ))}
        </Box>
    </Box>
  )
}
