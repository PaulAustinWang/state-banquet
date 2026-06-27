(function(){
  var guests = window.BANQUET_GUESTS || [];
  var picker = document.getElementById('guest-picker');
  var choices = document.getElementById('guest-choices');
  var invitation = document.getElementById('invitation');
  var guestId = new URLSearchParams(window.location.search).get('guest');
  var guest = guests.find(function(item){return item.id === guestId;});

  function combined(item,lang){
    if(lang === 'zh'){
      return (item.zhTitle ? item.zhTitle + '<br>' : '') + item.zhName;
    }
    return item.enName + (item.enTitle ? ', ' + item.enTitle : '');
  }

  choices.innerHTML = guests.map(function(item){
    return '<a class="guest-choice i18n" href="state-banquet.html?guest=' + item.id + '" data-zh="' + combined(item,'zh') + '" data-en="' + combined(item,'en') + '">' + combined(item,'zh') + '</a>';
  }).join('');

  picker.style.display = guest ? 'none' : 'block';
  invitation.style.display = guest ? 'block' : 'none';

  function fill(lang){
    if(!guest){return;}
    var name = document.getElementById('guest-name-line');
    var title = document.getElementById('guest-title-line');
    name.textContent = guest[lang + 'Name'];
    name.classList.add('filled');
    var titleText = guest[lang + 'Title'];
    title.textContent = titleText;
    title.classList.toggle('filled',Boolean(titleText));
  }

  window.addEventListener('banquet:language',function(event){fill(event.detail.lang);});
  fill(window.BanquetSite.currentLanguage());
  window.BanquetSite.applyLanguage(window.BanquetSite.currentLanguage());
})();
