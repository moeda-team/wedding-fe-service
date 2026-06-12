export default async function InvitationPage({
  params,
}: PageProps<"/invitation/[id]">) {
  const { id } = await params;

  return (
    <div>
      <h1>Invitation Page</h1>
      <p>This is the invitation page for ID: {id}</p>
    </div>
  );
}
