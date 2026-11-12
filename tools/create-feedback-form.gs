/**
 * Creates the "Stompers 2017 Girls Black: Playbook Feedback" Google Form and its responses Sheet.
 *
 * How to run (one time, ~2 minutes):
 *   1. Go to https://script.google.com and click "New project".
 *   2. Delete the sample code, paste this whole file, and click Save.
 *   3. Pick "createStompersFeedbackForm" in the function menu and click Run.
 *   4. Approve the permissions prompt. It only touches Forms and Sheets in your own account.
 *   5. Open "Execution log" and copy the lines that start with ">>" back to Claude.
 */
function createStompersFeedbackForm() {
  const CALLS = [
    'General / whole playbook',
    'Idea for a new call',
    'SHAPE!', 'PRESS!', 'SET THE TRAP!', 'WINGS OUT!', 'OVER THE TOP!',
    'CRASH THE BOX!', 'LOCK THE BOX!', 'TAP & BLAST!', 'WALL UP!'
  ];

  const form = FormApp.create('Stompers 2017 Girls Black: Playbook Feedback');
  form.setDescription("Help us make the playbook better! Takes 30 seconds. Please don't include any player's full name.");
  form.setConfirmationMessage('Thanks! Go Stompers! 🖤💚');
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(true);

  // No email collection, no sign-in. Wrapped in try blocks because some settings only exist on certain account types.
  try { form.setEmailCollectionType(FormApp.EmailCollectionType.DO_NOT_COLLECT); } catch (e) { try { form.setCollectEmail(false); } catch (e2) {} }
  try { form.setRequireLogin(false); } catch (e) {}

  const qCall = form.addListItem()
    .setTitle('Which call?')
    .setChoiceValues(CALLS)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Was it easy to understand?')
    .setChoiceValues(['Easy', 'OK', 'Confusing']);

  form.addParagraphTextItem()
    .setTitle("What's confusing, wrong, or missing? Any ideas?");

  const qWho = form.addMultipleChoiceItem()
    .setTitle('I am a…')
    .setChoiceValues(['Parent', 'Coach', 'Player', 'Other']);

  form.addTextItem()
    .setTitle('Your name')
    .setHelpText("Optional, first name is fine. If we use your idea, we'll credit you!");

  const sheet = SpreadsheetApp.create('Stompers Playbook Feedback (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // Newer Google Forms need to be published before they accept responses.
  try { form.setPublished(true); } catch (e) {}
  try { form.setAcceptingResponses(true); } catch (e) {}

  const prefill = form.createResponse()
    .withItemResponse(qCall.createResponse('PRESS!'))
    .withItemResponse(qWho.createResponse('Parent'))
    .toPrefilledUrl();

  Logger.log('>> RESPONDER_URL ' + form.getPublishedUrl());
  Logger.log('>> EDIT_URL ' + form.getEditUrl());
  Logger.log('>> SHEET_URL ' + sheet.getUrl());
  Logger.log('>> PREFILL_EXAMPLE ' + prefill);
  try { Logger.log('>> PUBLISHED ' + form.isPublished()); } catch (e) {}
}
