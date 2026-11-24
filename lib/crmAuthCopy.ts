export interface CrmAuthCopy {
  metaTitle: string;
  metaDesc: string;
  recoverMetaTitle: string;
  credentialsMetaTitle: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  pillarContacts: string;
  pillarOrders: string;
  pillarSecurity: string;
  tabLogin: string;
  tabRecover: string;
  requiredLegend: string;
  requiredBadge: string;
  errorSummaryTitle: string;
  loginHeading: string;
  loginLead: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  usernameRequired: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  passwordRequired: string;
  showPassword: string;
  hidePassword: string;
  submitLogin: string;
  submittingLogin: string;
  invalidCredentials: string;
  configError: string;
  loggedOutBanner: string;
  passwordUpdatedBanner: string;
  forgotPrompt: string;
  forgotCta: string;
  recoverHeading: string;
  recoverLead: string;
  recoverEmailLabel: string;
  recoverEmailPlaceholder: string;
  recoverEmailInvalid: string;
  submitRecover: string;
  submittingRecover: string;
  recoverSentTitle: string;
  recoverSentBody: string;
  backToLogin: string;
  sessionFooterNote: string;
  backToPublicSite: string;
  recoverPageEyebrow: string;
  recoverPageHeading: string;
  recoverPageLead: string;
  unlockButton: string;
  unlockingButton: string;
  invalidTokenTitle: string;
  invalidTokenBody: string;
  usedTokenBody: string;
  requestNewLinkCta: string;
  foundBoxTitle: string;
  foundBoxSubtitle: string;
  activeUserLabel: string;
  activePasswordLabel: string;
  copyButton: string;
  copiedButton: string;
  openCrmNowCta: string;
  changePasswordSectionTitle: string;
  changePasswordSectionLead: string;
  currentPasswordLabel: string;
  currentPasswordRequired: string;
  currentPasswordWrong: string;
  newUsernameLabel: string;
  newUsernameInvalid: string;
  newPasswordLabel: string;
  newPasswordHint: string;
  newPasswordWeak: string;
  confirmPasswordLabel: string;
  confirmPasswordMismatch: string;
  saveCredentialsCta: string;
  savingCredentialsCta: string;
  credentialsSavedBanner: string;
  sourceVaultBadge: string;
  sourceDefaultBadge: string;
  headerCredentialsBtn: string;
  headerLogoutBtn: string;
  backToCrmBtn: string;
}

