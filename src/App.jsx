import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Note from "./components/Note";

const ZOHO = window.ZOHO;

function App() {
  const [initialized, setInitialized] = useState(false) //initializing widget
  const [entity, setEntity] = useState() //module entity 
  const [entityId, setEntityId] = useState() //module id

  const [notes, setNotes] = useState([]) // keeps the notes

  const [edit, setEdit] = useState(false)

  const { control, watch, handleSubmit,  setValue } = useForm({ //creating the default form
    defaultValues: {
      test: notes?.length > 0 ? notes : [{ id: "", Note_Title: "", Note_Content: "" }] // notes or default
    }
  });

  const { fields, append, remove } = useFieldArray(  //field array that controls each row
    {
      control,
      name: "test"
    }
  );

  const stage = watch();

  useEffect(() => {  //rendered once during widget first load
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      setEntity(data?.Entity);
      setEntityId(data?.EntityId?.[0])
    });

    ZOHO.embeddedApp.init().then(() => {
      ZOHO.CRM.UI.Resize({height: "600", width:"1000"}).then(function(data){
        console.log(data);
      });
      setInitialized(true)
    });
  }, [])

  useEffect(() => {
    if (entity && entityId) {
      ZOHO.CRM.API.getRelatedRecords({Entity:entity,RecordID:entityId,RelatedList:"Notes",page:1,per_page:200})
      .then(function(data){
          setNotes(data?.data)
          console.log(data?.data)
      })
    }
  }, [initialized, entity, entityId])


  return (
    <div>
      <Box
        // onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{
          width: "90%",
          m: "2rem auto 1.5rem",
        }}
      >
        <Typography sx={{ textAlign: "center", mb: "2rem" }} variant="h6">
          Manage all of your <strong>Notes</strong> here!
        </Typography>

        <Paper
          sx={{
            width: "100%",
            overflowX: "auto",
            margin: "2rem auto",
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', p: '1.5rem 2rem' }}>
            {
              notes?.map((note) => (
                <Note
                  key={note?.id}
                  id={note?.id}
                  title={note?.Note_Title}
                  content={note?.Note_Content}
                  edit={edit}
                  setEdit={setEdit}
                />
              ))
            }
          </Box>
      </Paper>
      </Box>
    </div>
  );
}

export default App;

