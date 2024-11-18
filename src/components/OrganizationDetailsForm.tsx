import Button from "./shared/Button";
type TProps = {
  hidden: boolean;
  goNext: () => void;
  goBack: () => void;
  organizationPhoneNumber: string;
  organizationName: string;
  organizationAddressStreet1: string;
  organizationAddressStreet2: string;
  organizationAddressCity: string;
  organizationAddressState: string;
  organizationAddressZip: string;
  setOrganizationPhoneNumber: (val: string) => void;
  setOrganizationName: (val: string) => void;
  setOrganizationAddressStreet1: (val: string) => void;
  setOrganizationAddressStreet2: (val: string) => void;
  setOrganizationAddressCity: (val: string) => void;
  setOrganizationAddressState: (val: string) => void;
  setOrganizationAddressZip: (val: string) => void;
};

export default function OrganizationDetailsForm({
  hidden,
  goNext,
  organizationAddressCity,
  organizationAddressState,
  organizationAddressStreet1,
  organizationAddressStreet2,
  organizationAddressZip,
  organizationName,
  organizationPhoneNumber,
  setOrganizationAddressCity,
  setOrganizationAddressState,
  setOrganizationAddressStreet1,
  setOrganizationAddressStreet2,
  setOrganizationAddressZip,
  setOrganizationName,
  setOrganizationPhoneNumber,
}: TProps) {
  return (
    <div hidden={hidden}>
      <h1 className="font-bold text-lg">
        We are going to need some details about you as an organization
      </h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="organizationName" className="flex flex-col">
          <span className="min-w-24 inline-block">Organization Name:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={organizationName}
            onChange={(e) => {
              setOrganizationName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="organizationPhoneNumber" className="flex flex-col">
          <span className="min-w-24 inline-block">Phone Number:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={organizationPhoneNumber}
            onChange={(e) => setOrganizationPhoneNumber(e.target.value)}
          />
        </label>
        <label htmlFor="organizationAddressStreet1" className="flex flex-col">
          <span className="min-w-24 inline-block">Street Address 1:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={organizationAddressStreet1}
            onChange={(e) => setOrganizationAddressStreet1(e.target.value)}
          />
        </label>
        <label htmlFor="organizationAddressStreet2" className="flex flex-col">
          <span className="min-w-24 inline-block">Street Address 2:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={organizationAddressStreet2}
            onChange={(e) => setOrganizationAddressStreet2(e.target.value)}
          />
        </label>
        <label htmlFor="organizationAddressCity" className="flex flex-col">
          <span className="min-w-24 inline-block">City:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={organizationAddressCity}
            onChange={(e) => setOrganizationAddressCity(e.target.value)}
          />
        </label>
        <label htmlFor="organizationAddressState" className="flex flex-col">
          <span className="min-w-24 inline-block">State:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={organizationAddressState}
            onChange={(e) => setOrganizationAddressState(e.target.value)}
          />
        </label>
        <label htmlFor="organizationAddressZip" className="flex flex-col">
          <span className="min-w-24 inline-block">Zip Code:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={organizationAddressZip}
            onChange={(e) => setOrganizationAddressZip(e.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-row gap-2 p-2">
        <Button onClick={goNext} text="Next" />
      </div>
    </div>
  );
}
