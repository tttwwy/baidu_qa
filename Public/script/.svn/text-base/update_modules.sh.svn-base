#!/bin/bash

#set -x

svn_base="https://svn-ci.baidu.com/app/search/superpage/trunk"
check_path="http://svn.baidu.com:8000/svnlogistics/MatcherServlet.action?path=app/search/superpage"

source ~/.bash_profile >/dev/null 2>&1
#modules=$(svn ls $svn_path $tmp_svn --username zhangxiaodong01 --password 123456 --non-interactive)

function getModInfo(){
    local svn_path=$1
    stat=$(curl ${check_path}/${svn_path})
    case $stat in
        3)  for mod in $(svn ls $svn_base/${svn_path}  --username zhangxiaodong01 --password 123456 --non-interactive)
            do
                getModInfo $svn_path${mod}
            done 
        ;;
        2)  a[$i]=${svn_path%/}
            ((i=$i+1))
        ;;
        0,1,*);;
    esac
}

#a=[];
i=0;
for module in $(svn ls $svn_base --username zhangxiaodong01 --password 123456 --non-interactive);do
    getModInfo $module
done

#TODO: wait for databases created to finish this function
function addModule(){
    mod_name=$1
#    sql=
	#TODO:
	echo $mod_name
}

for mod in "${a[@]}";do
    addModule ${mod}
done
