<?php
date_default_timezone_set("Asia/Shanghai");

$db_conf = array(
	'driver' => 'mysql',
	'persistent' => false,
	'host' => '127.0.0.1',
	'usr' => 'zouliming',
	'pass' => 'caozuo',
	'database' => 'calendar',
	'encoding' => "utf8"
);

#================================================================
#===路径配置
define("SEP",substr(PHP_OS,0,3)=='WIN'?"\\":"/");
define('ROOT',dirname(__FILE__).SEP);
define('PATH_LIB' ,'lib'.SEP);
define('PATH_MOD','mod'.SEP);
define('PATH_VIEW','tmpl'.SEP);
define('PATH_CACHE','cache'.SEP);
define('PATH_LANG','lang'.SEP);


require_once(ROOT.PATH_LIB.'common.php');
$tmp=guess_webroot();
define('WEBROOT',$tmp[0]);
define('SCRIPT_NAME',$tmp[1]);
chdir(ROOT);


#================================================================
#===加载其他系统模块
require_once(ROOT.PATH_LIB.'EasyDBAccess.php');
require_once(ROOT.PATH_LIB.'EasyTemplate.php');
require_once(ROOT.PATH_LIB.'util.php');
?>