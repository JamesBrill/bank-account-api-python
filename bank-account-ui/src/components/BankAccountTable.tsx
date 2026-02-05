import { useEffect, useState } from 'react';
import { fetchBankAccounts, BankAccount, depositMoney, withdrawMoney } from '../api/bankAccountApi'; 
import '../styles/BankAccountTable.css';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Alert,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const BankAccountTable = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [amount, setAmount] = useState('');
  const [transactionError, setTransactionError] = useState<string | null>(null);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadAccounts(searchTerm);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadAccounts = async (nameFilter?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchBankAccounts(nameFilter);
      setAccounts(data);
    } catch (err) {
      setError("Failed to load accounts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const openDialog = (account: BankAccount, type: 'deposit' | 'withdraw') => {
    setSelectedAccount(account);
    setDialogType(type);
    setAmount('');
    setTransactionError(null);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedAccount(null);
    setAmount('');
    setTransactionError(null);
  };

  const handleTransaction = async () => {
    if (!selectedAccount || !amount) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setTransactionError('Amount must be a positive number');
      return;
    }

    try {
      if (dialogType === 'deposit') {
        await depositMoney(selectedAccount.id, numAmount);
      } else {
        await withdrawMoney(selectedAccount.id, numAmount);
      }
      await loadAccounts(searchTerm);
      closeDialog();
    } catch (err: any) {
      setTransactionError(err.message || 'Transaction failed');
    }
  };

  return (
    <div className="table-wrapper">
      <h2 className="title">Bank Accounts</h2>
      
      {/* Search Box */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by account holder name..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <div className="table-container">
        {error ? (
          <p className="error">{error}</p>
        ) : isLoading ? (
          <p>Loading accounts...</p>
        ) : accounts.length === 0 ? (
          <p>No accounts found{searchTerm ? ` matching "${searchTerm}"` : ''}.</p>
        ) : (
          <table className="account-table">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Account Holder</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.accountNumber}</td>
                  <td>{account.accountHolderName}</td>
                  <td>${account.balance.toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="contained" 
                      color="success" 
                      size="small"
                      onClick={() => openDialog(account, 'deposit')}
                      sx={{ mr: 1 }}
                    >
                      Deposit
                    </Button>
                    <Button 
                      variant="contained" 
                      color="warning" 
                      size="small"
                      onClick={() => openDialog(account, 'withdraw')}
                    >
                      Withdraw
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {dialogType === 'deposit' ? 'Deposit Money' : 'Withdraw Money'}
        </DialogTitle>
        <DialogContent>
          {selectedAccount && (
            <>
              <p><strong>Account:</strong> {selectedAccount.accountNumber}</p>
              <p><strong>Holder:</strong> {selectedAccount.accountHolderName}</p>
              <p><strong>Current Balance:</strong> ${selectedAccount.balance.toFixed(2)}</p>
              
              {transactionError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {transactionError}
                </Alert>
              )}
              
              <TextField
                autoFocus
                margin="dense"
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button 
            onClick={handleTransaction}
            variant="contained"
            color={dialogType === 'deposit' ? 'success' : 'warning'}
          >
            {dialogType === 'deposit' ? 'Deposit' : 'Withdraw'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BankAccountTable;
