/**
 * Envío de emails. Si RESEND_API_KEY está definida usa Resend; si no, solo log.
 */
export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[Email] (no API key) would send:", params);
    return { ok: true };
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "Hub MBA UC <onboarding@resend.dev>",
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    console.error("Send email error:", e);
    return { ok: false, error: String(e) };
  }
}

export async function sendBookingRequested(params: {
  expertEmail: string;
  expertName: string;
  requesterName: string;
  startAt: string;
  notes?: string;
}) {
  return sendEmail({
    to: params.expertEmail,
    subject: `Nueva solicitud de sesión - ${params.requesterName}`,
    html: `
      <p>Hola ${params.expertName},</p>
      <p>${params.requesterName} ha solicitado una sesión contigo.</p>
      <p><strong>Fecha/hora:</strong> ${new Date(params.startAt).toLocaleString("es-CL")}</p>
      ${params.notes ? `<p><strong>Objetivo:</strong> ${params.notes}</p>` : ""}
      <p>Entra al Hub para aceptar o rechazar.</p>
    `,
  });
}

export async function sendBookingAccepted(params: {
  requesterEmail: string;
  expertName: string;
  startAt: string;
  meetLink?: string;
}) {
  return sendEmail({
    to: params.requesterEmail,
    subject: `Sesión confirmada con ${params.expertName}`,
    html: `
      <p>Tu sesión con ${params.expertName} ha sido confirmada.</p>
      <p><strong>Fecha/hora:</strong> ${new Date(params.startAt).toLocaleString("es-CL")}</p>
      ${params.meetLink ? `<p><strong>Enlace:</strong> <a href="${params.meetLink}">${params.meetLink}</a></p>` : ""}
    `,
  });
}
