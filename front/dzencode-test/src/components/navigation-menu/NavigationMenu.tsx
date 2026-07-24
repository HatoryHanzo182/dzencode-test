import "@/components/navigation-menu/NavigationMenu.css";
import settings from "@/assets/settings.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NavigationMenu()
{
    const { t } = useTranslation();

    return (
        <div className="navigation-menu">
            <div className="navigation-menu__profile">
                <div className="navigation-menu__avatar-wrapper">
                    <img
                        className="navigation-menu__avatar"
                        src="https://perfectacosmeticsurgery.co.uk/wp-content/uploads/2019/09/Perfecta-Men2-1.jpg?id=5365"
                    />
                    <button className="navigation-menu__settings">
                        <img src={settings} />
                    </button>
                </div>
            </div>
            <nav className="navigation-menu__list">
                <NavLink to="/orders"
                    className={({ isActive }) =>
                        `navigation-menu__item ${
                            isActive ? "navigation-menu__item--active" : ""
                        }`
                    }
                >
                    {t("navigation.orders")}
                </NavLink>
                <NavLink to="/groups"
                    className={({ isActive }) =>
                        `navigation-menu__item ${
                            isActive ? "navigation-menu__item--active" : ""
                        }`
                    }
                >
                    {t("navigation.groups")}
                </NavLink>
                <button className="navigation-menu__item">
                    {t("navigation.products")}
                </button>
                <button className="navigation-menu__item">
                    {t("navigation.users")}
                </button>
                <button className="navigation-menu__item">
                    {t("navigation.settings")}
                </button>
            </nav>
        </div>
    );
}