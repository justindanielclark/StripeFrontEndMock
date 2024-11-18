async function createPendingAccount() {
  const resp = await fetch(""); //!
}

export default function CreateAccount() {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-lg font-bold border-b-4 p-4">
        You will need to create an account
      </h1>

      <form action="" method="">
        <div className="flex flex-row">
          <div className="flex flex-col basis-1/2 flex-1 border-white border-r border-solid">
            <div>
              <h2 className="text-lg font-bold bg-slate-800 p-2">
                Organization Details
              </h2>
              <Label>
                <LabelTitle>Name:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Phone Number:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
            </div>
            <div className="border-y border-solid border-white">
              <h2 className="text-lg font-bold bg-slate-800 p-2">
                Organization Address
              </h2>
              <Label>
                <LabelTitle>Address Street:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Address Street (Apt):</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Address City:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Address State:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Address Zip:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
            </div>
            <div className="border-y border-solid border-white">
              <div className="bg-slate-800 p-2 flex flex-row justify-between items-center">
                <h2 className="text-lg font-bold ">
                  Organization Billing Address
                </h2>
                <label className="flex flex-row w-min gap-2">
                  <span className="inline-block w-min whitespace-nowrap">
                    Same as Above?
                  </span>
                  <input type="checkbox" defaultChecked />
                </label>
              </div>

              <Label>
                <LabelTitle>Address Street:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Address Street (Apt):</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Address City:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Address State:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Address Zip:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
            </div>
          </div>
          <div className="flex flex-col basis-1/2 flex-1">
            <div>
              <h2 className="text-lg font-bold bg-slate-800 p-2">
                Master User Details
              </h2>
              <Label>
                <LabelTitle>First Name:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Last Name:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Phone Number:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Email:</LabelTitle>
                <input type="text" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Password:</LabelTitle>
                <input type="password" className="p-1 rounded-lg text-black" />
              </Label>
              <Label>
                <LabelTitle>Confirm Password:</LabelTitle>
                <input type="password" className="p-1 rounded-lg text-black" />
              </Label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

type TLabelProps = {
  children: React.ReactElement[] | React.ReactElement;
};
function Label({ children }: TLabelProps) {
  return <label className="flex flex-col gap-2 m-2">{children}</label>;
}
type TLabelTitleProps = {
  children: React.ReactElement | string;
};
function LabelTitle({ children }: TLabelTitleProps) {
  return <span>{children}</span>;
}
