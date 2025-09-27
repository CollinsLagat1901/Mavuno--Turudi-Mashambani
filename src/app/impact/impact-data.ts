
export const impactData = {
  "title": "Mavuno AI: National Economic & Social Impact Projection",
  "tiles": [
    {
      "id": "per-farm-uplift",
      "label": "Annual Profit Uplift Per Farm",
      "valueFormatted": "KES 9,062",
      "valueNumber": 9061.58,
      "unit": "KES",
      "shortDescription": "Additional profit for an average farm (0.86 ha) adopting Mavuno AI, based on a conservative 25% profit increase.",
      "formula": "Avg. Profit × 25% Uplift"
    },
    {
      "id": "pilot-uplift",
      "label": "Pilot Phase Aggregated Uplift",
      "valueFormatted": "KES 4.05B",
      "valueNumber": 4050169451,
      "unit": "KES",
      "shortDescription": "Total annual economic uplift generated for farmers in the pilot phase, assuming 10% national adoption.",
      "formula": "Uplift per Farm × 446,949 Farms"
    },
    {
      "id": "scale-uplift",
      "label": "Scaled Phase Aggregated Uplift",
      "valueFormatted": "KES 10.13B",
      "valueNumber": 10125488143,
      "unit": "KES",
      "shortDescription": "Total annual economic uplift at a 25% national adoption rate, demonstrating significant GDP contribution.",
      "formula": "Uplift per Farm × 1.12M Farms"
    },
    {
      "id": "gov-revenue",
      "label": "Potential Annual Gov't Revenue",
      "valueFormatted": "KES 203M - 506M",
      "valueNumber": 202508473,
      "unit": "KES",
      "shortDescription": "Estimated annual tax revenue from the economic uplift at a 5% capture rate, scaling with adoption.",
      "formula": "Total Uplift × 5% Capture Rate"
    }
  ],
  "charts": [
    {
      "id": "farmer-profit-chart",
      "type": "bar",
      "title": "AI-Driven Increase in Average Farmer Profit",
      "description": "This chart illustrates the projected increase in annual variable profit for an average Kenyan smallholder farm after adopting Mavuno AI.",
      "altText": "Bar chart showing baseline farmer profit at KES 36,246 and post-Entity-AI profit at KES 45,308.",
      "labels": ["Baseline Annual Profit", "Post-Mavuno AI Profit"],
      "datasets": [
        {
          "label": "KES per Farm",
          "data": [36246.32, 45307.90],
          "backgroundColor": ["#666666", "#006400"]
        }
      ]
    },
    {
      "id": "uplift-scenario-chart",
      "type": "stackedBar",
      "title": "National Economic Uplift by Adoption Scenario",
      "description": "This chart shows the total potential economic value created for farmers under two different national adoption scenarios for Mavuno AI.",
      "altText": "Stacked bar chart comparing the total economic uplift for a 10% pilot adoption (KES 4.05B) and a 25% scaled adoption (KES 10.13B).",
      "labels": ["Pilot (10% Adoption)", "Scale (25% Adoption)"],
      "datasets": [
         {
          "label": "Economic Uplift (KES Billions)",
          "data": [4.05, 10.13],
          "backgroundColor": "#FFD700"
        }
      ]
    }
  ],
  "paragraph": "Adopting Mavuno AI directly translates to measurable economic growth. By providing data-driven insights to smallholder farmers, our platform is projected to generate between KES 4.05 billion and KES 10.13 billion in new economic value annually, uplifting rural households and contributing significantly to the national GDP through increased agricultural productivity and efficiency.",
  "assumptionsHtml": `
    <div class='space-y-6 text-sm'>
        <h4 class='text-lg font-semibold'>Core Assumptions &amp; Calculation Methodology</h4>
        
        <div class='p-4 border rounded-lg'>
            <h5 class='font-semibold'>1. Baseline Farmer Profit Calculation</h5>
            <p>We use maize variable profit as a conservative proxy for all staple crops.</p>
            <ul class='list-disc pl-5 mt-2 space-y-1 mono-font'>
                <li><strong>Profit per Hectare (USD):</strong> $326.72 (Source: Tegemeo Institute)</li>
                <li><strong>KES/USD Exchange Rate:</strong> 129 (Source: CBK)</li>
                <li><strong>Calculation:</strong> $326.72 × 129 = <strong>KES 42,146.88 per hectare</strong></li>
                <li><strong>Average Farm Size:</strong> 0.86 ha (Source: FAO)</li>
                <li><strong>Baseline Profit per Farm:</strong> KES 42,146.88 × 0.86 = <strong>KES 36,246.32</strong></li>
            </ul>
        </div>

        <div class='p-4 border rounded-lg'>
            <h5 class='font-semibold'>2. AI-Driven Uplift Calculation</h5>
            <p>A conservative 25% profit uplift is assumed, based on documented gains from precision agriculture technologies which often range from 15% to over 60%.</p>
            <ul class='list-disc pl-5 mt-2 space-y-1 mono-font'>
                <li><strong>Uplift Rate:</strong> 25%</li>
                <li><strong>Uplift per Farm (KES):</strong> 0.25 × KES 36,246.32 = <strong>KES 9,061.58</strong></li>
                <li><strong>New Profit per Farm (KES):</strong> KES 36,246.32 + KES 9,061.58 = <strong>KES 45,307.90</strong></li>
            </ul>
        </div>
        
        <div class='p-4 border rounded-lg'>
            <h5 class='font-semibold'>3. Aggregated National Impact</h5>
            <p>Calculations are based on the national number of smallholder farms.</p>
            <ul class='list-disc pl-5 mt-2 space-y-1 mono-font'>
                <li><strong>Total Smallholder Farms:</strong> 4,469,494 (Source: Kenya National Bureau of Statistics)</li>
                <li><strong>Pilot Adoption (10%):</strong> 0.10 × 4,469,494 = 446,949 farms</li>
                <li><strong>Pilot Total Uplift:</strong> 446,949 × KES 9,061.58 = <strong>KES 4,050,169,451</strong></li>
                <li><strong>Scale Adoption (25%):</strong> 0.25 × 4,469,494 = 1,117,374 farms</li>
                <li><strong>Scale Total Uplift:</strong> 1,117,374 × KES 9,061.58 = <strong>KES 10,125,488,143</strong></li>
            </ul>
        </div>

        <div class='p-4 border rounded-lg'>
            <h5 class='font-semibold'>4. Government Revenue Projection</h5>
            <p>Based on a 5% capture rate (e.g., taxes, levies) of the generated economic uplift.</p>
            <ul class='list-disc pl-5 mt-2 space-y-1 mono-font'>
                <li><strong>Pilot Revenue:</strong> 0.05 × KES 4.05B = <strong>KES 202.5M</strong></li>
                <li><strong>Scale Revenue:</strong> 0.05 × KES 10.13B = <strong>KES 506.3M</strong></li>
            </ul>
        </div>

        <div class='p-4 border rounded-lg'>
            <h5 class='font-semibold'>5. Job Creation Estimate</h5>
            <p>Jobs are created in technology, field support, and logistics.</p>
            <ul class='list-disc pl-5 mt-2 space-y-1 mono-font'>
                <li><strong>Assumption:</strong> 5 support + 15 tech + ~10 logistics jobs per 100k active farmers.</li>
                <li><strong>Pilot (447k farmers):</strong> ~134 new jobs</li>
                <li><strong>Scale (1.12M farmers):</strong> ~336 new jobs</li>
            </ul>
        </div>
    </div>
  `,
  "citations": [
    { "id": "oaicite:19", "text": "KNBS, Quarterly Gross Domestic Product Report Q1 2025", "shortUrl": "knbs.or.ke" },
    { "id": "oaicite:20", "text": "FAO, Smallholder farm size in Kenya", "shortUrl": "fao.org" },
    { "id": "oaicite:21", "text": "Tegemeo Institute, Maize Production Cost-Benefit Analysis", "shortUrl": "tegemeo.org" },
    { "id": "oaicite:22", "text": "World Bank, Kenya Labor Force Statistics", "shortUrl": "worldbank.org" },
    { "id": "oaicite:23", "text": "Central Bank of Kenya, Official Exchange Rates", "shortUrl": "centralbank.go.ke" }
  ],
  "csvData": "Metric,Category,Formula,ValueNumber,ValueFormatted,Unit,Notes,Citation\\nBaseline Profit per Ha,Baseline,\"$326.72 * 129\",42146.88,KES 42,147,KES,Proxy for staple crops,oaicite:21; oaicite:23\\nBaseline Profit per Farm,Baseline,\"42146.88 * 0.86\",36246.32,KES 36,246,KES,\"Avg farm size 0.86 ha\",oaicite:20\\nAI Uplift per Farm,Impact,\"36246.32 * 0.25\",9061.58,KES 9,062,KES,25% conservative uplift assumption,Internal\\nPilot - Adopted Farms,Scenario,\"4,469,494 * 0.10\",446949,446,949,Farms,10% adoption rate,Internal\\nPilot - Total Uplift,Impact,\"9061.58 * 446949\",4050169451,KES 4.05B,KES,,\\nPilot - Gov't Revenue,Impact,\"4050169451 * 0.05\",202508473,KES 203M,KES,5% capture rate assumption,Internal\\nScale - Adopted Farms,Scenario,\"4,469,494 * 0.25\",1117374,1,117,374,Farms,25% adoption rate,Internal\\nScale - Total Uplift,Impact,\"9061.58 * 1117374\",10125488143,KES 10.13B,KES,,\\nScale - Gov't Revenue,Impact,\"10125488143 * 0.05\",506274407,KES 506M,KES,5% capture rate assumption,Internal",
  "speakerNotes": "Mavuno AI is not just a tool; it's an economic engine. By empowering our farmers with data, we project a direct contribution of over KES 10 billion to our agricultural economy at scale and create hundreds of new-collar jobs in tech and logistics.",
  "meta": {
    "locale": "en-KE",
    "currency": "KES",
    "numberFormat": "#,##0",
    "generatedAt": new Date().toISOString()
  }
};
