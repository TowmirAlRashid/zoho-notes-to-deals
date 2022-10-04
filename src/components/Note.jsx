import { Box, Button, TextField, Typography } from '@mui/material'
import NoteIcon from '@mui/icons-material/Note';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

const Note = ({ title, content, edit, setEdit, id }) => {
    const { control } = useForm()
  return (
    <Box sx={{ textAlign: 'left', mb: '2rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.8rem', alignItems: 'center',  mb: '1rem' }}>
            {
                edit ?
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.8rem', alignItems: 'center'}}>
                    <Controller
                        name={`test[${id}].Note_Title`}
                        control={control}
                        render={({ field }) => (
                        <TextField
                            variant="outlined"
                            defaultValue={title}
                            sx={{width: '600px'}}
                            {...field}
                        />
                        )}
                    />
                    <Button onClick={() => setEdit(!edit)}>
                        <CheckIcon sx={{ fontSize: '18px', color: 'green'}} />
                    </Button>
                </Box>
                : 
                <>
                    <NoteIcon sx={{ fontSize: '18px', color: 'blue'}} />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px',}} >
                        {title}
                    </Typography>
                    <Button onClick={() => setEdit(!edit)}>
                        <EditIcon sx={{ fontSize: '18px', color: 'red'}} />
                    </Button>
                </>
            }
        </Box>

        <Typography sx={{ fontSize: '17px' }}>
            {content}
        </Typography>
    </Box>
  )
}

export default Note

