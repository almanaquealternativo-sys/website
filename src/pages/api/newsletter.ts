import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

type BeehiivRuntimeEnv = {
  BEEHIIV_API_KEY?: string;
  BEEHIIV_PUBLICATION_ID?: string;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const POST: APIRoute = async ({ request }) => {
  let payload: { email?: unknown };

  try {
    payload = await request.json();
  } catch {
    return json({ message: 'Envie um email válido para entrar na lista.' }, 400);
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';

  if (!isValidEmail(email)) {
    return json({ message: 'Envie um email válido para entrar na lista.' }, 400);
  }

  const { BEEHIIV_API_KEY, BEEHIIV_PUBLICATION_ID } = env as BeehiivRuntimeEnv;

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    return json({ message: 'Newsletter ainda não configurada.' }, 500);
  }

  const beehiivResponse = await fetch(
    `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'almanaque-alternativo',
        utm_medium: 'site',
        utm_campaign: 'newsletter-form',
      }),
    },
  );

  if (!beehiivResponse.ok) {
    return json({ message: 'Não foi possível concluir a inscrição agora.' }, beehiivResponse.status);
  }

  return json({ message: 'Inscrição realizada. Verifique seu email.' }, 201);
};
