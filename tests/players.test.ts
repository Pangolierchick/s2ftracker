import { assert, describe, expect, test } from 'vitest';
import { getPlayersFromHTML, getHTMLpage } from '../src/players';

const positiveTestHtml = `

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Sky2Fly - Игра про Небо</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="mrc__share_description" content="«...Отчего люди не летают, как птицы?..» Отчего же не летают? Ещё как летают! Сбылось то, о чём грезил каждый рождённый ходить! В мире Sky2Fly люди живут в небе и парят в облаках наравне с птицами!">
	<link rel="image_src" href="i/enc/logo1.jpg" />
	<link rel="image_src" href="http://sky2fly.ru/i/enc/logo2.jpg" />
    <meta name="description" content="Sky2Fly. Браузерная MMORPG в реальном времени.">
    <meta name="Keywords" content="sky2fly,mmorpg,flash 3d,браузерная,браузерка,rpg,mmo,мморпг,рпг,ммо,игра,game,online,онлайн,небо,sky,полетать,стимпанк,парапанк,паропанк,steampunk,flash gamm,gamm">
    <link rel="stylesheet" type="text/css" href="i/main/min.css">
    <script type="text/javascript" src="i/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="i/main/min.js"></script>
    <script type="text/javascript">
        var r = document.referrer;
        if (r != '' && r.substr(0, 17) != 'http://sky2fly.ru' && document.cookie.indexOf('s2fr=') < 0) {
            document.cookie = "s2fr=" + escape(r) + "; expires=Tue, 19 Jan 2038 23:59:59 GMT; path=/";
        }
        (new Image()).src = "i/main/loading.gif";

		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-25318669-1']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>

</head>
<body onkeydown="kbd(event);">
<div id="content">
    <div id="main">
        <div id="mimg">
            <img src="i/main/birka_RFA_cr.png" alt="RFA winner" style="float: left;">
            <div id="txt"></div>
            <div id="reg"><a href="/promo.html" target="_blank"><img alt="Регистрация" src="i/main/bt_reg.jpg"></a></div>
            <div id="imgs"><span title="Нажмите, чтобы увеличить картинку." onclick="galery(0);"></span><span title="Нажмите, чтобы увеличить картинку." onclick="galery(1);" style="margin: 0 9px 0 9px;"></span><span title="Нажмите, чтобы увеличить картинку." onclick="galery(2);"></span></div>
            <div id="forum"><a href="/cgi-bin/forum.fpl"><img alt="Форум" src="i/main/bt_forum.jpg"></a></div>
            <div id="go"><a href="/download/index.ru.html"><img alt="Играть" src="i/main/bt_go.jpg"></a></div>
            <div id="about"><a href="/book/index.ru.html"><img alt="Об игре" src="i/main/bt_about.jpg"></a></div>
            <div id="ttt">Браузерная стимпанк real-time MMORPG в полном 3D</div>
        </div>
    </div>
    <div id="usrs">
        <div style="padding: 10px;"><a href="http://www.flashgamm.com/moscow2010/ru/" target="_blank"><img src="i/main/logo1game.png" alt="Лучшая игра на Flash GAMM! 2010"></a></div>
        <div id="lki"><a href="http://www.lki.ru" target="_blank"><img src="i/main/Orden_48.png" alt="84%" style="float:right;padding:0 10px;"></a><i>"Небо стоит того, чтобы в нём жить."</i><br>Лучшие компьютерные игры</div>
        <div style="float:right; text-align:left; padding:5px; color:#F89430;">
            Всего пилотов: <!-- users_all -->1000000<!-- /users_all --><br>
            Сейчас в небе: <!-- users_online -->10<!-- /users_online -->
        </div>
        <div style="float:right; padding:5px;">

<!--Rating@Mail.ru counter-->
<script language="javascript" type="text/javascript"><!--
d=document;var a='';a+=';r='+escape(d.referrer);js=10;//--></script>
<script language="javascript1.1" type="text/javascript"><!--
a+=';j='+navigator.javaEnabled();js=11;//--></script>
<script language="javascript1.2" type="text/javascript"><!--
s=screen;a+=';s='+s.width+'*'+s.height;
a+=';d='+(s.colorDepth?s.colorDepth:s.pixelDepth);js=12;//--></script>
<script language="javascript1.3" type="text/javascript"><!--
js=13;//--></script><script language="javascript" type="text/javascript"><!--
d.write('<a href="http://top.mail.ru/jump?from=1623045" target="_top">'+
'<img src="http://d4.cc.b8.a1.top.mail.ru/counter?id=1623045;t=104;js='+js+
a+';rand='+Math.random()+'" alt="Рейтинг@Mail.ru" border="0" '+
'height="18" width="88"><\/a>');if(11<js)d.write('<'+'!-- ');//--></script>
<noscript><a target="_top" href="http://top.mail.ru/jump?from=1623045">
<img src="http://d4.cc.b8.a1.top.mail.ru/counter?js=na;id=1623045;t=104" 
height="18" width="88" border="0" alt="Рейтинг@Mail.ru"></a></noscript>
<script language="javascript" type="text/javascript"><!--
if(11<js)d.write('--'+'>');//--></script>
<!--// Rating@Mail.ru counter-->

        </div>
    </div>
    <script type="text/javascript">
        setbg();
    </script>
</div>

<div id="glry" style="display:none;">
    <div id="overlay" title="Закрыть (Esc)" onclick="closeGlry();"></div>
    <div id="larr">
        <a href="#" onclick="return false;"><img src="i/main/left.png" title="Предыдущая" onclick="prev();" alt="Предыдущая"></a>
    </div>
    <div id="rarr">
        <a href="#" id="nn" onclick="return false;"><img src="i/main/right.png" title="Следующая" onclick="next();" alt="Следующая"></a>
    </div>
    <img id="close" src="i/main/close.png" title="Закрыть" onclick="closeGlry();" alt="Закрыть">
    <img id="gimg" src="i/main/loading.gif" alt="" onclick="next();" title="Следующая">
</div>
</body>
</html>
`;

