import { memo, FC } from 'react';
import facebookIcon from '../../assets/images/footer/facebook.png';
import youtubeIcon from '../../assets/images/footer/youtube.png';
import zaloIcon from '../../assets/images/footer/zalo.png';
const Footer: FC = memo(() => {
  return (
    <footer className="bg-amber-50 container mx-auto px-10 py-4">
      {/* Inner container */}
      <div className="flex flex-col justify-between items-start md:flex-row mx-auto px-6">
        <section>
          <h1 className="font-medium">Về chúng tôi</h1>
          <div className="text-[13px] font-normal">
            <p className="hover:cursor-pointer">Trang chủ</p>
            <p className="hover:cursor-pointer">Giới thiệu</p>
            <p className="hover:cursor-pointer">Nhà phát triển</p>
            <p className="hover:cursor-pointer">Chính sách bảo mật</p>
            <p className="hover:cursor-pointer">Quy định sử dụng</p>
          </div>
        </section>
        <section>
          <h1 className="font-medium">Hỗ trợ khách hàng</h1>
          <div className="text-[13px] font-normal">
            <p className="hover:cursor-pointer">Câu hỏi thường gặp</p>
            <p className="hover:cursor-pointer">Hướng dẫn đăng bán</p>
            <p className="hover:cursor-pointer">Giải quyết khiếu nại</p>
            <p className="hover:cursor-pointer">Quy định đăng bán</p>
          </div>
        </section>
        <section>
          <h1 className="font-medium">Liên hệ</h1>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-1">
            <div>
              <img src={facebookIcon} alt="facebook icon" className="w-8 h-8" />
            </div>
            <div>
              <img src={youtubeIcon} alt="facebook icon" className="w-8 h-8" />
            </div>
            <div>
              <img src={zaloIcon} alt="facebook icon" className="w-8 h-8" />
            </div>
          </div>
        </section>
        <section>
          <h1 className="font-medium">Đăng ký nhận tin</h1>
          <div className='flex flex-col md:flex-row items-center justify-between md:space-x-2'>
            <div>
              <input type="email" placeholder="Email của bạn" className='px-4 py-2 placeholder:text-sm border-2 rounded placeholder-black' />
            </div>
            <button className='bg-orange-600 px-4 py-2 text-black rounded hover:opacity-90 font-medium'>Đăng ký</button>
          </div>
        </section>
      </div>
    </footer>
  );
});

export default Footer;
