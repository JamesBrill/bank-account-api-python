import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BankAccountTable from '../components/BankAccountTable';
import MortgageApplicationForm, { Mortgage } from '../components/MortgageApplicationForm';
import MortgageList from '../components/MortgageList';
import { fetchMortgages, createMortgage } from '../api/mortgageApi';

const BankAccountsPage = () => {
  const [mortgages, setMortgages] = useState<Mortgage[]>([]);

  useEffect(() => {
    loadMortgages();
  }, []);

  const loadMortgages = async () => {
    try {
      const data = await fetchMortgages();
      setMortgages(data);
    } catch (error) {
      console.error('Failed to load mortgages:', error);
    }
  };

  const handleMortgageSubmit = async (mortgageData: Omit<Mortgage, 'id'>) => {
    await createMortgage(mortgageData);
    await loadMortgages();
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <MortgageApplicationForm onSubmit={handleMortgageSubmit} />
          <MortgageList mortgages={mortgages} />
          <Box sx={{ mt: 4 }}>
            <BankAccountTable />
          </Box>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default BankAccountsPage;
