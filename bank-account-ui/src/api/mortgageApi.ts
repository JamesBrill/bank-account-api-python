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

const API_BASE_URL = "http://localhost:3000/api/Mortgage";

export const fetchMortgages = async (): Promise<Mortgage[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch mortgages");
  }
  return response.json();
};

export const createMortgage = async (mortgage: Omit<Mortgage, 'id'>): Promise<void> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mortgage),
  });
  if (!response.ok) {
    throw new Error("Failed to create mortgage");
  }
};
