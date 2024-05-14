import { Fragment, useRef, FC, memo, Dispatch } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { product } from '@contants/response';
export type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
};

const ReportProductModal: FC<ModalProps> = memo(({ isOpen, setIsOpen }) => {
  const cancelButtonRef = useRef(null);
  // const [selected, setSelected] = useState(product[0]);
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
                        <p>Báo cáo vi phạm</p>
                      </Dialog.Title>
                      {/* Content container */}
                      <Dialog.Description>
                        <div className="mt-2 text-start">
                          <p className="font-semibold text-sm mb-2">
                            Loại vi phạm
                          </p>
                          {product.map((item, index) => (
                            <div key={index} className="flex items-center mb-4">
                              <input
                                defaultChecked={item === product[0]}
                                id={item}
                                type="radio"
                                value={item}
                                name="default-radio"
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
                    onClick={() => setIsOpen(false)}
                  >
                    Đồng ý
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsOpen(false)}
                    ref={cancelButtonRef}
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

export default ReportProductModal;