const IT_COPY: CrmAuthCopy = {
  metaTitle: 'Accesso CRM | Nightlife Milan',
  metaDesc: 'Console riservata per la gestione contatti, ordini e consensi di Nightlife Milan.',
  recoverMetaTitle: 'Recupero Credenziali CRM | Nightlife Milan',
  credentialsMetaTitle: 'Credenziali e Sicurezza CRM | Nightlife Milan',
  eyebrow: 'NIGHTLIFE MILAN · CONSOLE DIREZIONE',
  heroTitle: 'Clienti, ordini e consensi in un solo pannello.',
  heroSubtitle:
    'Accesso riservato alla direzione Nightlife Milan per consultare il registro contatti, verificare i consensi marketing, esportare le liste autorizzate e presidiare gli ordini e-commerce.',
  pillarContacts: 'Anagrafica clienti deduplicata',
  pillarOrders: 'Ordini, incassi e stato pass',
  pillarSecurity: 'Sessione cifrata e recupero protetto',
  tabLogin: 'Accedi al CRM',
  tabRecover: 'Trova credenziali',
  requiredLegend: 'I campi contrassegnati con Obbligatorio * sono necessari.',
  requiredBadge: 'Obbligatorio *',
  errorSummaryTitle: 'Controlla i campi evidenziati per continuare:',
  loginHeading: 'Accedi al CRM',
  loginLead: 'Inserisci utente e password amministrativi di Nightlife Milan.',
  usernameLabel: 'Utente amministratore',
  usernamePlaceholder: 'Inserisci il tuo nome utente o email',
  usernameRequired: 'Inserisci il nome utente amministratore.',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Inserisci la password del CRM',
  passwordRequired: 'Inserisci la password di accesso.',
  showPassword: 'Mostra password',
  hidePassword: 'Nascondi password',
  submitLogin: 'Entra nel CRM',
  submittingLogin: 'Verifica credenziali in corso...',
  invalidCredentials: 'Utente o password non corretti. Verifica i dati oppure usa la scheda Trova credenziali.',
  configError: 'La configurazione di sessione del CRM richiede verifica lato server.',
  loggedOutBanner: 'Hai chiuso correttamente la sessione del CRM.',
  passwordUpdatedBanner: 'Credenziali CRM aggiornate con successo.',
  forgotPrompt: 'Non ricordi utente o password del CRM?',
  forgotCta: 'Ritrova o reimposta le credenziali via email',
  recoverHeading: 'Ritrova le tue credenziali',
  recoverLead:
    'Inserisci una delle caselle email amministrative di Nightlife Milan. Riceverai un link monouso valido 15 minuti per visualizzare utente e password attivi oppure impostarne di nuovi.',
  recoverEmailLabel: 'Email amministratore',
  recoverEmailPlaceholder: 'es. concierge@nightlifemilan.com',
  recoverEmailInvalid: 'Inserisci un indirizzo email valido.',
  submitRecover: 'Invia link di recupero credenziali',
  submittingRecover: 'Invio richiesta in corso...',
  recoverSentTitle: 'Controlla la casella di posta',
  recoverSentBody:
    'Se l’indirizzo inserito appartiene agli amministratori autorizzati di Nightlife Milan, abbiamo appena inviato un’email con il link monouso (valido 15 minuti) per leggere le credenziali attive e accedere subito al CRM.',
  backToLogin: 'Torna al modulo di accesso',
  sessionFooterNote: 'Sessione riservata protetta con scadenza automatica dopo 8 ore.',
  backToPublicSite: 'Torna a nightlifemilan.com',
  recoverPageEyebrow: 'RECUPERO CREDENZIALI PROTETTO',
  recoverPageHeading: 'Sblocca e visualizza le credenziali CRM',
  recoverPageLead:
    'Conferma con il pulsante qui sotto per verificare il link monouso, aprire la sessione amministrativa e leggere utente e password attualmente attivi.',
  unlockButton: 'Verifica e mostra credenziali attive',
  unlockingButton: 'Sblocco credenziali in corso...',
  invalidTokenTitle: 'Link scaduto o non valido',
  invalidTokenBody:
    'Questo collegamento di sicurezza ha superato i 15 minuti di validità oppure non è completo. Richiedi un nuovo link dalla pagina di accesso.',
  usedTokenBody:
    'Questo collegamento monouso è già stato utilizzato. Per motivi di sicurezza ogni link mostra le credenziali una sola volta: richiedine uno nuovo in pochi secondi.',
  requestNewLinkCta: 'Richiedi un nuovo link di recupero',
  foundBoxTitle: 'Credenziali CRM attive ritrovate',
  foundBoxSubtitle:
    'La tua sessione amministrativa è già attiva. Puoi copiare i dati qui sotto per conservarli, entrare subito nel CRM oppure scegliere una nuova password.',
  activeUserLabel: 'Utente attivo',
  activePasswordLabel: 'Password attiva',
  copyButton: 'Copia',
  copiedButton: 'Copiato',
  openCrmNowCta: 'Entra subito nel CRM',
  changePasswordSectionTitle: 'Aggiorna utente o password CRM',
  changePasswordSectionLead:
    'Se preferisci impostare una nuova password più comoda da ricordare, compilala qui sotto. Tutte le sessioni precedenti verranno revocate subito.',
  currentPasswordLabel: 'Password attuale',
  currentPasswordRequired: 'Inserisci la password attuale.',
  currentPasswordWrong: 'La password attuale inserita non corrisponde a quella attiva.',
  newUsernameLabel: 'Utente CRM',
  newUsernameInvalid: 'Il nome utente deve contenere almeno 3 caratteri.',
  newPasswordLabel: 'Nuova password',
  newPasswordHint: 'Minimo 10 caratteri.',
  newPasswordWeak: 'La nuova password deve avere almeno 10 caratteri.',
  confirmPasswordLabel: 'Conferma nuova password',
  confirmPasswordMismatch: 'La conferma non coincide con la nuova password.',
  saveCredentialsCta: 'Salva nuove credenziali CRM',
  savingCredentialsCta: 'Salvataggio cifrato in corso...',
  credentialsSavedBanner: 'Nuove credenziali salvate e attive. Le sessioni precedenti sono state invalidate.',
  sourceVaultBadge: 'Custodia cifrata personalizzata attiva',
  sourceDefaultBadge: 'Credenziali amministrative predefinite attive',
  headerCredentialsBtn: 'Credenziali e sicurezza',
  headerLogoutBtn: 'Esci',
  backToCrmBtn: 'Torna al CRM clienti',
};

