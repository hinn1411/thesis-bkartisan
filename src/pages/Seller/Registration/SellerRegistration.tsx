import { FC, memo, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

import Stepper from "./components/Stepper";
import { z } from "zod";
import { FormDataSchema } from "./components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ShopForm from "./components/forms/ShopForm";
import InformationForm from "./components/forms/InformationForm.tsx";
import ConfirmationForm from "./components/forms/ConfirmationForm.tsx";
import { useSellerCode } from "./hooks/useSellerCode.tsx";

export type Inputs = z.infer<typeof FormDataSchema>;

const SellerRegistration: FC = memo(() => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { createSellerCode, becomeSeller } = useSellerCode();
  const {
    register,
    handleSubmit,
    trigger,
    getValues,

    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });
  const goNext = async () => {
    if (currentStepIndex === 0) {
      const isShopFormValid = await trigger("shopName");
      if (isShopFormValid) {
        setCurrentStepIndex((index) => (index < 2 ? index + 1 : 2));
      }
    }
    if (currentStepIndex === 1) {
      const isInfoFormValid = await trigger([
        "name",
        "numPhone",
        "email",
        "address",
      ]);
      if (isInfoFormValid) {
        await createSellerCode(getValues("email"));
        setCurrentStepIndex((index) => (index < 2 ? index + 1 : 2));
      }
    }
    if (currentStepIndex === 2) {
      const isConfirmFormValid = await trigger("emailCode");
      if (isConfirmFormValid) {
        console.log(getValues());
        await becomeSeller(getValues());
      }
    }
  };
  const handleBecomeSeller: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <main className="min-h-screen px-20 my-5">
      <div className="flex justify-start items-center space-x-1">
        <InfoCircleOutlined
          className="hidden md:block"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />

        <p className="font-base">
          Hiện tại hệ thống chỉ hỗ trợ người bán ở Việt Nam. (Support Vietnamese
          sellers only, we are sorry for this inconvenience)
        </p>
      </div>
      <div className="mt-4 space-y-5">
        <p className="text-center text-3xl">Trở thành người bán</p>
        <Stepper
          currentState={currentStepIndex}
          setCurrent={setCurrentStepIndex}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
      </div>
      <form onSubmit={handleSubmit(handleBecomeSeller)}>
        {currentStepIndex === 0 && (
          <ShopForm register={register} errors={errors} goNext={goNext} />
        )}
        {currentStepIndex === 1 && (
          <InformationForm
            register={register}
            errors={errors}
            goNext={goNext}
          />
        )}
        {currentStepIndex === 2 && (
          <ConfirmationForm
            register={register}
            errors={errors}
            goNext={goNext}
          />
        )}
      </form>
    </main>
  );
});

export default SellerRegistration;
