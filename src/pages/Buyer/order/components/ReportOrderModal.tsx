import {
  Fragment,
  useRef,
  FC,
  memo,
  Dispatch,
  ChangeEvent,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiReports from "@apis/apiReports";
import {
  ErrorIcon,
  Message,
  SuccessIcon,
  options,
} from "@components/common/toast";
import { ToastOptions, toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { FiPlus } from "react-icons/fi";

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  reporter: any;    // Chỉ cần username với name
  reportedUser: any; // Chỉ cần username với name
};

type FormData = {
  reason: string;
  additionalInfo: string;
  images: File[];
};

const ReportOrderModal: FC<ModalProps> = memo(
  ({ isOpen, setIsOpen, reporter, reportedUser }) => {
    const cancelButtonRef = useRef(null);

    const { register, handleSubmit } = useForm<FormData>();
    const { mutate, isPending } = useMutation({
      mutationFn: async (values) => {
        return apiReports.createReport(values);
      },
      onSuccess: () => {
        toast.success(<Message>Báo cáo thành công.</Message>, {
          icon: <SuccessIcon />,
          ...(options as ToastOptions),
        });
        setIsOpen(false);
      },
      onError: () => {
        toast.error(<Message>Bị lỗi xin vui lòng thử lại!</Message>, {
          icon: <ErrorIcon />,
          ...(options as ToastOptions),
        });
      },
    });
    const onSubmit = (data: FormData) => {
      const value = new FormData();
      value.append('reason', data.reason);
      value.append('reporter', reporter.username);
      value.append('reporterName', reporter.name);
      value.append('reportedUser', reportedUser.username);
      value.append('reportedUserName', reportedUser.name);
      value.append('additionalInfo', data.additionalInfo);
      value.append('type', "Mua bán");
      for (const image of images) {
        value.append("images", image);
      }
      mutate(value);
    };

    const [images, setImages] = useState<File[]>([]);
    const [errorImg, setErrorImg] = useState("");
    const handleFileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const newImages: File[] = [];

      if (files) {
        setErrorImg("");
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          // Check file type
          if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
            const error = "Hình ảnh chỉ hỗ trợ kiểu jpg, jpeg, png và gif.";
            setErrorImg(error);
            return;
          }

          // Check file size
          if (file.size > 5000000) {
            const error = "File không được lớn hơn 5MB.";
            setErrorImg(error);
            return;
          }
          newImages.push(file);
        }

        setImages([...images, ...newImages]);
      }
    };
    const handleRemoveImage = (index: number) => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    };

    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed my-auto inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="min-w-[50vw] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1">
                        <Dialog.Title
                          as="h3"
                          className="flex flex-col md:flex-row items-center space-x-0 md:space-x-3 space-y-1 md:space-y-0 text-base font-semibold leading-6 text-gray-900"
                        >
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                            />
                          </div>
                          <p>Báo cáo mua bán</p>
                        </Dialog.Title>
                        {/* Content container */}
                        <Dialog.Description className="relative">
                          {isPending && (
                            <>
                              <div className="absolute inset-0 bg-slate-200/25"></div>
                              <Spinner
                                size={"xl"}
                                className="absolute top-1/2 left-1/2"
                              />
                            </>
                          )}
                          <div className="mt-2 text-start">
                            <p className="font-semibold text-sm mb-2">
                              Lí do vi phạm:
                            </p>
                            <textarea
                              id="message"
                              rows={4}
                              className="block h-16 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Lí do vi phạm..."
                              {...register("reason")}
                            ></textarea>
                            <label
                              htmlFor="message"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Mô tả thêm:
                            </label>
                            <textarea
                              id="message"
                              rows={4}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Mô tả chi tiết..."
                              {...register("additionalInfo")}
                            ></textarea>
                            <p className="font-semibold text-sm mb-2">
                              Hình ảnh đính kèm (Tối đa 6 hình):
                            </p>
                            {/**Hình ảnh */}
                            <div>
                              <div className="flex">
                                {/* list hình ảnh */}
                                <div className="flex max-w-2xl space-x-2">
                                  {images.map((imageFiles, index) => (
                                    <div key={index} className="relative group">
                                      <img
                                        className="w-20 h-20 rounded-md"
                                        src={URL.createObjectURL(imageFiles)}
                                        alt={`Image ${index + 1}`}
                                      />
                                      <div
                                        className="absolute top-0 right-0 flex items-center w-4 h-4 text-white bg-red-500 rounded-full p-1 cursor-pointer"
                                        onClick={() => handleRemoveImage(index)}
                                      >
                                        -
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {images.length < 6 && (
                                  <label className="flex items-center border-2 p-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                    <FiPlus className="w-8 h-8 text-gray-500 dark:text-gray-400"></FiPlus>
                                    <input
                                      id="image"
                                      type="file"
                                      className="hidden"
                                      multiple
                                      onChange={handleFileImageChange}
                                    />
                                  </label>
                                )}
                              </div>
                              {errorImg != "" && (
                                <p className="text-sm text-red-500">
                                  {errorImg}
                                </p>
                              )}
                            </div>
                          </div>
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>
                  {/* Buttons container */}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:ml-3 sm:w-auto"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isPending}
                    >
                      Đồng ý
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setIsOpen(false)}
                      ref={cancelButtonRef}
                      disabled={isPending}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
);

export default ReportOrderModal;
