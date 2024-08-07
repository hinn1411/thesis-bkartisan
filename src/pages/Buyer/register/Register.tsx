import { FC, memo } from 'react';
import sideImage from '@images/register/image.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerSchema } from './registerSchema';
import { useRegister } from './hooks/useRegister';
import Spinner from '@components/common/ui/Spinner';
import TextInput from '@components/common/input/TextInput';
import ErrorText from '@components/common/message/ErrorText';
import SuccessText from '@components/common/message/SuccessText';

type Register = z.infer<typeof registerSchema>;

const Login: FC = memo(() => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });
  const {
    register: registerUser,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  } = useRegister();
  const handleRegister: SubmitHandler<Register> = (data) => {
    console.log(data);
    registerUser(data);
  };

  return (
    <div className="h-screen">
      {/* <!-- Global Container --> */}
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        {/* <!-- Card Container --> */}
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* <!-- Left Side --> */}
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="p-6 md:p-20 space-y-4"
          >
            {/* <!-- Top Content --> */}
            <h2 className="font-mono mb-5 text-4xl font-bold">
              {t('register.register')}
            </h2>
            {/* <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
            Log in to your account to upload or download pictures, videos or
            music.
          </p> */}
            <div>
              <TextInput
                label="username"
                type="text"
                placeholder={t('register.enter_account')}
                register={register}
                errors={errors}
                validatedObject={{}}
              />
              {/* <input
                type="text"
                className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1"
                placeholder={t('register.enter_account')}
              /> */}
            </div>
            <div>
              <TextInput
                label="email"
                type="text"
                placeholder={t('register.enter_email')}
                register={register}
                errors={errors}
                validatedObject={{}}
              />
            </div>
            {/* <div className="my-6">
              <input
                type="password"
                className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1"
                placeholder={t('register.enter_email')}
              />
            </div> */}
            <div>
              <TextInput
                label="password"
                type="password"
                placeholder={t('register.password')}
                register={register}
                errors={errors}
                validatedObject={{}}
              />
            </div>
            <div>
              <TextInput
                label="confirmedPassword"
                type="password"
                placeholder={t('register.confirm_password')}
                register={register}
                errors={errors}
                validatedObject={{}}
              />
            </div>
            {isError && (
              <div>
                <ErrorText>{errorMessage}</ErrorText>
              </div>
            )}
            {isSuccess && (
              <div>
                <SuccessText>Đăng ký thành công!</SuccessText>
              </div>
            )}
            {/* <!-- Middle Content --> */}
            <div className="flex flex-col items-center justify-between mt-6 space-y-6  md:flex-row md:space-y-0 md:space-x-6">
              <div className="font-regular text-orange-600 hover:cursor-pointer">
                <Link to="/login">{t('register.have_account')}</Link>
              </div>

              <button
                disabled={isPending}
                className="w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
              >
                <span>{t('register.register')}</span>
                {isPending ? (
                  <Spinner className="w-4 h-4 text-white" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="13" y1="18" x2="19" y2="12" />
                    <line x1="13" y1="6" x2="19" y2="12" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          {/* <!-- Right Side --> */}
          <img
            src={sideImage}
            alt=""
            className="w-[430px] h-[670px] hidden md:block"
          />

          {/* <!-- Close Button --> */}
          <Link to="/">
            <div className="group absolute -top-5 right-4 flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black group-hover:text-gray-600"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Login;
