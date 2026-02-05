import { useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BankAccountTable from '../components/BankAccountTable';
import MortgageApplicationForm, { Mortgage } from '../components/MortgageApplicationForm';
import MortgageList from '../components/MortgageList';

const BankAccountsPage = () => {
  const [mortgages, setMortgages] = useState<Mortgage[]>([]);

  const handleMortgageSubmit = (mortgageData: Omit<Mortgage, 'id'>) => {
    const newMortgage: Mortgage = {
      ...mortgageData,
      id: Date.now(),
    };
    setMortgages([...mortgages, newMortgage]);
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
