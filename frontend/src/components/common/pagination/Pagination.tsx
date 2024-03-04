import { FC, memo, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const Pagination: FC = memo(() => {
  const [num, setNum] = useState(1);
  const [cur, setCur] = useState(1);
  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];
  const next = () => {
    setNum((prev) => prev + 1);
    setCur((prev) => prev + 1);
  };
  const back = () => {
    if (num > 1) {
      setNum((prev) => prev - 1);
    }
    if (cur > 1) {
      setCur((prev) => prev - 1);
    }
  };
  return (
    <nav
      className="flex justify-center mt-6 rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <a
        // href="#"
        className=" inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Previous</span>
        <LeftOutlined className="h-5 w-5" aria-hidden="true" onClick={back} />
      </a>
      {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

      {pages.map((curPage, index) => (
        <a
          // href="#"
          key={index}
          onClick={() => setCur(curPage.page)}
          aria-current="page"
          className={`inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 ${
            cur == curPage.page && ' bg-orange-600 text-white'
          }`}
        >
          {curPage.page}
        </a>
      ))}
      {/* <a
        href="#"
        aria-current="page"
        className="inline-flex items-center bg-orange-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        1
      </a>
      <a
        href="#"
        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        2
      </a>
      <a
        href="#"
        className=" hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
      >
        3
      </a> */}
      {/* <span className=" inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
        ...
      </span>
      <a
        href="#"
        className=" hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
      >
        8
      </a>
      <a
        href="#"
        className=" inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        9
      </a>
      <a
        href="#"
        className=" inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        10
      </a> */}
      <a
        // href="#"
        className=" inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        <RightOutlined className="h-5 w-5" aria-hidden="true" onClick={next} />
      </a>
    </nav>
  );
});

export default Pagination;
