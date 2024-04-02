import { createClient, Duration } from 'edgedb';

const client = createClient().withConfig({
  // IMPORTANT, transaction can't start with default Session to reproduce
  session_idle_transaction_timeout: Duration.from({ minutes: 5 }),
});
const noAPs = client.withConfig({
  apply_access_policies: false,
});

// one time setup
const user = await noAPs.queryRequiredSingle<{ id: string }>('select (select User limit 1) ?? (insert User)');

// Start transaction with apply_access_policies: default/true
await client.transaction(async tx => {
  // Change this next query to run session state of apply_access_policies: false
  // @ts-ignore simplified logical of what I'm doing
  tx._holder._options = noAPs.options;

  // Query should return user because APs are disabled,
  // but instead errors on "not found" due to AP.
  await tx.querySingle(`select <User><uuid>$id`, { id: user.id });
});