const negativeTestHtmlWithoutCurrentPlayers = `

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Sky2Fly - Игра про Небо</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="mrc__share_description" content="«...Отчего люди не летают, как птицы?..» Отчего же не летают? Ещё как летают! Сбылось то, о чём грезил каждый рождённый ходить! В мире Sky2Fly люди живут в небе и парят в облаках наравне с птицами!">
	<link rel="image_src" href="i/enc/logo1.jpg" />
	<link rel="image_src" href="http://sky2fly.ru/i/enc/logo2.jpg" />
    <meta name="description" content="Sky2Fly. Браузерная MMORPG в реальном времени.">
    <meta name="Keywords" content="sky2fly,mmorpg,flash 3d,браузерная,браузерка,rpg,mmo,мморпг,рпг,ммо,игра,game,online,онлайн,небо,sky,полетать,стимпанк,парапанк,паропанк,steampunk,flash gamm,gamm">
    <link rel="stylesheet" type="text/css" href="i/main/min.css">
    <script type="text/javascript" src="i/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="i/main/min.js"></script>
    <script type="text/javascript">
        var r = document.referrer;
        if (r != '' && r.substr(0, 17) != 'http://sky2fly.ru' && document.cookie.indexOf('s2fr=') < 0) {
            document.cookie = "s2fr=" + escape(r) + "; expires=Tue, 19 Jan 2038 23:59:59 GMT; path=/";
        }
        (new Image()).src = "i/main/loading.gif";

		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-25318669-1']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>

</head>
<body onkeydown="kbd(event);">
<div id="content">
    <div id="main">
        <div id="mimg">
            <img src="i/main/birka_RFA_cr.png" alt="RFA winner" style="float: left;">
            <div id="txt"></div>
            <div id="reg"><a href="/promo.html" target="_blank"><img alt="Регистрация" src="i/main/bt_reg.jpg"></a></div>
            <div id="imgs"><span title="Нажмите, чтобы увеличить картинку." onclick="galery(0);"></span><span title="Нажмите, чтобы увеличить картинку." onclick="galery(1);" style="margin: 0 9px 0 9px;"></span><span title="Нажмите, чтобы увеличить картинку." onclick="galery(2);"></span></div>
            <div id="forum"><a href="/cgi-bin/forum.fpl"><img alt="Форум" src="i/main/bt_forum.jpg"></a></div>
            <div id="go"><a href="/download/index.ru.html"><img alt="Играть" src="i/main/bt_go.jpg"></a></div>
            <div id="about"><a href="/book/index.ru.html"><img alt="Об игре" src="i/main/bt_about.jpg"></a></div>
            <div id="ttt">Браузерная стимпанк real-time MMORPG в полном 3D</div>
        </div>
    </div>
    <div id="usrs">
        <div style="padding: 10px;"><a href="http://www.flashgamm.com/moscow2010/ru/" target="_blank"><img src="i/main/logo1game.png" alt="Лучшая игра на Flash GAMM! 2010"></a></div>
        <div id="lki"><a href="http://www.lki.ru" target="_blank"><img src="i/main/Orden_48.png" alt="84%" style="float:right;padding:0 10px;"></a><i>"Небо стоит того, чтобы в нём жить."</i><br>Лучшие компьютерные игры</div>
        <div style="float:right; text-align:left; padding:5px; color:#F89430;">
            Всего пилотов: <!-- users_all -->1000000<!-- /users_all --><br>
            Сейчас в небе: <!-- users_online --><!-- /users_online -->
        </div>
        <div style="float:right; padding:5px;">

<!--Rating@Mail.ru counter-->
<script language="javascript" type="text/javascript"><!--
d=document;var a='';a+=';r='+escape(d.referrer);js=10;//--></script>
<script language="javascript1.1" type="text/javascript"><!--
a+=';j='+navigator.javaEnabled();js=11;//--></script>
<script language="javascript1.2" type="text/javascript"><!--
s=screen;a+=';s='+s.width+'*'+s.height;
a+=';d='+(s.colorDepth?s.colorDepth:s.pixelDepth);js=12;//--></script>
<script language="javascript1.3" type="text/javascript"><!--
js=13;//--></script><script language="javascript" type="text/javascript"><!--
d.write('<a href="http://top.mail.ru/jump?from=1623045" target="_top">'+
'<img src="http://d4.cc.b8.a1.top.mail.ru/counter?id=1623045;t=104;js='+js+
a+';rand='+Math.random()+'" alt="Рейтинг@Mail.ru" border="0" '+
'height="18" width="88"><\/a>');if(11<js)d.write('<'+'!-- ');//--></script>
<noscript><a target="_top" href="http://top.mail.ru/jump?from=1623045">
<img src="http://d4.cc.b8.a1.top.mail.ru/counter?js=na;id=1623045;t=104" 
height="18" width="88" border="0" alt="Рейтинг@Mail.ru"></a></noscript>
<script language="javascript" type="text/javascript"><!--
if(11<js)d.write('--'+'>');//--></script>
<!--// Rating@Mail.ru counter-->

        </div>
    </div>
    <script type="text/javascript">
        setbg();
    </script>
</div>

<div id="glry" style="display:none;">
    <div id="overlay" title="Закрыть (Esc)" onclick="closeGlry();"></div>
    <div id="larr">
        <a href="#" onclick="return false;"><img src="i/main/left.png" title="Предыдущая" onclick="prev();" alt="Предыдущая"></a>
    </div>
    <div id="rarr">
        <a href="#" id="nn" onclick="return false;"><img src="i/main/right.png" title="Следующая" onclick="next();" alt="Следующая"></a>
    </div>
    <img id="close" src="i/main/close.png" title="Закрыть" onclick="closeGlry();" alt="Закрыть">
    <img id="gimg" src="i/main/loading.gif" alt="" onclick="next();" title="Следующая">
</div>
</body>
</html>
`;

