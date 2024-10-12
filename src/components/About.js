import React from 'react';
import { Link } from 'react-router-dom';
import './css/About.css';

const About = () => {
    return (
        <div className="about-container">
            <h2><strong>Về chúng tôi</strong></h2>
            <div className="about-content">
                <div className="about-text">
                    <p>
                        Chào mừng bạn đến với <Link to="/products" style={{ color: 'red', textDecoration: 'none' }}><strong>Mẹ Bầu và Bé</strong></Link> - nơi cung cấp các sản phẩm sữa chất lượng cao cho mẹ bầu và em bé.
                    </p>
                    <p>
                        Chúng tôi cam kết mang đến những sản phẩm an toàn và tin cậy, giúp bạn và bé yêu có một cuộc sống khỏe mạnh và hạnh phúc.
                    </p>
                    <p>
                        Với hơn <strong style={{ color: 'red' }}>10</strong> năm kinh nghiệm trong ngành, chúng tôi tự hào là đơn vị hàng đầu cung cấp sữa cho mẹ bầu và em bé tại Việt Nam. Chúng tôi luôn chọn lựa những thương hiệu uy tín, sản phẩm đạt chuẩn chất lượng cao để mang đến cho bạn sự an tâm tuyệt đối.
                    </p>
                    <p>
                        Chúng tôi cũng cung cấp các dịch vụ tư vấn chuyên nghiệp về dinh dưỡng và chăm sóc sức khỏe cho mẹ bầu và em bé. Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn trong mọi thắc mắc và nhu cầu của bạn.
                    </p>
                    <p>
                        Hãy khám phá các sản phẩm của chúng tôi và liên hệ với chúng tôi nếu có bất kỳ câu hỏi nào.
                    </p>
                </div>
                <div className="about-video">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/uiBhh1hjJdo?si=eoWJuJL9UUmqcoM-"
                        title="Mẹ Bầu và Bé - Giới thiệu"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <div className="more-info">
                <p>
                    Muốn biết thêm về chúng tôi? Hãy truy cập <Link to="/products" style={{ color: 'red', textDecoration: 'none' }}>danh sách sản phẩm</Link> hoặc <Link to="/contact" style={{ color: 'red', textDecoration: 'none' }}>liên hệ</Link> với chúng tôi ngay hôm nay!
                </p>
            </div>
        </div>
    );
}

export default About;
