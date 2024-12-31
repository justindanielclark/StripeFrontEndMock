import Button from "./shared/Button";

type TProps = {
  hidden: boolean;
  goBack: () => void;
  goNext: () => void;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  timeDisplayPreference: string;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setPhoneNumber: (val: string) => void;
  setTimeDisplayPreference: (val: string) => void;
};

export default function UserDetailsForm({
  hidden,
  goBack,
  goNext,
  firstName,
  lastName,
  phoneNumber,
  timeDisplayPreference,
  setFirstName,
  setLastName,
  setPhoneNumber,
  setTimeDisplayPreference,
}: TProps) {
  return (
    <div hidden={hidden}>
      <h1 className="font-bold text-lg">
        We need some personal details from you
      </h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="flex flex-col">
          <span className="min-w-24 inline-block">First Name:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="lastName" className="flex flex-col">
          <span className="min-w-24 inline-block">Last Name:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor="phoneNumber" className="flex flex-col">
          <span className="min-w-24 inline-block">Phone Number:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label htmlFor="timeDisplayPreference" className="flex flex-col">
          <span className="min-w-24 inline-block">
            Time Display Preference:
          </span>
          <select
            className="text-black p-1 m-1 rounded-lg"
            value={timeDisplayPreference}
            onChange={(e) => setTimeDisplayPreference(e.target.value)}
          >
            <option value="12-hour">12-hour</option>
            <option value="24-hour">24-hour</option>
          </select>
        </label>
      </div>
      <div className="flex flex-row gap-2 p-2">
        <Button onClick={goBack} text="Back" />
        <Button onClick={goNext} text="Next" />
      </div>
    </div>
  );
}
