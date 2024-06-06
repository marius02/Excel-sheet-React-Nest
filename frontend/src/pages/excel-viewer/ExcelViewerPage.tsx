import { Box, Typography } from "@mui/material"
import ExcelViewer from "excel-viewer"
import { useCallback, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"

export default function ExcelViewerPage() {
  const { fileName } = useParams()
  const excelRef = useRef(null)

  const readData = useCallback(async () => {
    if (fileName && excelRef) {
      const apiUrl = import.meta.env.VITE_API_URL;

      new ExcelViewer(excelRef.current, `${apiUrl}/excelMng/${fileName}`)
    }
  }, [fileName, excelRef])

  useEffect(() => {
    readData()
  }, [readData])

  return (
    <Box>
      <Typography>{fileName}</Typography>
      <Box ref={excelRef} sx={{ overflow: 'scroll' }}>
      </Box>
    </Box>
  )
}