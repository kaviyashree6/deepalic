export interface PlanDetail {
  name: string;
  planNumber: string;
  description: string;
  minAge: number;
  maxAge: number;
  minTerm: number;
  maxTerm: number;
  minSumAssured: number;
  features: string[];
  benefits: string[];
  eligibility: string[];
}

export interface PlanCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  heroImage: string;
  plans: PlanDetail[];
}

export const planCategories: PlanCategory[] = [
  {
    id: "term",
    name: "Term Insurance Plans",
    tagline: "Pure Life Protection at Affordable Premiums",
    description: "Term insurance provides high life cover at low premiums. It offers financial security to your family in case of unfortunate events during the policy term.",
    icon: "FileText",
    heroImage: "/placeholder.svg",
    plans: [
      {
        name: "LIC Tech Term",
        planNumber: "954",
        description: "Online term assurance plan with affordable premiums and high sum assured options.",
        minAge: 18,
        maxAge: 65,
        minTerm: 10,
        maxTerm: 40,
        minSumAssured: 5000000,
        features: [
          "Level and Increasing Sum Assured options",
          "Online purchase with competitive premiums",
          "Special premium rates for females",
          "High Sum Assured Rebate available",
          "Option to add Accidental Death Benefit Rider"
        ],
        benefits: [
          "Death Benefit: Sum Assured paid to nominee",
          "Terminal Illness Benefit available",
          "Tax benefits under Section 80C and 10(10D)",
          "No maturity benefit (pure term plan)"
        ],
        eligibility: [
          "Age: 18-65 years (at entry)",
          "Maximum age at maturity: 80 years",
          "Medical examination may be required",
          "Income proof required for high sum assured"
        ]
      },
      {
        name: "LIC Jeevan Amar",
        planNumber: "955",
        description: "Non-linked, non-participating pure term insurance plan providing financial protection.",
        minAge: 18,
        maxAge: 65,
        minTerm: 10,
        maxTerm: 40,
        minSumAssured: 2500000,
        features: [
          "Level Cover and Increasing Cover options",
          "Premium payment term options available",
          "Special premium for non-tobacco users",
          "Option for Return of Premium",
          "Riders can be added for enhanced protection"
        ],
        benefits: [
          "Sum Assured on Death",
          "Option 1: Level Sum Assured throughout",
          "Option 2: Sum Assured increases by 10% yearly",
          "Tax benefits as per Income Tax Act"
        ],
        eligibility: [
          "Age: 18-65 years",
          "Policy Term: 10-40 years",
          "Premium Payment: Regular/Limited Pay",
          "Sum Assured: ₹25 Lakhs and above"
        ]
      },
      {
        name: "LIC Digi Term",
        planNumber: "Online",
        description: "Digital-first term insurance with seamless online purchase experience.",
        minAge: 18,
        maxAge: 60,
        minTerm: 10,
        maxTerm: 35,
        minSumAssured: 5000000,
        features: [
          "100% online purchase process",
          "No medical for lower sum assured",
          "Quick policy issuance",
          "High Sum Assured Rebate",
          "Competitive premium rates"
        ],
        benefits: [
          "Death Benefit paid to nominee",
          "Tax savings under 80C",
          "Pure protection plan",
          "Financial security for family"
        ],
        eligibility: [
          "Age: 18-60 years at entry",
          "Minimum Sum Assured: ₹50 Lakhs",
          "Policy Term: 10-35 years",
          "Valid email and phone required"
        ]
      }
    ]
  },
  {
    id: "endowment",
    name: "Endowment Plans",
    tagline: "Savings with Life Protection",
    description: "Endowment plans combine savings and protection, providing maturity benefits along with life cover throughout the policy term.",
    icon: "Wallet",
    heroImage: "/placeholder.svg",
    plans: [
      {
        name: "LIC Jeevan Utsav",
        planNumber: "871",
        description: "Participating endowment plan with guaranteed additions and survival benefits.",
        minAge: 90,
        maxAge: 65,
        minTerm: 15,
        maxTerm: 25,
        minSumAssured: 150000,
        features: [
          "10% of BSA payable annually from 2nd year",
          "Guaranteed Additions: ₹60/1000 BSA yearly",
          "Bonus additions throughout term",
          "Loan facility available",
          "Premium waiver option"
        ],
        benefits: [
          "Annual Survival Benefit: 10% of BSA",
          "Maturity: Sum Assured + Bonuses + GA",
          "Death: Sum Assured + Bonuses + GA",
          "Tax free maturity under 10(10D)"
        ],
        eligibility: [
          "Age: 90 days to 65 years",
          "Policy Term: 15-25 years",
          "Premium: Yearly/Half-yearly/Quarterly/Monthly",
          "Medical examination as per rules"
        ]
      },
      {
        name: "LIC New Jeevan Anand",
        planNumber: "915",
        description: "Popular participating endowment plan with whole life risk cover component.",
        minAge: 18,
        maxAge: 50,
        minTerm: 15,
        maxTerm: 35,
        minSumAssured: 100000,
        features: [
          "Participating endowment with bonus",
          "Whole life risk cover after maturity",
          "Loan facility available",
          "Flexible premium payment",
          "Optional rider benefits"
        ],
        benefits: [
          "Maturity: Sum Assured + Vested Bonuses",
          "Death during term: SA + Bonuses",
          "Death after maturity: Basic SA only",
          "Tax benefits under 80C and 10(10D)"
        ],
        eligibility: [
          "Age: 18-50 years at entry",
          "Max age at maturity: 75 years",
          "Policy Term: 15-35 years",
          "Sum Assured: ₹1 Lakh minimum"
        ]
      },
      {
        name: "LIC Bima Jyoti",
        planNumber: "960",
        description: "Non-linked, non-participating savings plan with guaranteed returns.",
        minAge: 18,
        maxAge: 57,
        minTerm: 15,
        maxTerm: 20,
        minSumAssured: 100000,
        features: [
          "Guaranteed maturity benefits",
          "No bonus - fixed returns",
          "Premium payment for limited period",
          "Loan available after 2 years",
          "Death benefit with return of premiums"
        ],
        benefits: [
          "Maturity: Guaranteed Sum Assured",
          "Death: 10x Annual Premium or SA whichever higher",
          "Special Surrender Value after 2 years",
          "Predictable returns"
        ],
        eligibility: [
          "Age: 18-57 years",
          "Policy Term: 15 or 20 years",
          "Premium Payment Term: 10 or 12 years",
          "Sum Assured: ₹1 Lakh minimum"
        ]
      }
    ]
  },
  {
    id: "children",
    name: "Children Plans",
    tagline: "Secure Your Child's Future",
    description: "Children plans help you systematically save for your child's education, marriage, and other future needs with the added benefit of life cover.",
    icon: "GraduationCap",
    heroImage: "/placeholder.svg",
    plans: [
      {
        name: "LIC Amritbaal",
        planNumber: "974",
        description: "Non-linked, participating child plan for securing your child's future milestones.",
        minAge: 0,
        maxAge: 17,
        minTerm: 18,
        maxTerm: 25,
        minSumAssured: 100000,
        features: [
          "Guaranteed Additions: ₹100/1000 SA yearly",
          "Vested Reversionary Bonuses",
          "Premium waiver on proposer's death",
          "Deferred maturity options",
          "Flexible policy term"
        ],
        benefits: [
          "Maturity: SA + Guaranteed Additions + Bonuses",
          "Death of child: Return of premiums + interest",
          "Death of proposer: Future premiums waived",
          "Child receives all benefits at maturity"
        ],
        eligibility: [
          "Child's Age: 0-17 years",
          "Proposer's Age: 18-57 years",
          "Maturity age of child: 18-25 years",
          "Sum Assured: ₹1 Lakh minimum"
        ]
      },
      {
        name: "LIC Jeevan Tarun",
        planNumber: "934",
        description: "Children money back plan with survival benefits at different life stages.",
        minAge: 0,
        maxAge: 12,
        minTerm: 13,
        maxTerm: 25,
        minSumAssured: 75000,
        features: [
          "Survival benefits at ages 20, 22, 24, 25",
          "Four payout options available",
          "Premium waiver benefit",
          "Bonus additions",
          "Risk cover continues after payouts"
        ],
        benefits: [
          "20% SA at age 20, 22, 24",
          "40% SA + Bonuses at age 25 (Option 1)",
          "Different payout options available",
          "Full SA on death during term"
        ],
        eligibility: [
          "Child's Age: 0-12 years",
          "Policy matures at age 25",
          "Sum Assured: ₹75,000 minimum",
          "Premium: Regular payment till maturity"
        ]
      },
      {
        name: "LIC New Children Money Back",
        planNumber: "932",
        description: "Participating plan providing periodic payments for child's needs.",
        minAge: 0,
        maxAge: 12,
        minTerm: 13,
        maxTerm: 25,
        minSumAssured: 100000,
        features: [
          "Money back at regular intervals",
          "Bonus additions",
          "Premium waiver on death of proposer",
          "Comprehensive risk cover",
          "Loan facility available"
        ],
        benefits: [
          "Survival benefits: 20% at age 18, 20, 22",
          "Maturity: 40% SA + Bonuses at age 25",
          "Death: Full SA + Bonuses",
          "Tax benefits applicable"
        ],
        eligibility: [
          "Child's Age: 0-12 years",
          "Proposer's Age: 18-51 years",
          "Policy Term: 25 minus entry age",
          "Sum Assured: ₹1 Lakh minimum"
        ]
      }
    ]
  },
  {
    id: "pension",
    name: "Pension Plans",
    tagline: "Retirement Security and Regular Income",
    description: "Pension plans help you build a retirement corpus and receive regular annuity payments to maintain your lifestyle after retirement.",
    icon: "Clock",
    heroImage: "/placeholder.svg",
    plans: [
      {
        name: "LIC New Jeevan Shanti",
        planNumber: "958",
        description: "Single premium deferred annuity plan with guaranteed returns.",
        minAge: 30,
        maxAge: 79,
        minTerm: 1,
        maxTerm: 12,
        minSumAssured: 150000,
        features: [
          "Single premium payment",
          "Deferment period: 1-12 years",
          "Guaranteed annuity rates",
          "Multiple annuity options",
          "Joint life annuity available"
        ],
        benefits: [
          "Guaranteed addition: ₹60/1000 purchase price yearly",
          "Annuity options: 9 different variants",
          "Joint life options for couples",
          "Return of purchase price on death options"
        ],
        eligibility: [
          "Age: 30-79 years at purchase",
          "Max age at vesting: 80 years",
          "Single Premium: ₹1.5 Lakh minimum",
          "Deferment: 1-12 years"
        ]
      },
      {
        name: "LIC Jeevan Akshay VII",
        planNumber: "957",
        description: "Immediate annuity plan for regular income right from purchase.",
        minAge: 30,
        maxAge: 85,
        minTerm: 0,
        maxTerm: 0,
        minSumAssured: 100000,
        features: [
          "Immediate annuity commencement",
          "10 annuity options available",
          "Single premium plan",
          "Joint life options",
          "Return of premium options"
        ],
        benefits: [
          "Lifetime annuity payments",
          "Option with return of purchase price",
          "Increasing annuity options (3% yearly)",
          "Joint life last survivor annuity"
        ],
        eligibility: [
          "Age: 30-85 years",
          "Single Premium: ₹1 Lakh minimum",
          "Annuity starts immediately",
          "Monthly/Quarterly/Half-yearly/Yearly payout"
        ]
      },
      {
        name: "LIC Saral Pension",
        planNumber: "962",
        description: "Simple immediate annuity plan with easy-to-understand features.",
        minAge: 40,
        maxAge: 80,
        minTerm: 0,
        maxTerm: 0,
        minSumAssured: 100000,
        features: [
          "Standardized simple product",
          "Only 2 annuity options",
          "Single premium",
          "Immediate annuity",
          "Return of purchase price on death"
        ],
        benefits: [
          "Option 1: Life annuity with RoPP",
          "Option 2: Joint life with RoPP",
          "100% purchase price returned on death",
          "Guaranteed lifetime income"
        ],
        eligibility: [
          "Age: 40-80 years",
          "Single Premium: ₹1 Lakh minimum",
          "No maximum limit",
          "Immediate commencement"
        ]
      }
    ]
  },
  {
    id: "moneyback",
    name: "Money Back Plans",
    tagline: "Periodic Returns with Life Protection",
    description: "Money back plans provide survival benefits at regular intervals while keeping the life cover intact throughout the policy term.",
    icon: "RefreshCw",
    heroImage: "/placeholder.svg",
    plans: [
      {
        name: "LIC New Money Back 20 Years",
        planNumber: "920",
        description: "Participating money back plan with survival benefits every 5 years.",
        minAge: 13,
        maxAge: 45,
        minTerm: 20,
        maxTerm: 20,
        minSumAssured: 100000,
        features: [
          "Survival benefits: 20% at 5, 10, 15 years",
          "Maturity: 40% + Bonuses",
          "Bonus additions",
          "Loan facility available",
          "Optional riders"
        ],
        benefits: [
          "20% of SA at end of 5th, 10th, 15th year",
          "40% of SA + Bonuses at maturity",
          "Full SA on death (irrespective of SBs)",
          "Tax benefits under Section 80C"
        ],
        eligibility: [
          "Age: 13-45 years",
          "Policy Term: 20 years (fixed)",
          "Sum Assured: ₹1 Lakh minimum",
          "Premium: Regular yearly/half-yearly/quarterly/monthly"
        ]
      },
      {
        name: "LIC New Money Back 25 Years",
        planNumber: "921",
        description: "Long-term money back plan with survival benefits every 5 years.",
        minAge: 13,
        maxAge: 40,
        minTerm: 25,
        maxTerm: 25,
        minSumAssured: 100000,
        features: [
          "Survival benefits at 5 year intervals",
          "Bonus additions",
          "Loan after 3 years",
          "Premium waiver rider available",
          "Accident benefit rider"
        ],
        benefits: [
          "15% at 5th, 10th, 15th, 20th year",
          "40% + Bonuses at maturity",
          "Full SA payable on death",
          "Tax free maturity"
        ],
        eligibility: [
          "Age: 13-40 years at entry",
          "Max age at maturity: 65 years",
          "Policy Term: 25 years",
          "Sum Assured: ₹1 Lakh minimum"
        ]
      },
      {
        name: "LIC Bima Shree",
        planNumber: "948",
        description: "Non-linked participating endowment with guaranteed additions and survival benefits.",
        minAge: 18,
        maxAge: 55,
        minTerm: 14,
        maxTerm: 20,
        minSumAssured: 1000000,
        features: [
          "High Sum Assured (₹10L+)",
          "Guaranteed additions",
          "Survival benefits",
          "Reversionary bonuses",
          "Premium waiver benefit"
        ],
        benefits: [
          "GA: ₹50/1000 SA yearly",
          "SB: 30% at specific intervals",
          "Maturity: Remaining SA + GA + Bonuses",
          "Death: SA + GA + Bonuses"
        ],
        eligibility: [
          "Age: 18-55 years",
          "Sum Assured: ₹10 Lakh minimum",
          "Policy Term: 14-20 years",
          "Premium Payment: Limited period"
        ]
      }
    ]
  },
  {
    id: "health",
    name: "Health Insurance Plans",
    tagline: "Medical Protection for You and Family",
    description: "Health plans provide financial protection against medical expenses and critical illness diagnosis.",
    icon: "Heart",
    heroImage: "/placeholder.svg",
    plans: [
      {
        name: "LIC Cancer Cover",
        planNumber: "905",
        description: "Fixed benefit health insurance for cancer protection.",
        minAge: 20,
        maxAge: 65,
        minTerm: 10,
        maxTerm: 30,
        minSumAssured: 1000000,
        features: [
          "Early and Major stage cancer cover",
          "Lump sum benefit on diagnosis",
          "Income benefit option",
          "Premium waiver on diagnosis",
          "No medical bills required"
        ],
        benefits: [
          "Early Stage: 25% of SA (lump sum)",
          "Major Stage: 100% of SA (lump sum)",
          "Income Benefit: 1% monthly for 10 years",
          "Premium waiver after diagnosis"
        ],
        eligibility: [
          "Age: 20-65 years at entry",
          "Max age at maturity: 75 years",
          "Sum Assured: ₹10 Lakh - ₹50 Lakh",
          "No survival period required"
        ]
      },
      {
        name: "LIC Arogya Rakshak",
        planNumber: "906",
        description: "Non-linked, non-participating health plan with fixed benefits.",
        minAge: 18,
        maxAge: 65,
        minTerm: 5,
        maxTerm: 30,
        minSumAssured: 500000,
        features: [
          "Fixed benefit health insurance",
          "No claim settlement hassles",
          "Pre and post hospitalization covered",
          "Day care procedures included",
          "Family floater option"
        ],
        benefits: [
          "Hospitalization: ₹4000-8000/day",
          "ICU: Double the daily benefit",
          "Major Surgery: Lump sum",
          "Pre/Post hospital: 30 days/60 days"
        ],
        eligibility: [
          "Age: 18-65 years",
          "Premium Payment: 5-30 years",
          "Coverage: Individual or Family Floater",
          "Medical screening required"
        ]
      },
      {
        name: "LIC Jeevan Arogya",
        planNumber: "903",
        description: "Comprehensive health insurance with hospitalization benefits.",
        minAge: 18,
        maxAge: 65,
        minTerm: 5,
        maxTerm: 40,
        minSumAssured: 100000,
        features: [
          "Non-linked health plan",
          "Fixed daily hospital cash",
          "Major surgical benefit",
          "Health checkup benefit",
          "No claim bonus"
        ],
        benefits: [
          "Hospital Cash: ₹1000-10000/day",
          "Major Surgical: Lump sum",
          "Daycare Procedures covered",
          "Premium waiver benefit"
        ],
        eligibility: [
          "Age: 18-65 years",
          "Policy Term: 5-40 years",
          "Individual and Family plans",
          "Waiting period: 90 days"
        ]
      }
    ]
  },
  {
    id: "ulip",
    name: "ULIP Plans",
    tagline: "Market-Linked Returns with Life Cover",
    description: "Unit Linked Insurance Plans combine insurance with investment, allowing you to grow your wealth while staying protected.",
    icon: "TrendingUp",
    heroImage: "/placeholder.svg",
    plans: [
      {
        name: "LIC Index Plus",
        planNumber: "Online",
        description: "ULIP linked to NIFTY 50 Index for passive investment returns.",
        minAge: 18,
        maxAge: 55,
        minTerm: 10,
        maxTerm: 25,
        minSumAssured: 0,
        features: [
          "NIFTY 50 Index linked",
          "Low fund management charges",
          "Monthly premium from ₹2,500",
          "Partial withdrawal allowed",
          "Fund switching option"
        ],
        benefits: [
          "Maturity: Fund Value",
          "Death: Higher of SA or Fund Value",
          "Tax benefits under 80C and 10(10D)",
          "Passive investment strategy"
        ],
        eligibility: [
          "Age: 18-55 years",
          "Policy Term: 10-25 years",
          "Premium: ₹2,500 minimum monthly",
          "Online purchase only"
        ]
      },
      {
        name: "LIC Nivesh Plus",
        planNumber: "849",
        description: "Single premium ULIP for wealth creation with life cover.",
        minAge: 18,
        maxAge: 55,
        minTerm: 10,
        maxTerm: 15,
        minSumAssured: 125000,
        features: [
          "Single premium plan",
          "Multiple fund options",
          "Free switches (4 per year)",
          "Partial withdrawal after 5 years",
          "Top-up facility"
        ],
        benefits: [
          "Maturity: Fund Value",
          "Death: SA + Fund Value",
          "Choice of funds: 8 options",
          "Systematic Transfer Plan"
        ],
        eligibility: [
          "Age: 18-55 years at entry",
          "Max age at maturity: 70 years",
          "Single Premium: ₹1 Lakh minimum",
          "Policy Term: 10 or 15 years"
        ]
      },
      {
        name: "LIC SIIP",
        planNumber: "952",
        description: "Systematic Investment Insurance Plan for regular investing.",
        minAge: 18,
        maxAge: 55,
        minTerm: 10,
        maxTerm: 25,
        minSumAssured: 0,
        features: [
          "Regular premium ULIP",
          "SIP-style investment",
          "Multiple fund options",
          "Partial withdrawal allowed",
          "Premium redirection option"
        ],
        benefits: [
          "Maturity: Fund Value",
          "Death: Higher of SA or Fund Value",
          "Rupee cost averaging benefit",
          "Flexible premium payment"
        ],
        eligibility: [
          "Age: 18-55 years",
          "Policy Term: 10-25 years",
          "Premium: ₹3,000/month minimum",
          "Premium Payment: Regular"
        ]
      }
    ]
  },
  {
    id: "wholelife",
    name: "Whole Life Plans",
    tagline: "Lifetime Protection and Legacy Planning",
    description: "Whole life plans provide coverage for your entire lifetime, ensuring your family's financial security and creating a lasting legacy.",
    icon: "Shield",
    heroImage: "/placeholder.svg",
    plans: [
      {
        name: "LIC Jeevan Umang",
        planNumber: "945",
        description: "Whole life plan with annual survival benefits throughout life.",
        minAge: 90,
        maxAge: 55,
        minTerm: 15,
        maxTerm: 100,
        minSumAssured: 200000,
        features: [
          "8% of SA payable annually after PPT",
          "Coverage till age 100",
          "Bonus additions",
          "Premium waiver option",
          "Rider benefits available"
        ],
        benefits: [
          "Survival Benefit: 8% of SA yearly",
          "Death: SA + Bonuses",
          "Maturity (age 100): SA + Bonuses",
          "Lifelong income stream"
        ],
        eligibility: [
          "Age: 90 days to 55 years",
          "Premium Payment: 15-25 years",
          "Coverage: Till age 100",
          "Sum Assured: ₹2 Lakh minimum"
        ]
      },
      {
        name: "LIC New Whole Life",
        planNumber: "Online",
        description: "Traditional whole life plan with lifelong protection.",
        minAge: 18,
        maxAge: 60,
        minTerm: 100,
        maxTerm: 100,
        minSumAssured: 500000,
        features: [
          "Protection till age 100",
          "Limited premium payment",
          "Bonus additions",
          "Loan facility",
          "Paid-up option"
        ],
        benefits: [
          "Death: SA + Bonuses anytime till 100",
          "Maturity at 100: SA + Bonuses",
          "Premium payment: Limited years",
          "Tax benefits applicable"
        ],
        eligibility: [
          "Age: 18-60 years at entry",
          "Coverage till age 100",
          "Premium Payment: 10-30 years",
          "Sum Assured: ₹5 Lakh minimum"
        ]
      },
      {
        name: "LIC Jeevan Azad",
        planNumber: "968",
        description: "Limited pay whole life plan with flexibility.",
        minAge: 18,
        maxAge: 50,
        minTerm: 100,
        maxTerm: 100,
        minSumAssured: 200000,
        features: [
          "Limited premium payment term",
          "Coverage till age 100",
          "Bonus additions",
          "Loan available",
          "Surrender value after 3 years"
        ],
        benefits: [
          "Death: SA + Vested Bonuses",
          "Maturity at 100: SA + Bonuses",
          "Paid-up value available",
          "Tax benefits under 80C"
        ],
        eligibility: [
          "Age: 18-50 years",
          "Premium Payment: 5-15 years",
          "Coverage: Whole life (till 100)",
          "Sum Assured: ₹2 Lakh minimum"
        ]
      }
    ]
  }
];

export const getPlanCategory = (id: string): PlanCategory | undefined => {
  return planCategories.find((cat) => cat.id === id);
};
