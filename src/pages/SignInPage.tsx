import backgroundImage from "../assets/signIn-img.svg";
import AuthForm from "../components/authForm";

const SignInPage = () => {
  return (
    <div className="flex h-screen  flex-col md:flex-row">
      {/* Left Column (Form) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col w-full max-w-md">
          <div className="font-bold text-[28px] text-center md:text-left">
            Welcome back!
          </div>
          <div className="font-normal text-[14px] mt-2 text-center md:text-left text-gray-600">
            Enter your credentials to access your account
          </div>

          {/* Auth Form */}
          <div className="mt-9">
            <AuthForm isSignUp={false} />
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2">
        <img
          src={backgroundImage}
          alt="Sign In"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;
