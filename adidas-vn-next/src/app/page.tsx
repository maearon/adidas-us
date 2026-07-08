import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LegacyProductCardClient } from "@/components/legacy/LegacyProductCardClient";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { OR: [{ franchise: "ultraboost" }, { franchise: "nmd" }, { onSale: "sale" }] },
    take: 8,
    orderBy: { id: "asc" },
  });

  return (
    <>
      <section className="main___2e0dj">
        <div className="content">
          <div className="wallpaperWrapper">
            <picture>
              <source media="(min-width: 960px)" srcSet="/lib/1.jpg" />
              <source media="(min-width: 600px)" srcSet="/lib/1.jpg" />
              <source srcSet="/lib/1.jpg" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lib/1.jpg" alt="P.O.D.SYSTEM" />
            </picture>
          </div>
          <div className="poster_content">
            <div className="ctas___1lkb1 left___2fRvf">
              <div className="content_item">
                <h1 className="title">P.O.D.SYSTEM</h1>
                <p className="summary">Một cấu trúc vỏ giày mới kết hợp ba công nghệ di sản trong một.</p>
                <div className="cta___3s8jP">
                  <Link href="/vn?men-podsystem" className="gl-cta gl-cta--primary gl-cta--primary-light">
                    SHOP NAM
                  </Link>
                </div>
                <div className="cta___3s8jP">
                  <Link href="/vn?women-podsystem" className="gl-cta gl-cta--primary gl-cta--primary-light">
                    shop nữ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center" style={{ textAlign: "center" }}>
        <div className="teaser_container">
          <Link href="/vn?podsystem">
            <div className="thumbnail">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lib/2.jpg" alt="" />
            </div>
            <div className="tester_text">
              <h6>P.O.D.SYSTEM</h6>
              <span>MAU NGAY</span>
            </div>
          </Link>
        </div>
        <div className="teaser_container">
          <Link href="/vn?originals_podsystem">
            <div className="thumbnail">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lib/3.jpg" alt="" />
            </div>
            <div className="tester_text">
              <h6>HÌNH DUNG LẠI DI SẢN CỦA CHÚNG TÔI</h6>
              <span>MUA NGAY</span>
            </div>
          </Link>
        </div>
      </div>

      <section className="main___2e0dj">
        <div className="content">
          <div className="wallpaperWrapper">
            <picture>
              <source media="(min-width: 960px)" srcSet="/lib/4.jpg" />
              <source media="(min-width: 600px)" srcSet="/lib/4.jpg" />
              <source srcSet="/lib/4.jpg" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lib/4.jpg" alt="Z.N.E." className="performance-item" />
            </picture>
          </div>
          <div className="poster_content">
            <h1 className="title">Áo chùm nỉ Z.N.E. mới sớm phát hành</h1>
            <p className="summary">Sinh ra trong thể thao. Làm cho cuộc sống. Được tạo bằng công nghệ phát hành nhanh.</p>
            <div className="cta___3s8jP">
              <Link href="/vn?men-zne" className="gl-cta gl-cta--primary gl-cta--primary-light">SHOP NAM</Link>
            </div>
            <div className="cta___3s8jP">
              <Link href="/vn?women-zne" className="gl-cta gl-cta--primary gl-cta--primary-light">shop nữ</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center" style={{ textAlign: "center" }}>
        <div className="teaser_container">
          <Link href="/vn?adidas_by_stella_mccartney">
            <div className="thumbnail">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lib/5.jpg" alt="" />
            </div>
            <div className="tester_text">
              <h6>ADIDAS BỞI STELLA MCCARTNEY</h6>
              <span>MUA NGAY</span>
            </div>
          </Link>
        </div>
        <div className="teaser_container">
          <Link href="/vn?back-to-sport">
            <div className="thumbnail">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lib/6.jpg" alt="" />
            </div>
            <div className="tester_text">
              <h6>TRỞ LẠI VỚI THỂ THAO</h6>
              <span>MUA NGAY</span>
            </div>
          </Link>
        </div>
      </div>

      <section className="row main___4eD3G color-theme-black">
        <div className="content___3uku8 fadeIn___3Xv7c seen___RpUqc">
          <h2 className="gl-heading--m title___3vuW1 withhtml___3bMHz">THEO DÕI CHÚNG TÔI</h2>
          <div className="buttonsContainer___24LfL">
            <a className="socialButton___2gvu4" href="https://www.facebook.com/adidasvn-233485690675732/" target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/glass/assets/img/Facebook_tcm221-231102.webp" alt="Facebook" />
            </a>
            <a className="socialButton___2gvu4" href="https://twitter.com/manh11117" target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/glass/assets/img/Twitter_tcm221-231101.webp" alt="Twitter" />
            </a>
            <a className="socialButton___2gvu4" href="https://www.youtube.com/channel/UCEpwKlaYn7Li3Nh_kQLmCTA" target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/glass/assets/img/Youtube_tcm221-231103.webp" alt="YouTube" />
            </a>
            <a className="socialButton___2gvu4" href="https://www.instagram.com/nguyenducmanh6392/" target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/glass/assets/img/Instagram_tcm221-231100.webp" alt="Instagram" />
            </a>
          </div>
        </div>
      </section>

      <main style={{ margin: "0 10px 0 320px", marginBottom: 100, clear: "both" }}>
        <h4 className="title___37UkT">SẢN PHẨM NỔI BẬT</h4>
        {featured.map((p) => (
          <LegacyProductCardClient key={p.id} product={p} />
        ))}
      </main>
    </>
  );
}