const EN_COPY: CrmAuthCopy = {
  metaTitle: 'CRM Sign In | Nightlife Milan',
  metaDesc: 'Private management console for Nightlife Milan contacts, orders and marketing permissions.',
  recoverMetaTitle: 'CRM Credential Recovery | Nightlife Milan',
  credentialsMetaTitle: 'CRM Credentials & Security | Nightlife Milan',
  eyebrow: 'NIGHTLIFE MILAN · MANAGEMENT CONSOLE',
  heroTitle: 'Guests, orders and permissions in one place.',
  heroSubtitle:
    'Restricted access for Nightlife Milan management to inspect deduplicated guest records, verify marketing consent, export authorized lists and monitor e-commerce orders.',
  pillarContacts: 'Deduplicated guest directory',
  pillarOrders: 'Orders, revenue and pass status',
  pillarSecurity: 'Signed session and protected recovery',
  tabLogin: 'Sign in',
  tabRecover: 'Find credentials',
  requiredLegend: 'Fields marked Required * must be completed.',
  requiredBadge: 'Required *',
  errorSummaryTitle: 'Review the highlighted fields to continue:',
  loginHeading: 'Sign in to CRM',
  loginLead: 'Enter your Nightlife Milan administrative username and password.',
  usernameLabel: 'Admin username',
  usernamePlaceholder: 'Enter your username or email',
  usernameRequired: 'Enter your administrative username.',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your CRM password',
  passwordRequired: 'Enter your password.',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  submitLogin: 'Open CRM',
  submittingLogin: 'Verifying credentials...',
  invalidCredentials: 'Incorrect username or password. Double-check your details or open the Find credentials tab.',
  configError: 'CRM session configuration requires server-side verification.',
  loggedOutBanner: 'You have signed out of the CRM.',
  passwordUpdatedBanner: 'CRM credentials updated.',
  forgotPrompt: 'Lost your CRM username or password?',
  forgotCta: 'Find or reset your credentials by email',
  recoverHeading: 'Find your CRM credentials',
  recoverLead:
    'Enter an authorized Nightlife Milan admin email address. We will send a one-time link valid for 15 minutes so you can view your active username and password or set new ones.',
  recoverEmailLabel: 'Admin email',
  recoverEmailPlaceholder: 'e.g. concierge@nightlifemilan.com',
  recoverEmailInvalid: 'Enter a valid email address.',
  submitRecover: 'Send credential recovery link',
  submittingRecover: 'Sending recovery link...',
  recoverSentTitle: 'Check your inbox',
  recoverSentBody:
    'If that address belongs to an authorized Nightlife Milan administrator, we just sent an email with a 15-minute one-time link to view your active credentials and sign in right away.',
  backToLogin: 'Back to sign in',
  sessionFooterNote: 'Protected private session with automatic 8-hour expiration.',
  backToPublicSite: 'Back to nightlifemilan.com',
  recoverPageEyebrow: 'PROTECTED CREDENTIAL RECOVERY',
  recoverPageHeading: 'Unlock and view active CRM credentials',
  recoverPageLead:
    'Confirm below to validate your one-time link, start an authenticated admin session and reveal your current CRM username and password.',
  unlockButton: 'Verify and reveal active credentials',
  unlockingButton: 'Unlocking credentials...',
  invalidTokenTitle: 'Expired or invalid link',
  invalidTokenBody:
    'This security link has passed its 15-minute window or is incomplete. Request a fresh link from the sign-in page.',
  usedTokenBody:
    'This one-time link has already been used. Each recovery link reveals credentials once; request a fresh link in seconds.',
  requestNewLinkCta: 'Request a new recovery link',
  foundBoxTitle: 'Active CRM credentials',
  foundBoxSubtitle:
    'Your admin session is now active. Copy your credentials below, jump straight into the CRM or set a new password.',
  activeUserLabel: 'Active username',
  activePasswordLabel: 'Active password',
  copyButton: 'Copy',
  copiedButton: 'Copied',
  openCrmNowCta: 'Enter CRM now',
  changePasswordSectionTitle: 'Update CRM username or password',
  changePasswordSectionLead:
    'Want to switch to a password that is easier to keep track of? Set it below. Earlier sessions are invalidated right away.',
  currentPasswordLabel: 'Current password',
  currentPasswordRequired: 'Enter your current password.',
  currentPasswordWrong: 'The current password does not match the active one.',
  newUsernameLabel: 'CRM username',
  newUsernameInvalid: 'Username must be at least 3 characters long.',
  newPasswordLabel: 'New password',
  newPasswordHint: 'Minimum 10 characters.',
  newPasswordWeak: 'New password must be at least 10 characters long.',
  confirmPasswordLabel: 'Confirm new password',
  confirmPasswordMismatch: 'Confirmation does not match the new password.',
  saveCredentialsCta: 'Save new CRM credentials',
  savingCredentialsCta: 'Saving encrypted credentials...',
  credentialsSavedBanner: 'New credentials saved and active. Previous sessions have been revoked.',
  sourceVaultBadge: 'Custom encrypted vault active',
  sourceDefaultBadge: 'Default administrative credentials active',
  headerCredentialsBtn: 'Credentials & security',
  headerLogoutBtn: 'Sign out',
  backToCrmBtn: 'Back to guest CRM',
};

