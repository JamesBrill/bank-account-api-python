import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Mortgage } from './MortgageApplicationForm';

interface MortgageListProps {
  mortgages: Mortgage[];
}

export default function MortgageList({ mortgages }: MortgageListProps) {
  if (mortgages.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No mortgages yet. Apply above to get started!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ p: 2, pb: 0 }}>
        🏡 Your Mortgages ({mortgages.length})
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Applicant Name</strong></TableCell>
              <TableCell><strong>Property</strong></TableCell>
              <TableCell align="right"><strong>Loan Amount</strong></TableCell>
              <TableCell align="right"><strong>Interest Rate</strong></TableCell>
              <TableCell align="center"><strong>Fixed Term</strong></TableCell>
              <TableCell align="center"><strong>Application Date</strong></TableCell>
              <TableCell align="center"><strong>Expiry Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mortgages.map((mortgage) => (
              <TableRow key={mortgage.id} hover>
                <TableCell>{mortgage.applicantName}</TableCell>
                <TableCell>{mortgage.propertyAddress}</TableCell>
                <TableCell align="right">
                  ${mortgage.loanAmount.toLocaleString()}
                </TableCell>
                <TableCell align="right">{mortgage.interestRate}%</TableCell>
                <TableCell align="center">{mortgage.fixedTermYears} years</TableCell>
                <TableCell align="center">{mortgage.applicationDate}</TableCell>
                <TableCell align="center">{mortgage.expiryDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
