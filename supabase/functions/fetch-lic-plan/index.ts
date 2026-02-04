const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Known LIC plan data mapping
const knownPlans: Record<string, any> = {
  "954": {
    name: "LIC Tech Term",
    category_id: "term",
    description: "Online term assurance plan with affordable premiums and high sum assured options.",
    min_age: 18,
    max_age: 65,
    min_term: 10,
    max_term: 40,
    min_sum_assured: 5000000,
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
  "955": {
    name: "LIC Jeevan Amar",
    category_id: "term",
    description: "Non-linked, non-participating pure term insurance plan providing financial protection.",
    min_age: 18,
    max_age: 65,
    min_term: 10,
    max_term: 40,
    min_sum_assured: 2500000,
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
  "915": {
    name: "LIC New Jeevan Anand",
    category_id: "endowment",
    description: "Popular participating endowment plan with whole life risk cover component.",
    min_age: 18,
    max_age: 50,
    min_term: 15,
    max_term: 35,
    min_sum_assured: 100000,
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
  "945": {
    name: "LIC Jeevan Umang",
    category_id: "wholelife",
    description: "Whole life plan with annual survival benefits throughout life.",
    min_age: 0,
    max_age: 55,
    min_term: 15,
    max_term: 100,
    min_sum_assured: 200000,
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
  "974": {
    name: "LIC Amritbaal",
    category_id: "children",
    description: "Non-linked, participating child plan for securing your child's future milestones.",
    min_age: 0,
    max_age: 17,
    min_term: 18,
    max_term: 25,
    min_sum_assured: 100000,
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
  "958": {
    name: "LIC New Jeevan Shanti",
    category_id: "pension",
    description: "Single premium deferred annuity plan with guaranteed returns.",
    min_age: 30,
    max_age: 79,
    min_term: 1,
    max_term: 12,
    min_sum_assured: 150000,
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
  "905": {
    name: "LIC Cancer Cover",
    category_id: "health",
    description: "Fixed benefit health insurance for cancer protection.",
    min_age: 20,
    max_age: 65,
    min_term: 10,
    max_term: 30,
    min_sum_assured: 1000000,
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
  "920": {
    name: "LIC New Money Back 20 Years",
    category_id: "moneyback",
    description: "Participating money back plan with survival benefits every 5 years.",
    min_age: 13,
    max_age: 45,
    min_term: 20,
    max_term: 20,
    min_sum_assured: 100000,
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
  "849": {
    name: "LIC Nivesh Plus",
    category_id: "ulip",
    description: "Single premium ULIP for wealth creation with life cover.",
    min_age: 18,
    max_age: 55,
    min_term: 10,
    max_term: 15,
    min_sum_assured: 125000,
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
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planNumber } = await req.json();

    if (!planNumber) {
      return new Response(
        JSON.stringify({ success: false, error: 'Plan number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching plan:', planNumber);

    // Check if we have the plan in our known database
    const planData = knownPlans[planNumber];

    if (planData) {
      return new Response(
        JSON.stringify({
          success: true,
          plan: {
            plan_number: planNumber,
            ...planData
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If not found in local data, try to use AI to generate plan details
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (apiKey) {
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: `You are an expert on LIC (Life Insurance Corporation of India) insurance products. 
              Given a plan number, provide accurate details about that LIC plan.
              Return a JSON object with these fields:
              - name: Full plan name (e.g., "LIC Jeevan Lakshya")
              - category_id: One of: term, endowment, children, pension, moneyback, health, ulip, wholelife
              - description: Brief description of the plan
              - min_age: Minimum entry age
              - max_age: Maximum entry age
              - min_term: Minimum policy term
              - max_term: Maximum policy term
              - min_sum_assured: Minimum sum assured in rupees
              - features: Array of key features
              - benefits: Array of benefits
              - eligibility: Array of eligibility criteria
              
              If the plan number doesn't correspond to a known LIC plan, return null.
              Only return the JSON object, no other text.`
            },
            {
              role: 'user',
              content: `Provide details for LIC plan number ${planNumber}`
            }
          ],
          temperature: 0.2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (content && content !== 'null') {
          try {
            // Try to parse the JSON response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const planDetails = JSON.parse(jsonMatch[0]);
              return new Response(
                JSON.stringify({
                  success: true,
                  plan: {
                    plan_number: planNumber,
                    ...planDetails
                  }
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              );
            }
          } catch (parseError) {
            console.error('Error parsing AI response:', parseError);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: `Plan number ${planNumber} not found. Please check the plan number or add details manually.`
      }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching plan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
