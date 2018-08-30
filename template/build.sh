#!/usr/bin/env bash
export PATH=/home/her/.jumbo/bin:$PATH;

dirname=`pwd`;

modulename=`basename $dirname`;
cd output;
mkdir config;
cat >config/xss.php <<EOF_XSS_PHP
<?php
    return array(
        //基本配置区域，建议用utf-8编码保存本文件。当然使用gbk也无影响。
        'TPL_LEFT_DELIMITER'        => '<%',                    //smarty左界符
        'TPL_RIGHT_DELIMITER'       => '%>',                    //smarty右界符
        'TPL_SUFFIX'                => 'tpl',                   //模板文件扩展名
        'func_name_callback'        => '/callback/',            //回调函数名，$callback(json)，正则匹配，防止多个变量名，不需要则可以关闭check_callback
        'name_callback'             => 'callback',              //smarty.get.callback(json)，不需要则可以关闭check_callback

        //添加各场景开关检查功能，on 或者 off，默认为on，即全部要检查
        'check_callback'            => 'on',
        'check_html'                => 'on',
        'check_js'                  => 'on',
        'check_data'                => 'on',
        'check_path'                => 'off',
        'check_event'               => 'on',

        //各场景对应的安全转义函数，正则配置
        'escape_js'                 => '/f_escape_js|escape:("|\'?)javascript\1/',                                           //js转义函数配置
        'escape_html'               => '/f_escape_xml|escape:("|\'?)html\1|(escape$)|(escape\|)|f_escape_js/',                       //html转义函数配置
        'escape_event'              => '/f_escape_event|escape:("|\'?)javascript\1\|escape:("|\'?)html\2/',                   //标签事件属性值场景转义函数配置
        'escape_data'               => '/f_escape_data/',                                                                   //json数据转义配置
        'escape_path'               => '/f_escape_path|escape:("|\'?)url\1|escape:("|\'?)html\2|(escape$)|(escape\|)/',              //url属性里转义
        'escape_callback'           => '/f_escape_callback/',                                                           //callback最小化转义

        //如果某个特定变量不需要转义，可以加上|escape:none ，正则配置
        'noescape'                  => '/escape:[\'|\"]?none[\'|\"]?/',
        //全局白名单，变量名与正则匹配则可信，不对其进行检查
        'XSS_SAFE_VAR'             => array(),
        //精确白名单，某特定文件名，或其内某个变量是完全可信的
        'file_safe_var'            =>array()
    );
EOF_XSS_PHP

tar -czf "../static-hao123_online.tar.gz" resource;
RETVAL=$?;
[ ${RETVAL} -gt 0 ] && echo "build resources failed!" && exit ${RETVAL};
rm -rf resource;

tar -czf "../${modulename}.tar.gz" *;
RETVAL=$?;
[ ${RETVAL} -gt 0 ] && echo "build template failed!" && exit ${RETVAL};
rm -rf *;

mv "../static-hao123_online.tar.gz" .;
mv "../${modulename}.tar.gz" .;

echo "Build Success!";
exit 0;
