import React from 'react'
import { Box, Stack, Typography, TextField, Button, Avatar } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import axios from 'axios'
import { toast } from "react-hot-toast"


export default function CartePub({ post, formatDate }) {

    const user = JSON.parse(localStorage.getItem('user'));

    const useQuery = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`http://localhost:3004/posts/${id}`);
        },
        onError: (error) => {
            toast.error('Une erreur est survenue lors de la supression de votre poste!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
        },
        onSuccess: () => {
            useQuery.invalidateQueries("posts");
            toast.success('Votre publication a été supprimée avec succès!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }

    })
    const supprimerPub = (id) => {
        mutation.mutate(id);

    };

    return (

        <Box width={"100%"}
            bgcolor={"#ffff"}
            borderRadius={5}
            marginBottom={4}
            padding={2}
            key={post.id}
        >
            <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Avatar src={post.photoUtilisateur} />
                <Typography>{post.auteur}</Typography>
                {
                    user.id === post.userId &&
                    <IconButton aria-label="delete" onClick={() => supprimerPub(post.id)}>
                        <DeleteIcon />
                    </IconButton>
                }
            </Stack>
            <Typography>Posted on {formatDate(post.datePub)}</Typography>
            <Typography>{post.postPub}</Typography>

            <img src={post.imageUrl} style={{
                width: "100%",
                borderRadius: 5
            }} />
        </Box>
    )
}
