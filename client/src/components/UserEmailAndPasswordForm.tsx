import Button from "./shared/Button";

type TProps = {
  hidden: boolean;
  goBack: () => void;
  goNext: () => void;
  email: string;
  password: string;
  passwordConfirm: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirm: (passwordConfirm: string) => void;
};

export default function UserEmailAndPasswordForm({
  hidden,
  goBack,
  goNext,
  email,
  password,
  passwordConfirm,
  setEmail,
  setPassword,
  setPasswordConfirm,
}: TProps) {
  return (
    <div hidden={hidden}>
      <h1 className="font-bold text-lg">
        Please provide the Username and Password you want to register to your
        organization
      </h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="flex flex-col">
          <span className="min-w-24 inline-block">Email:</span>
          <input
            type="text"
            className="text-black p-1 m-1 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="flex flex-col">
          <span className="min-w-24 inline-block">Password:</span>
          <input
            type="password"
            className="text-black p-1 m-1 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="passwordConfirm" className="flex flex-col">
          <span className="min-w-24 inline-block">Confirm Password:</span>
          <input
            type="password"
            className="text-black p-1 m-1 rounded-lg"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-row gap-2 p-2">
        <Button onClick={goBack} text="Back" />
        <Button onClick={goNext} text="Next" />
      </div>
    </div>
  );
}