const negativeTestHtmlWithoutTotalPlayers = `

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Sky2Fly - Игра про Небо</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="mrc__share_description" content="«...Отчего люди не летают, как птицы?..» Отчего же не летают? Ещё как летают! Сбылось то, о чём грезил каждый рождённый ходить! В мире Sky2Fly люди живут в небе и парят в облаках наравне с птицами!">
	<link rel="image_src" href="i/enc/logo1.jpg" />
	<link rel="image_src" href="http://sky2fly.ru/i/enc/logo2.jpg" />
    <meta name="description" content="Sky2Fly. Браузерная MMORPG в реальном времени.">
    <meta name="Keywords" content="sky2fly,mmorpg,flash 3d,браузерная,браузерка,rpg,mmo,мморпг,рпг,ммо,игра,game,online,онлайн,небо,sky,полетать,стимпанк,парапанк,паропанк,steampunk,flash gamm,gamm">
    <link rel="stylesheet" type="text/css" href="i/main/min.css">
    <script type="text/javascript" src="i/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="i/main/min.js"></script>
    <script type="text/javascript">
        var r = document.referrer;
        if (r != '' && r.substr(0, 17) != 'http://sky2fly.ru' && document.cookie.indexOf('s2fr=') < 0) {
            document.cookie = "s2fr=" + escape(r) + "; expires=Tue, 19 Jan 2038 23:59:59 GMT; path=/";
        }
        (new Image()).src = "i/main/loading.gif";

		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-25318669-1']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>

</head>
<body onkeydown="kbd(event);">
<div id="content">
    <div id="main">
        <div id="mimg">
            <img src="i/main/birka_RFA_cr.png" alt="RFA winner" style="float: left;">
            <div id="txt"></div>
            <div id="reg"><a href="/promo.html" target="_blank"><img alt="Регистрация" src="i/main/bt_reg.jpg"></a></div>
            <div id="imgs"><span title="Нажмите, чтобы увеличить картинку." onclick="galery(0);"></span><span title="Нажмите, чтобы увеличить картинку." onclick="galery(1);" style="margin: 0 9px 0 9px;"></span><span title="Нажмите, чтобы увеличить картинку." onclick="galery(2);"></span></div>
            <div id="forum"><a href="/cgi-bin/forum.fpl"><img alt="Форум" src="i/main/bt_forum.jpg"></a></div>
            <div id="go"><a href="/download/index.ru.html"><img alt="Играть" src="i/main/bt_go.jpg"></a></div>
            <div id="about"><a href="/book/index.ru.html"><img alt="Об игре" src="i/main/bt_about.jpg"></a></div>
            <div id="ttt">Браузерная стимпанк real-time MMORPG в полном 3D</div>
        </div>
    </div>
    <div id="usrs">
        <div style="padding: 10px;"><a href="http://www.flashgamm.com/moscow2010/ru/" target="_blank"><img src="i/main/logo1game.png" alt="Лучшая игра на Flash GAMM! 2010"></a></div>
        <div id="lki"><a href="http://www.lki.ru" target="_blank"><img src="i/main/Orden_48.png" alt="84%" style="float:right;padding:0 10px;"></a><i>"Небо стоит того, чтобы в нём жить."</i><br>Лучшие компьютерные игры</div>
        <div style="float:right; text-align:left; padding:5px; color:#F89430;">
            Всего пилотов: <!-- users_all --><!-- /users_all --><br>
            Сейчас в небе: <!-- users_online -->1<!-- /users_online -->
        </div>
        <div style="float:right; padding:5px;">

<!--Rating@Mail.ru counter-->
<script language="javascript" type="text/javascript"><!--
d=document;var a='';a+=';r='+escape(d.referrer);js=10;//--></script>
<script language="javascript1.1" type="text/javascript"><!--
a+=';j='+navigator.javaEnabled();js=11;//--></script>
<script language="javascript1.2" type="text/javascript"><!--
s=screen;a+=';s='+s.width+'*'+s.height;
a+=';d='+(s.colorDepth?s.colorDepth:s.pixelDepth);js=12;//--></script>
<script language="javascript1.3" type="text/javascript"><!--
js=13;//--></script><script language="javascript" type="text/javascript"><!--
d.write('<a href="http://top.mail.ru/jump?from=1623045" target="_top">'+
'<img src="http://d4.cc.b8.a1.top.mail.ru/counter?id=1623045;t=104;js='+js+
a+';rand='+Math.random()+'" alt="Рейтинг@Mail.ru" border="0" '+
'height="18" width="88"><\/a>');if(11<js)d.write('<'+'!-- ');//--></script>
<noscript><a target="_top" href="http://top.mail.ru/jump?from=1623045">
<img src="http://d4.cc.b8.a1.top.mail.ru/counter?js=na;id=1623045;t=104" 
height="18" width="88" border="0" alt="Рейтинг@Mail.ru"></a></noscript>
<script language="javascript" type="text/javascript"><!--
if(11<js)d.write('--'+'>');//--></script>
<!--// Rating@Mail.ru counter-->

        </div>
    </div>
    <script type="text/javascript">
        setbg();
    </script>
</div>

<div id="glry" style="display:none;">
    <div id="overlay" title="Закрыть (Esc)" onclick="closeGlry();"></div>
    <div id="larr">
        <a href="#" onclick="return false;"><img src="i/main/left.png" title="Предыдущая" onclick="prev();" alt="Предыдущая"></a>
    </div>
    <div id="rarr">
        <a href="#" id="nn" onclick="return false;"><img src="i/main/right.png" title="Следующая" onclick="next();" alt="Следующая"></a>
    </div>
    <img id="close" src="i/main/close.png" title="Закрыть" onclick="closeGlry();" alt="Закрыть">
    <img id="gimg" src="i/main/loading.gif" alt="" onclick="next();" title="Следующая">
</div>
</body>
</html>
`;

