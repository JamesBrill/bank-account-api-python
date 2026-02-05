import { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  Alert,
} from '@mui/material';

export interface Mortgage {
  id: number;
  applicantName: string;
  propertyAddress: string;
  loanAmount: number;
  interestRate: number;
  fixedTermYears: number;
  expiryDate: string;
  applicationDate: string;
}

interface MortgageApplicationFormProps {
  onSubmit: (mortgage: Omit<Mortgage, 'id'>) => Promise<void>;
}

export default function MortgageApplicationForm({ onSubmit }: MortgageApplicationFormProps) {
  const [formData, setFormData] = useState({
    applicantName: '',
    propertyAddress: '',
    loanAmount: '',
    interestRate: '',
    fixedTermYears: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const loanAmount = parseFloat(formData.loanAmount);
      const interestRate = parseFloat(formData.interestRate);
      const fixedTermYears = parseInt(formData.fixedTermYears);
      
      const applicationDate = new Date().toISOString().split('T')[0];
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + fixedTermYears);
      
      await onSubmit({
        applicantName: formData.applicantName,
        propertyAddress: formData.propertyAddress,
        loanAmount,
        interestRate,
        fixedTermYears,
        expiryDate: expiryDate.toISOString().split('T')[0],
        applicationDate,
      });

      // Reset form
      setFormData({
        applicantName: '',
        propertyAddress: '',
        loanAmount: '',
        interestRate: '',
        fixedTermYears: '',
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to submit mortgage application');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        🏠 Mortgage Application
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Mortgage application submitted successfully!</Alert>}
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Applicant Name"
              value={formData.applicantName}
              onChange={handleChange('applicantName')}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Property Address"
              value={formData.propertyAddress}
              onChange={handleChange('propertyAddress')}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              type="number"
              label="Loan Amount"
              value={formData.loanAmount}
              onChange={handleChange('loanAmount')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              type="number"
              label="Interest Rate"
              value={formData.interestRate}
              onChange={handleChange('interestRate')}
              inputProps={{ step: '0.01', min: '0', max: '20' }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              type="number"
              label="Fixed Term (Years)"
              value={formData.fixedTermYears}
              onChange={handleChange('fixedTermYears')}
              inputProps={{ min: '1', max: '30' }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              fullWidth
            >
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
