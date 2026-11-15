
import https from 'https';
import dns from 'dns';
import { randomUUID } from 'crypto';

dns.setDefaultResultOrder('ipv4first');

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Méthode non autorisée' })
    };
  }

  const apiKey = process.env.SUMUP_API_KEY;
  const merchantCode = process.env.SUMUP_MERCHANT_CODE;
  const siteUrl = process.env.SITE_URL;

  if (!apiKey || !merchantCode) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Configuration SumUp manquante dans Netlify.'
      })
    };
  }

  try {
    const bodyData = JSON.parse(event.body || '{}');

    const amount = Number(bodyData.amount);
    const currency = bodyData.currency || 'EUR';

    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Montant invalide.' })
      };
    }

    if (currency !== 'EUR') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Devise non autorisée.' })
      };
    }

    const checkoutReference = `CMD-${randomUUID()}`;

    const payload = JSON.stringify({
      checkout_reference: checkoutReference,
      amount: Number(amount.toFixed(2)),
      currency: 'EUR',
      merchant_code: merchantCode,
      description: String(
        bodyData.description || 'Commande Speed Services'
      ).slice(0, 200),

      // Activation indispensable du paiement hébergé
      hosted_checkout: {
        enabled: true
      },

      // Retour sur le site après le paiement
      ...(siteUrl ? {
        redirect_url: `${siteUrl.replace(/\/$/, '')}/`
      } : {})
    });

    const sumupResponse = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.sumup.com',
        path: '/v0.1/checkouts',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        });
      });

      req.on('error', reject);
      req.setTimeout(20000, () => {
        req.destroy(new Error('Délai de connexion SumUp dépassé.'));
      });

      req.write(payload);
      req.end();
    });

    let parsedData;

    try {
      parsedData = JSON.parse(sumupResponse.body);
    } catch {
      throw new Error('Réponse SumUp invalide.');
    }

    if (sumupResponse.statusCode !== 201 &&
        sumupResponse.statusCode !== 200) {
      console.error('Erreur API SumUp:', parsedData);

      return {
        statusCode: 502,
        body: JSON.stringify({
          error: 'SumUp refuse la création du paiement.',
          details: parsedData
        })
      };
    }

    // On récupère uniquement la véritable URL hébergée par SumUp.
    const hostedUrl = parsedData.hosted_checkout_url;

    if (!hostedUrl || !hostedUrl.startsWith('https://checkout.sumup.com/')) {
      console.error('URL Hosted Checkout absente:', parsedData);

      return {
        statusCode: 502,
        body: JSON.stringify({
          error: 'SumUp n’a pas retourné de lien de paiement valide.'
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        url: hostedUrl,
        id: parsedData.id,
        reference: checkoutReference
      })
    };

  } catch (error) {
    console.error('Erreur création checkout:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Erreur interne du serveur.'
      })
    };
  }
}
