import { Container, Typography } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import EmployeeTable from './components/employee-table/EmployeeTable'

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Employee Overview
        </Typography>

        <EmployeeTable /> 
      </Container>
    </QueryClientProvider>
  )
}

export default App
