import { memo, FC } from 'react';
import facebookIcon from '../../assets/images/footer/facebook.png';
import youtubeIcon from '../../assets/images/footer/youtube.png';
import zaloIcon from '../../assets/images/footer/zalo.png';
import { useTranslation } from 'react-i18next';

const Footer: FC = memo(() => {
  const { t } = useTranslation();
  return (
    <footer className="bg-amber-50 container mx-auto px-10 py-4">
      {/* Inner container */}
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 md:space-y-0  mx-auto px-10 py-0">
        <section>
          <h1 className="font-medium">{t('footer.about_us')}</h1>
          <div className="text-[13px] font-normal">
            <p className="hover:cursor-pointer">{t('footer.introduction')}</p>
            <p className="hover:cursor-pointer">{t('footer.home')}</p>
            <p className="hover:cursor-pointer">{t('footer.developer')}</p>
            <p className="hover:cursor-pointer">
              {t('footer.security_policy')}
            </p>
            <p className="hover:cursor-pointer">{t('footer.usage')}</p>
          </div>
        </section>
        <section>
          <h1 className="font-medium">{t('footer.service')}</h1>
          <div className="text-[13px] font-normal">
            <p className="hover:cursor-pointer">{t('footer.faq')}</p>
            <p className="hover:cursor-pointer">{t('footer.instruction')}</p>
            <p className="hover:cursor-pointer">{t('footer.complain')}</p>
            <p className="hover:cursor-pointer">{t('footer.regulation')}</p>
          </div>
        </section>
        <section>
          <h1 className="font-medium">{t('footer.contact')}</h1>
          <div className="flex justify-center items-center space-x-1 ">
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
          <h1 className="font-medium">{t('footer.subscribe')}</h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 justify-between md:space-x-2 ">
            <div>
              <input
                type="email"
                placeholder={t('footer.your_email')}
                className="px-4 py-2 placeholder:text-sm border-2 rounded placeholder-black"
              />
            </div>
            <div>
              <button className="bg-orange-600 px-4 py-2 text-black rounded hover:opacity-90 font-medium">
                {t('footer.submit')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
});

export default Footer;
