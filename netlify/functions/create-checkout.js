const https = require('https');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const apiKey = process.env.SUMUP_API_KEY;
  const merchantCode = process.env.SUMUP_MERCHANT_CODE;

  // Diagnostic direct dans le terminal
  console.log("--- DEBUG SUMUP ENV ---");
  console.log("SUMUP_API_KEY présente :", !!apiKey, apiKey ? `(Commence par ${apiKey.substring(0, 6)}...)` : "VIDE / UNDEFINED");
  console.log("SUMUP_MERCHANT_CODE :", merchantCode || "VIDE / UNDEFINED");
  console.log("------------------------");

  if (!apiKey || !merchantCode) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Variables SUMUP_API_KEY ou SUMUP_MERCHANT_CODE absentes ou non chargées par Netlify dev.' })
    };
  }

  try {
    const bodyData = JSON.parse(event.body || '{}');
    const amount = Number(bodyData.amount);
    const currency = bodyData.currency || 'EUR';
    const description = bodyData.description || 'Commande Speed Services';

    const payload = JSON.stringify({
      checkout_reference: `CMD-${Date.now()}`,
      amount: amount,
      currency: currency,
      merchant_code: merchantCode,
      description: description,
    });

    const sumupResponse = await new Promise((resolve, reject) => {
      const reqOptions = {
        hostname: 'api.sumup.com',
        path: '/v0.1/checkouts',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(reqOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body: data });
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.write(payload);
      req.end();
    });

    console.log("Réponse brute SumUp (Code", sumupResponse.statusCode, ") :", sumupResponse.body);

    let parsedData;
    try {
      parsedData = JSON.parse(sumupResponse.body);
    } catch (e) {
      parsedData = { raw: sumupResponse.body };
    }

    if (sumupResponse.statusCode !== 200 && sumupResponse.statusCode !== 201) {
      return {
        statusCode: sumupResponse.statusCode,
        body: JSON.stringify({ error: 'Erreur SumUp', details: parsedData })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(parsedData)
    };

  } catch (err) {
    console.error('Erreur interne function:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};