export interface BankAccount {
    id: number;
    accountNumber: string;
    accountHolderName: string;
    balance: number;
  }
  
  const API_BASE_URL = "http://localhost:3000/api/BankAccount"; 
  
  export const fetchBankAccounts = async (): Promise<BankAccount[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch bank accounts");
    }
    return response.json();
  };

  export const depositMoney = async (accountId: number, amount: number): Promise<BankAccount> => {
    const response = await fetch(`${API_BASE_URL}/${accountId}/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to deposit money");
    }
    return response.json();
  };

  export const withdrawMoney = async (accountId: number, amount: number): Promise<BankAccount> => {
    const response = await fetch(`${API_BASE_URL}/${accountId}/withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to withdraw money");
    }
    return response.json();
  };
  