/**
 * Verifica dominio Pinterest (<meta name="p:domain_verify"> nel layout).
 * Nessun cookie, nessuno script esterno e nessun banner: per regola permanente
 * dell'utente (22 nov 2026) su nightlifemilan.com sono vietati Pinterest Tag
 * e qualsiasi barra/banner cookie o consenso.
 */
export const PINTEREST_DOMAIN_VERIFY = (process.env.NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY || '').trim();
