(function(){
  var body = document.getElementById('guest-list-body');
  if(!body){return;}
  var guests = window.BANQUET_GUESTS || [];
  var rows = guests.map(function(guest,index){
    var zh = (guest.zhTitle ? guest.zhTitle + '<br>' : '') + guest.zhName;
    var en = guest.enName + (guest.enTitle ? ', ' + guest.enTitle : '');
    return '<tr><td class="num">' + String(index + 1).padStart(2,'0') + '</td>' +
      '<td class="guest-entry"><a class="guest-link i18n" href="state-banquet.html?guest=' + guest.id + '" data-zh="' + zh + '" data-en="' + en + '">' + zh + '</a></td></tr>';
  });
  while(rows.length < 12){
    rows.push('<tr><td class="num">' + String(rows.length + 1).padStart(2,'0') + '</td><td class="guest-entry"></td></tr>');
  }
  body.innerHTML = rows.join('');
  window.BanquetSite.applyLanguage(window.BanquetSite.currentLanguage());
})();
