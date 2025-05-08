
export interface Referral {
  id: number;
  name: string;
  referralDate: string;
  collectedGift: boolean;
  becamePatient: boolean;
}

export const mockReferrals: Referral[] = [
  {
    id: 1,
    name: "Pamela Monti Rachid",
    referralDate: "10/04/2024",
    collectedGift: true,
    becamePatient: true
  },
  {
    id: 2,
    name: "Vinícius Lima",
    referralDate: "15/04/2024",
    collectedGift: false,
    becamePatient: false
  },
  {
    id: 3,
    name: "Maria Fernanda",
    referralDate: "20/04/2024",
    collectedGift: true,
    becamePatient: false
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    referralDate: "22/04/2024",
    collectedGift: false,
    becamePatient: true
  },
  {
    id: 5,
    name: "Ana Carolina",
    referralDate: "23/04/2024",
    collectedGift: true,
    becamePatient: false
  },
  {
    id: 6,
    name: "Paulo Mendes",
    referralDate: "24/04/2024",
    collectedGift: false,
    becamePatient: false
  },
  {
    id: 7,
    name: "Juliana Costa",
    referralDate: "25/04/2024",
    collectedGift: true,
    becamePatient: true
  },
  {
    id: 8,
    name: "Ricardo Ferreira",
    referralDate: "26/04/2024",
    collectedGift: false,
    becamePatient: false
  },
  {
    id: 9,
    name: "Mariana Silva",
    referralDate: "27/04/2024",
    collectedGift: true,
    becamePatient: false
  },
  {
    id: 10,
    name: "Roberto Alves",
    referralDate: "28/04/2024",
    collectedGift: false,
    becamePatient: true
  }
];
