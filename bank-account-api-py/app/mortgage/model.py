class Mortgage:
    def __init__(
        self,
        id: int,
        applicant_name: str,
        property_address: str,
        loan_amount: float,
        interest_rate: float,
        fixed_term_years: int,
        expiry_date: str,
        application_date: str,
    ):
        self.id = id
        self.applicant_name = applicant_name
        self.property_address = property_address
        self.loan_amount = loan_amount
        self.interest_rate = interest_rate
        self.fixed_term_years = fixed_term_years
        self.expiry_date = expiry_date
        self.application_date = application_date

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "applicantName": self.applicant_name,
            "propertyAddress": self.property_address,
            "loanAmount": self.loan_amount,
            "interestRate": self.interest_rate,
            "fixedTermYears": self.fixed_term_years,
            "expiryDate": self.expiry_date,
            "applicationDate": self.application_date,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Mortgage":
        return cls(
            id=data.get("id", 0),
            applicant_name=data.get("applicantName", ""),
            property_address=data.get("propertyAddress", ""),
            loan_amount=data.get("loanAmount", 0.0),
            interest_rate=data.get("interestRate", 0.0),
            fixed_term_years=data.get("fixedTermYears", 0),
            expiry_date=data.get("expiryDate", ""),
            application_date=data.get("applicationDate", ""),
        )
