import { Box, Button, Stack, Typography } from "@mui/material"
import { ChangeEvent, useCallback, useState } from "react"
import { useMutation } from "react-query"
import { uploadFile } from "../../apis/mutation/upload.mutation"
import { useNavigate } from "react-router-dom"

export default function UploadPage() {
  const [file, setFile] = useState<File>()
  const navigate = useNavigate()

  const uploadMutation = useMutation(uploadFile, {
    onSuccess: (data) => {
      navigate(`/excelViewer/${data.filename}`)
    }
  })

  const handleFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      uploadMutation.mutate(e.target.files[0])
    }
  }, [uploadMutation])

  return (
    <Box>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            onChange={handleFileChange}
            hidden
          />
        </Button>
        <Typography>{file?.name}</Typography>
      </Stack>
    </Box>
  )
}