import { Container, Typography } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Employee Overview
        </Typography>
      </Container>
    </QueryClientProvider>
  )
}

export default App
