export interface LeadPayload {
  fullName: string;
  phone: string;
  email?: string;
  project: string;
  configuration?: string;
  budget?: string;
  callbackTime?: string;
  message?: string;
  source: string;
}

export interface LeadResult {
  ok: boolean;
  reference: string;
}

/**
 * Single seam for lead submission.
 *
 * No backend is configured for this build, so submissions resolve locally and the
 * consultant is reached through WhatsApp / call / email. When an endpoint exists,
 * replace the body of `submitLead` with the REST call — nothing else in the UI changes.
 * Never place API keys or secrets in this file; proxy them through a backend.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  console.info('[Chauhans Realtors] enquiry captured', payload);
  return { ok: true, reference: `CR-${Date.now().toString().slice(-6)}` };
}