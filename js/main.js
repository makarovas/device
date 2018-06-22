$(function hideShowMenu() {
  $('.main-nav__goods').hover(
    function () {
      $('#menu')
        .removeClass('hidden')
        .css({
          opacity: '1',
          transitionProperty: 'all',
          transitionDuration: '1s'
        })
      // $('.main-nav_menu-name label').css({
      //   opacity: '0.3'
      // });
    },
    function () {
      $('#menu')
        .mouseleave(function () {
          $(this).addClass('hidden');
        })
        .css({
          opacity: '0',
          transitionProperty: 'all',
          transitionDuration: '1s'
        });
      // $('.main-nav_menu-name label').css({
      //   opacity: '0.3'
      // });
    });
});


$(function servicesListActive() {
  $('.list-li:gt(0)').click(function () {
    $(this).addClass('services__list-checked');
  })
});


$(function slider() {
  setInterval(function () {
    $('.content-wrap > section:first')
      .fadeOut(2000)
      .next()
      .fadeIn(2000)
      .end()
      .appendTo('.content-wrap');
  }, 5000);
  $('.content-wrap > section:gt(0)').hide();
});

$(function modalWindowAction() {
  $(function openModalWindow() {
    $('#write-us').click(function () {
      $('#modal').removeClass('hidden')
    })
  });
  
  $(function closeModalWindow() {
    $('.modal__button').click(function () {
      $('#modal').addClass('hidden'); // установленно временно, до настройки ajax
    })
    $('.modal__esc').click(function () {
      $('#modal').addClass('hidden');
    })
  })
});

$(function toggleServicesMenu() {
  $( '.services__list .list-li' ).click(function( event ) {
    $( '.list-li' ).toggleClass('services__list-checked');
    event.preventDefault();
  });
});


