import '@/components/top-menu/TopMenu.css';
import { BuildDateAndTime, ActiveSessions } from '@/components/top-menu/TopMenu.service';
import logo from '@/assets/logo.png';
import clock from '@/assets/clock.png';
import { useTranslation } from "react-i18next";

export default function TopMenu() 
{
    const { day, date, time } = BuildDateAndTime();
    const sessions = ActiveSessions();
    const { t } = useTranslation();

    return (
        <header className="top-menu">
            <div className="top-menu__logo">
                <div className="top-menu__logo-icon">
                    <img src={logo}/>
                </div>
                <span className="top-menu__logo-text">{t("app.name")}</span>
            </div>
            <div className="top-menu__search">
                <input type="text" placeholder={t("search.placeholder")}/>
            </div>
            <div className="top-menu__info">
                <div className="top-menu__sessions">
                    <span className="top-menu__sessions-indicator"></span>
                    <span className="top-menu__sessions-title">
                        {t("sessions.online")}
                    </span>
                    <span className="top-menu__sessions-count">
                        {sessions}
                    </span>
                </div>
                <div className="top-menu__date">
                    <span className="top-menu__day">{day}</span>
                    <span className="top-menu__full-date">{date}</span>
                </div>
                <div className="top-menu__time">
                    <img className="top-menu__time-clock-icon" src={clock}/>
                    <span>{time}</span>
                </div>
            </div>
        </header>
    );
}