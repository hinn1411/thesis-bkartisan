import { Fragment, useRef, FC, memo, Dispatch } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { comment as commentReponse } from '@contants/response';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import apiReports from '@apis/apiReports';
import {
  ErrorIcon,
  Message,
  SuccessIcon,
  options,
} from "@components/common/toast";
import { ToastOptions, toast } from "react-toastify";
import { Spinner } from 'flowbite-react';

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  user: any;
  comment: any;
};

type FormData = {
  reason: string;
  additionalInfo: string;
};

const ReportCommentModal: FC<ModalProps> = memo(({ isOpen, setIsOpen, user, comment }) => {
  const cancelButtonRef = useRef(null);
  // const [selected, setSelected] = useState(product[0]);

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
    if (!comment) {
      toast.error(<Message>Bị lỗi xin vui lòng thử lại!</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    } else if (!user) {
      toast.error(<Message>Vui lòng đăng nhập để báo cáo!</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    } else {
      const value = {
        ...data,
        reporter: user.username,
        reporterName: user.name,
        reportedUser: comment.writer,
        reportedUserName: comment.writerName,
        type: "Bình luận",
        refId: comment.commentId,
      };
      mutate(value);
    }
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
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
                        <p>Báo cáo bình luận vi phạm</p>
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
                            Loại vi phạm
                          </p>
                          {commentReponse.map((item, index) => (
                            <div key={index} className="flex items-center mb-4">
                              <input
                                defaultChecked={item === commentReponse[0]}
                                id={item}
                                type="radio"
                                value={item}
                                name="default-radio"
                                {...register("reason")}
                                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600"
                              />
                              <label
                                htmlFor={item}
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
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
});

export default ReportCommentModal;