export function getCrmAuthCopy(locale: string | null | undefined): CrmAuthCopy {
  const clean = (locale || '').trim().toLowerCase();
  if (clean === 'it') return IT_COPY;
  return EN_COPY;
}

export function buildCrmRecoveryEmailMessage(params: {
  to: string;
  locale: string;
  recoveryUrl: string;
  expiresMinutes: number;
}): { subject: string; html: string; text: string } {
  const isIt = (params.locale || '').toLowerCase() === 'it';
  const subject = isIt
    ? 'Recupero credenziali CRM Nightlife Milan (valido 15 minuti)'
    : 'Nightlife Milan CRM credential recovery (valid 15 minutes)';

  const text = isIt
    ? [
        'Richiesta di recupero credenziali CRM Nightlife Milan',
        '',
        `Apri questo collegamento monouso entro ${params.expiresMinutes} minuti per visualizzare utente e password attivi del CRM oppure impostare una nuova password:`,
        params.recoveryUrl,
        '',
        'Per la tua sicurezza le credenziali non viaggiano in chiaro via email ma vengono mostrate solo sulla pagina protetta dopo la tua conferma.',
        'Se non hai richiesto tu questo messaggio puoi ignorarlo.',
      ].join('\n')
    : [
        'Nightlife Milan CRM credential recovery request',
        '',
        `Open this one-time link within ${params.expiresMinutes} minutes to view your active CRM username and password or set a new password:`,
        params.recoveryUrl,
        '',
        'For security, credentials are never sent in plain text inside an email and are only shown on the protected page after your confirmation.',
        'If you did not request this email, you can safely ignore it.',
      ].join('\n');

  const html = `<!doctype html>
<html lang="${isIt ? 'it' : 'en'}">
  <body style="margin:0;padding:28px 16px;background:#0A0A0C;color:#F6F1E7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;color:#0A0A0C;border:1px solid #0A0A0C;">
      <tr>
        <td style="padding:28px 28px 12px 28px;border-bottom:1px solid #E5E2DC;">
          <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#0A0A0C;">NIGHTLIFE MILAN · CRM</p>
          <h1 style="margin:10px 0 0 0;font-size:24px;line-height:1.25;color:#0A0A0C;">
            ${isIt ? 'Ritrova o aggiorna le credenziali CRM' : 'View or update your CRM credentials'}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#1F2024;">
            ${
              isIt
                ? `Hai richiesto di ritrovare le credenziali di accesso al CRM di Nightlife Milan. Clicca il pulsante qui sotto entro ${params.expiresMinutes} minuti per aprire il pannello protetto, leggere utente e password attivi o scegliere una nuova password.`
                : `You requested access to your Nightlife Milan CRM credentials. Use the button below within ${params.expiresMinutes} minutes to open the protected recovery view, reveal your active username and password, or set a new password.`
            }
          </p>
          <p style="margin:24px 0;">
            <a href="${params.recoveryUrl}" style="display:inline-block;padding:14px 24px;background:#D9381E;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:700;">
              ${isIt ? 'Apri recupero credenziali CRM' : 'Open CRM credential recovery'}
            </a>
          </p>
          <p style="margin:18px 0 0 0;font-size:13px;line-height:1.55;color:#4B4D55;word-break:break-all;">
            ${isIt ? 'Link diretto:' : 'Direct link:'} <a href="${params.recoveryUrl}" style="color:#0A0A0C;">${params.recoveryUrl}</a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background:#EDEBE6;font-size:12px;line-height:1.5;color:#3A3C42;">
          ${
            isIt
              ? 'Collegamento monouso valido 15 minuti. Se non hai inviato tu la richiesta, ignora questo messaggio.'
              : 'One-time link valid for 15 minutes. If you did not request this, ignore this message.'
          }
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}
