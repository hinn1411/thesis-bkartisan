import { Toast } from "flowbite-react";
import { HiX, HiCheck, HiExclamation } from "react-icons/hi";
import './ToastAnimations.css'; // Import the CSS file

interface MessageProp {
  message: string;
}

export function Success({ message }: MessageProp) {
  return (
    <div className="flex flex-col gap-4 items-end mt-20 z-50 fixed top-0 right-0 m-4 slide-down">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
}

export function Error({ message }: MessageProp) {
  return (
    <div className="flex flex-col gap-4 items-end mt-20 z-50 fixed top-0 right-0 m-4 slide-down">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
}

export function Warnning({ message }: MessageProp) {
  return (
    <div className="flex flex-col gap-4 items-end mt-20 z-50 fixed top-0 right-0 m-4 slide-down">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <HiExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
}
