(function(){
  var pages = [
    {id:'home',href:'index.html',zh:'首頁',en:'Home'},
    {id:'information',href:'banquet-information.html',zh:'宴會資訊',en:'Information'},
    {id:'guests',href:'guest-list.html',zh:'賓客名單',en:'Guest List'},
    {id:'invitation',href:'state-banquet.html',zh:'邀請函',en:'Invitation'},
    {id:'guidelines',href:'banquet-guidelines.html',zh:'宴會規範',en:'Guidelines'}
  ];

  function currentLanguage(){
    return localStorage.getItem('banquetLang') || 'zh';
  }

  function renderNavigation(){
    var mount = document.getElementById('site-nav');
    if(!mount){return;}
    var active = mount.dataset.active || '';
    var links = pages.map(function(page){
      var activeClass = page.id === active ? ' active' : '';
      var current = page.id === active ? ' aria-current="page"' : '';
      return '<a href="' + page.href + '" class="i18n' + activeClass + '" data-zh="' + page.zh + '" data-en="' + page.en + '"' + current + '>' + page.zh + '</a>';
    }).join('');
    mount.innerHTML =
      '<nav class="royal-nav">' +
        '<div class="nav-inner">' +
          '<a class="brand" href="index.html">' +
            '<img src="assets/state-banquet-nav.png" alt="赫斯維爾徽章">' +
            '<span class="i18n" data-zh="赫斯維爾國宴" data-en="State Banquet of Hershwell">赫斯維爾國宴</span>' +
          '</a>' +
          '<button class="menu-toggle" type="button" aria-label="開啟導覽" aria-expanded="false" aria-controls="primary-navigation">☰</button>' +
          '<div class="nav-actions" id="primary-navigation"><div class="nav-links">' + links + '</div></div>' +
          '<div class="lang-switch" aria-label="語言切換">' +
            '<button type="button" class="lang-btn" data-lang="zh">中文</button>' +
            '<span class="lang-sep">/</span>' +
            '<button type="button" class="lang-btn" data-lang="en">English</button>' +
          '</div>' +
        '</div>' +
      '</nav>';

    var toggle = mount.querySelector('.menu-toggle');
    var actions = mount.querySelector('.nav-actions');
    toggle.addEventListener('click',function(){
      var open = actions.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open ? '關閉導覽' : '開啟導覽');
      toggle.textContent = open ? '×' : '☰';
    });
    actions.addEventListener('click',function(event){
      if(event.target.closest('a')){
        actions.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        toggle.textContent = '☰';
      }
    });
  }

  function renderFooter(){
    var mount = document.getElementById('site-footer');
    if(!mount){return;}
    mount.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-identity">' +
          '<img src="assets/state-banquet-nav.png" alt="赫斯維爾徽章">' +
          '<div><strong class="i18n" data-zh="赫斯維爾國宴" data-en="State Banquet of Hershwell">赫斯維爾國宴</strong>' +
          '<span class="i18n" data-zh="宮廷大臣辦公室 · 芬第夏宮" data-en="Office of the Grand Chamberlain · Findeshia Palace">宮廷大臣辦公室 · 芬第夏宮</span></div>' +
        '</div>' +
        '<div class="footer-contact"><span class="i18n" data-zh="宴會聯絡" data-en="Banquet Enquiries">宴會聯絡</span>' +
          '<a href="mailto:gov.hershwell@gmail.com">gov.hershwell@gmail.com</a></div>' +
      '</div>' +
      '<div class="footer-bottom">© 2026 Principality of Hershwell</div>';
  }

  function applyLanguage(lang){
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    document.querySelectorAll('.lang-btn').forEach(function(button){
      button.classList.toggle('active',button.dataset.lang === lang);
    });
    document.querySelectorAll('.i18n').forEach(function(element){
      var text = element.getAttribute('data-' + lang);
      if(text !== null){
        element.innerHTML = text;
        element.hidden = text === '';
      }
    });
    window.dispatchEvent(new CustomEvent('banquet:language',{detail:{lang:lang}}));
  }

  function bindLanguage(){
    document.addEventListener('click',function(event){
      var button = event.target.closest('.lang-btn');
      if(!button){return;}
      localStorage.setItem('banquetLang',button.dataset.lang);
      applyLanguage(button.dataset.lang);
    });
  }

  function bindLightbox(){
    var lightbox = document.getElementById('photo-lightbox');
    var image = document.getElementById('lightbox-image');
    if(!lightbox || !image){return;}
    function close(){
      lightbox.classList.remove('show');
      lightbox.setAttribute('aria-hidden','true');
      image.removeAttribute('src');
      image.alt = '';
    }
    document.addEventListener('click',function(event){
      var button = event.target.closest('.photo-button');
      if(button){
        var source = button.querySelector('img');
        image.src = source.src;
        image.alt = source.alt;
        lightbox.classList.add('show');
        lightbox.setAttribute('aria-hidden','false');
        lightbox.querySelector('.lightbox-close').focus();
        return;
      }
      if(event.target === lightbox || event.target.closest('.lightbox-close')){close();}
    });
    document.addEventListener('keydown',function(event){
      if(event.key === 'Escape'){close();}
    });
  }

  function reveal(){
    requestAnimationFrame(function(){
      document.querySelectorAll('.fade-up').forEach(function(element){element.classList.add('show');});
    });
  }

  renderNavigation();
  renderFooter();
  bindLanguage();
  bindLightbox();
  applyLanguage(currentLanguage());
  reveal();

  window.BanquetSite = {applyLanguage:applyLanguage,currentLanguage:currentLanguage};
})();
