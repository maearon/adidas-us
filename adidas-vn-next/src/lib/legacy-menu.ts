export function sanitizeLegacyMenuHtml(
  html: string,
  opts: { cartHref: string; wishHref: string; wishlistCount: number; loggedIn: boolean },
) {
  let out = html;

  // Remove duplicate fragments already rendered by React.
  out = out.replace(/<div w3-include-html="\/vn\/include\/slidenav\.php"><\/div>/i, "");
  out = out.replace(/<div id="fb-root"><\/div>[\s\S]*?<\/div>\s*(?=<div class="glass-header-top")/i, "");
  out = out.replace(/<div class="glass-header-top"[\s\S]*?<\/div>\s*/gi, "");

  // Fix legacy PHP routes and broken attributes.
  out = out
    .replace(/\/vn\/login\/login_success\.php/g, "/vn/login/profile")
    .replace(/href="\/vn\/login\/"/g, 'href="/vn/login"')
    .replace(/href="\/vn\/login\/" href="#"/g, 'href="/vn/login"')
    .replace(/\/vn\/\?/g, "/vn?");

  // Cart bag icon.
  out = out.replace(
    /<a title="Kiểm tra" href="#" class="addtobag">/g,
    `<a title="Kiểm tra" href="${opts.cartHref}" class="addtobag">`,
  );

  // Wishlist heart icon.
  out = out.replace(
    /<div class="wish"[^>]*>[\s\S]*?<\/div>/,
    opts.loggedIn
      ? `<div class="wish"><a href="${opts.wishHref}" class="addtobag"><img src="/img/wish.png" style="float: right"><div class="centered">${opts.wishlistCount > 0 ? opts.wishlistCount : ""}</div></a></div>`
      : `<div class="wish" style="display:none"><a href="${opts.wishHref}" class="addtobag"><img src="/img/wish.png" style="float: right"><div class="centered"></div></a></div>`,
  );

  // Ensure logo link works above menu layer.
  out = out.replace(
    '<div id="logo"><a href="/">',
    '<div id="logo"><a href="/" style="display:block;position:relative;z-index:2003;width:80px;height:50px;">',
  );

  return out;
}
