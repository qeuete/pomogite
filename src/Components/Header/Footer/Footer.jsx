import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <div className="Footer">
            <div className="sb_footer section_padding">
                <div className="sb_footer-links">
                    <div className="sb_footer-links_div">
                        <h4>О компании</h4>
                        <a href="https://street-beat.ru/vacancies/">
                            <p>Вакансии</p>
                        </a>
                        <a href="https://street-beat.ru/about/">
                            <p>О нас</p>
                        </a>
                        <a href="https://street-beat.ru/feedback/">
                            <p>Обратная связь</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Помощь</h4>
                        <a href="https://street-beat.ru/tracking/">
                            <p>Где мой заказ?</p>
                        </a>
                        <a href="https://street-beat.ru/deliveryandpayment/">
                            <p>Доставка и оплата</p>
                        </a>
                        <a href="https://street-beat.ru/exchange-and-return/">
                            <p>Обмен и возврат</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Остальное</h4>
                        <a href="https://street-beat.ru/gift/">
                            <p>Электронный подарочный сертификат</p>
                        </a>
                        <a href="https://street-beat.ru/cookies/">
                            <p>Cookies</p>
                        </a>
                        <a href="https://street-beat.ru/privacy/">
                            <p>Политика конфиденциальности</p>
                        </a>
                    </div>

                    <hr></hr>

                    <div className="sb_footer-below">
                        <div className="sb_footer-copyright">
                            <p>
                            © Inventive Retail Group, 2024
                            </p>
                        </div>
                        <div className="sb_footer-below-links">
                            <a href="terms"><div><p></p></div></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
