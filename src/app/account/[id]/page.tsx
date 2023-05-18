const AccountDetails = ({ params }: { params: { id: string } }) => {
  console.log("THE ID IS", params.id);
  return <div>Hello from account details</div>;
};

export default AccountDetails;