const negativeTestHtmlWithoutBothPlayers = `

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Sky2Fly - Игра про Небо</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="mrc__share_description" content="«...Отчего люди не летают, как птицы?..» Отчего же не летают? Ещё как летают! Сбылось то, о чём грезил каждый рождённый ходить! В мире Sky2Fly люди живут в небе и парят в облаках наравне с птицами!">
	<link rel="image_src" href="i/enc/logo1.jpg" />
	<link rel="image_src" href="http://sky2fly.ru/i/enc/logo2.jpg" />
    <meta name="description" content="Sky2Fly. Браузерная MMORPG в реальном времени.">
    <meta name="Keywords" content="sky2fly,mmorpg,flash 3d,браузерная,браузерка,rpg,mmo,мморпг,рпг,ммо,игра,game,online,онлайн,небо,sky,полетать,стимпанк,парапанк,паропанк,steampunk,flash gamm,gamm">
    <link rel="stylesheet" type="text/css" href="i/main/min.css">
    <script type="text/javascript" src="i/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="i/main/min.js"></script>
    <script type="text/javascript">
        var r = document.referrer;
        if (r != '' && r.substr(0, 17) != 'http://sky2fly.ru' && document.cookie.indexOf('s2fr=') < 0) {
            document.cookie = "s2fr=" + escape(r) + "; expires=Tue, 19 Jan 2038 23:59:59 GMT; path=/";
        }
        (new Image()).src = "i/main/loading.gif";

		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-25318669-1']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>

</head>
<body onkeydown="kbd(event);">
<div id="content">
    <div id="main">
        <div id="mimg">
            <img src="i/main/birka_RFA_cr.png" alt="RFA winner" style="float: left;">
            <div id="txt"></div>
            <div id="reg"><a href="/promo.html" target="_blank"><img alt="Регистрация" src="i/main/bt_reg.jpg"></a></div>
            <div id="imgs"><span title="Нажмите, чтобы увеличить картинку." onclick="galery(0);"></span><span title="Нажмите, чтобы увеличить картинку." onclick="galery(1);" style="margin: 0 9px 0 9px;"></span><span title="Нажмите, чтобы увеличить картинку." onclick="galery(2);"></span></div>
            <div id="forum"><a href="/cgi-bin/forum.fpl"><img alt="Форум" src="i/main/bt_forum.jpg"></a></div>
            <div id="go"><a href="/download/index.ru.html"><img alt="Играть" src="i/main/bt_go.jpg"></a></div>
            <div id="about"><a href="/book/index.ru.html"><img alt="Об игре" src="i/main/bt_about.jpg"></a></div>
            <div id="ttt">Браузерная стимпанк real-time MMORPG в полном 3D</div>
        </div>
    </div>
    <div id="usrs">
        <div style="padding: 10px;"><a href="http://www.flashgamm.com/moscow2010/ru/" target="_blank"><img src="i/main/logo1game.png" alt="Лучшая игра на Flash GAMM! 2010"></a></div>
        <div id="lki"><a href="http://www.lki.ru" target="_blank"><img src="i/main/Orden_48.png" alt="84%" style="float:right;padding:0 10px;"></a><i>"Небо стоит того, чтобы в нём жить."</i><br>Лучшие компьютерные игры</div>
        <div style="float:right; text-align:left; padding:5px; color:#F89430;">
            Всего пилотов: <!-- users_all --><!-- /users_all --><br>
            Сейчас в небе: <!-- users_online --><!-- /users_online -->
        </div>
        <div style="float:right; padding:5px;">

<!--Rating@Mail.ru counter-->
<script language="javascript" type="text/javascript"><!--
d=document;var a='';a+=';r='+escape(d.referrer);js=10;//--></script>
<script language="javascript1.1" type="text/javascript"><!--
a+=';j='+navigator.javaEnabled();js=11;//--></script>
<script language="javascript1.2" type="text/javascript"><!--
s=screen;a+=';s='+s.width+'*'+s.height;
a+=';d='+(s.colorDepth?s.colorDepth:s.pixelDepth);js=12;//--></script>
<script language="javascript1.3" type="text/javascript"><!--
js=13;//--></script><script language="javascript" type="text/javascript"><!--
d.write('<a href="http://top.mail.ru/jump?from=1623045" target="_top">'+
'<img src="http://d4.cc.b8.a1.top.mail.ru/counter?id=1623045;t=104;js='+js+
a+';rand='+Math.random()+'" alt="Рейтинг@Mail.ru" border="0" '+
'height="18" width="88"><\/a>');if(11<js)d.write('<'+'!-- ');//--></script>
<noscript><a target="_top" href="http://top.mail.ru/jump?from=1623045">
<img src="http://d4.cc.b8.a1.top.mail.ru/counter?js=na;id=1623045;t=104" 
height="18" width="88" border="0" alt="Рейтинг@Mail.ru"></a></noscript>
<script language="javascript" type="text/javascript"><!--
if(11<js)d.write('--'+'>');//--></script>
<!--// Rating@Mail.ru counter-->

        </div>
    </div>
    <script type="text/javascript">
        setbg();
    </script>
</div>

<div id="glry" style="display:none;">
    <div id="overlay" title="Закрыть (Esc)" onclick="closeGlry();"></div>
    <div id="larr">
        <a href="#" onclick="return false;"><img src="i/main/left.png" title="Предыдущая" onclick="prev();" alt="Предыдущая"></a>
    </div>
    <div id="rarr">
        <a href="#" id="nn" onclick="return false;"><img src="i/main/right.png" title="Следующая" onclick="next();" alt="Следующая"></a>
    </div>
    <img id="close" src="i/main/close.png" title="Закрыть" onclick="closeGlry();" alt="Закрыть">
    <img id="gimg" src="i/main/loading.gif" alt="" onclick="next();" title="Следующая">
</div>
</body>
</html>
`;

describe('Players fetch tests', () => {
    test('getPlayersFromHTML positive', () => {
        const playersExpected = {
            tr: 1000000,
            pn: 10
        }
        const playersReal = getPlayersFromHTML(positiveTestHtml);

        expect(playersReal).toStrictEqual(playersExpected);
    });

    test('getPlayersFromHTML without current players', () => {
        expect(() => getPlayersFromHTML(negativeTestHtmlWithoutCurrentPlayers)).toThrowError('Could not read players from html');
    });

    test('getPlayersFromHTML without total players', () => {
        expect(() => getPlayersFromHTML(negativeTestHtmlWithoutTotalPlayers)).toThrowError('Could not read players from html');
    });

    test('getPlayersFromHTML without both players', () => {
        expect(() => getPlayersFromHTML(negativeTestHtmlWithoutBothPlayers)).toThrowError('Could not read players from html');
    });

    test('Fetch wrong url', () => {
        expect(getHTMLpage('localhost')).rejects.toThrow();
    });
});
