import { RiFolderForbidFill } from 'react-icons/ri';

const Forbidden = () => {
  return (
    <div className="flex space-y-3 flex-col justify-center items-center w-full h-screen">
        <RiFolderForbidFill size={250} color="#f97316"/>
        <div className="text-4xl font-bold text-orange-400">ERROR</div>
        <div className="text-2xl text-orange-400">Bạn không có quyền truy cập trang này!</div>
    </div>
  );
};

export default Forbidden;
