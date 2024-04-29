import { FC, memo } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

import Stepper from './components/Stepper';
import { z } from 'zod';
import { FormDataSchema } from './components/forms/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FieldName } from 'react-hook-form';
import { useMultiStepForm } from './hooks/useMultiStepForm';
import ShopForm from './components/forms/ShopForm';
import InformationForm from './components/forms/InformationForm';
import ConfirmationForm from './components/forms/ConfirmationForm';
import { steps } from './data';
type Inputs = z.infer<typeof FormDataSchema>;
const SellerRegistration: FC = memo(() => {
  const registrationSteps = [
    <ShopForm />,
    <InformationForm />,
    <ConfirmationForm />,
  ];
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };
  const next = async () => {
    console.log(`next clicked`);

    const fields = steps[currentStepIndex].fields;
    console.log(fields);

    const output = await trigger(fields as FieldName<Inputs>[], {
      shouldFocus: true,
    });
    console.log(`output =`, output);

    if (!output) {
      return;
    }
    if (currentStepIndex < steps.length - 1) {
      goTo(currentStepIndex + 1);
    }
  };
  const { currentStepIndex, step, goTo, isCompleted, setIsCompleted } =
    useMultiStepForm(registrationSteps, register, errors, next, watch, getValues);
  return (
    <main className="min-h-screen px-20 my-5">
      <div className="flex justify-start items-center space-x-1">

        <InfoCircleOutlined className='hidden md:block' />

        <p className="font-base">
          Hiện tại hệ thống chỉ hỗ trợ người bán ở Việt Nam. (Support Vietnamese
          sellers only, we are sorry for this inconvenience)
        </p>
      </div>
      <div className="mt-4 space-y-5">
        <p className="text-center text-3xl">Trở thành người bán</p>
        <Stepper
          currentState={currentStepIndex}
          setCurrent={goTo}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
      </div>
      <form onSubmit={handleSubmit(processForm)}>{step}</form>
    </main>
  );
});

export default SellerRegistration;
