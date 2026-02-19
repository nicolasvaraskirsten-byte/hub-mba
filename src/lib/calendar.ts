/**
 * Integración con Google Calendar. MVP: placeholder para Meet link.
 * En producción se puede usar Google Calendar API con tokens del experto.
 */
export function getPlaceholderMeetLink(): string {
  return "https://meet.google.com/new";
}

export async function createCalendarEvent(params: {
  expertUserId: string;
  startAt: string;
  endAt: string;
  summary: string;
  description?: string;
}): Promise<{ meetLink?: string; error?: string }> {
  // TODO: usar Google Calendar API con refresh token del experto (params.expertUserId)
  void params;
  return { meetLink: getPlaceholderMeetLink() };
}
