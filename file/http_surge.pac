﻿[General]
skip-proxy = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, 100.64.0.0/10, localhost, *.local
bypass-tun = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12
loglevel = notify

[Proxy]
socks50 = socks5,95.110.161.17,14486
socks51 = socks5,50.63.167.72,17774
socks52 = socks5,46.8.32.238,8080
socks53 = socks5,80.211.186.30,1080
socks54 = socks5,34.229.62.113,1080
socks55 = socks5,95.110.186.48,21935
socks56 = socks5,98.162.25.29,31679
socks57 = socks5,181.225.100.21,39880
socks58 = socks5,149.202.38.124,32321
socks59 = socks5,50.3.82.4,1080
socks510 = socks5,50.63.167.72,8394
socks511 = socks5,67.205.174.209,1080
socks512 = socks5,50.63.153.173,52721
socks513 = socks5,212.19.134.166,2016
socks514 = socks5,76.16.120.118,4100
socks515 = socks5,37.59.8.29,59318
socks516 = socks5,5.160.139.164,1080
socks517 = socks5,95.110.224.30,15608
socks518 = socks5,50.63.167.72,62403
socks519 = socks5,36.7.111.92,1080
socks520 = socks5,95.110.186.48,41756
socks521 = socks5,50.63.167.72,11715
socks522 = socks5,189.123.67.191,65000
socks523 = socks5,177.54.148.29,1883
Socks1 = custom,ss.isfrom.club,3006,aes-256-cfb,chaowen@chen,http://7xpt4s.com1.z0.glb.clouddn.com/SSEncrypt.module

[Proxy Group]
Proxy = url-test, socks50 ,socks51 ,socks52 ,socks53 ,socks54 ,socks55 ,socks56 ,socks57 ,socks58 ,socks59 ,socks510 ,socks511 ,socks512 ,socks513 ,socks514 ,socks515 ,socks516 ,socks517 ,socks518 ,socks519 ,socks520 ,socks521 ,socks522 ,socks523 , url = http://www.google.com/generate_204
Socks_Proxy = url-test, Socks1 , url = http://www.google.com/generate_204

[Rule]
DOMAIN-SUFFIX,ad.sina.com.cn,REJECT
DOMAIN-SUFFIX,adm.leju.sina.com.cn,REJECT
DOMAIN-SUFFIX,atm.sina.com,REJECT
DOMAIN-SUFFIX,beacon.sina.com.cn,REJECT
DOMAIN-SUFFIX,dcads.sina.com.cn,REJECT
DOMAIN-SUFFIX,sax.sina.cn,REJECT
DOMAIN-SUFFIX,sax.sina.com.cn,REJECT
DOMAIN-SUFFIX,tjs.sjs.sinajs.cn,REJECT
DOMAIN-SUFFIX,act.qq.com,REJECT
DOMAIN-SUFFIX,adsfile.qq.com,REJECT
DOMAIN-SUFFIX,beacon.qq.com,REJECT
DOMAIN-SUFFIX,e.qq.com,REJECT
DOMAIN-SUFFIX,gdt.qq.com,REJECT
DOMAIN-SUFFIX,l.qq.com,REJECT
DOMAIN-SUFFIX,monitor.uu.qq.com,REJECT
DOMAIN-SUFFIX,pgdt.gtimg.cn,REJECT
DOMAIN-SUFFIX,pingjs.qq.com,REJECT
DOMAIN-SUFFIX,pingma.qq.com,REJECT
DOMAIN-SUFFIX,pingtcss.qq.com,REJECT
DOMAIN-SUFFIX,report.qq.com,REJECT
DOMAIN-SUFFIX,tajs.qq.com,REJECT
DOMAIN-SUFFIX,tcss.qq.com,REJECT
DOMAIN-SUFFIX,3600.com,REJECT
DOMAIN-SUFFIX,dev.tg.wan.360.cn,REJECT
DOMAIN-SUFFIX,f.360.cn,REJECT
DOMAIN-SUFFIX,kuaikan.netmon.360safe.com,REJECT
DOMAIN-SUFFIX,leak.360.cn,REJECT
DOMAIN-SUFFIX,openbox.mobilem.360.cn,REJECT
DOMAIN-SUFFIX,pub.se.360.cn,REJECT
DOMAIN-SUFFIX,soft.data.weather.360.cn,REJECT
DOMAIN-SUFFIX,stat.360safe.com,REJECT
DOMAIN-SUFFIX,stat.m.360.cn,REJECT
DOMAIN-SUFFIX,update.360safe.com,REJECT
DOMAIN-SUFFIX,adgeo.163.com,REJECT
DOMAIN-SUFFIX,bobo.163.com,REJECT
DOMAIN-SUFFIX,fa.163.com,REJECT
DOMAIN-SUFFIX,g.163.com,REJECT
DOMAIN-SUFFIX,gb.corp.163.com,REJECT
DOMAIN-SUFFIX,oadz.com,REJECT
DOMAIN-SUFFIX,oimagea2.ydstatic.com,REJECT
DOMAIN-SUFFIX,pagechoice.net,REJECT
DOMAIN-SUFFIX,prom.gome.com.cn,REJECT
DOMAIN-SUFFIX,rlogs.youdao.com,REJECT
DOMAIN-SUFFIX,static.flv.uuzuonline.com,REJECT
DOMAIN-SUFFIX,wanproxy.127.net,REJECT
DOMAIN-SUFFIX,ws.126.net,REJECT
DOMAIN-SUFFIX,actives.youku.com,REJECT
DOMAIN-SUFFIX,ad.api.3g.tudou.com,REJECT
DOMAIN-SUFFIX,ad.api.3g.youku.com,REJECT
DOMAIN-SUFFIX,ad.m.iqiyi.com,REJECT
DOMAIN-SUFFIX,adcontrol.tudou.com,REJECT
DOMAIN-SUFFIX,adplay.tudou.com,REJECT
DOMAIN-SUFFIX,afp.qiyi.com,REJECT
DOMAIN-SUFFIX,agn.aty.sohu.com,REJECT
DOMAIN-SUFFIX,ark.letv.com,REJECT
DOMAIN-SUFFIX,asimgs.pplive.cn,REJECT
DOMAIN-SUFFIX,atanx.alicdn.com,REJECT
DOMAIN-SUFFIX,atm.youku.com,REJECT
DOMAIN-SUFFIX,c.yes.youku.com,REJECT
DOMAIN-SUFFIX,cc.xtgreat.com,REJECT
DOMAIN-SUFFIX,cm.zhiziyun.com,REJECT
DOMAIN-SUFFIX,cupid.iqiyi.com,REJECT
DOMAIN-SUFFIX,cupid.qiyi.com,REJECT
DOMAIN-SUFFIX,d.dsp.imageter.com,REJECT
DOMAIN-SUFFIX,dc.letv.com,REJECT
DOMAIN-SUFFIX,de.as.pptv.com,REJECT
DOMAIN-SUFFIX,g.uusee.com,REJECT
DOMAIN-SUFFIX,gug.ku6cdn.com,REJECT
DOMAIN-SUFFIX,ifacelog.iqiyi.com,REJECT
DOMAIN-SUFFIX,iwstat.tudou.com,REJECT
DOMAIN-SUFFIX,kwflvcdn.000dn.com,REJECT
DOMAIN-SUFFIX,lives.l.qq.com,REJECT
DOMAIN-SUFFIX,logger.baofeng.com,REJECT
DOMAIN-SUFFIX,logstat.t.sfht.com,REJECT
DOMAIN-SUFFIX,lstat.youku.com,REJECT
DOMAIN-SUFFIX,lvip.youku.com,REJECT
DOMAIN-SUFFIX,m.aty.sohu.com,REJECT
DOMAIN-SUFFIX,msg.71.am,REJECT
DOMAIN-SUFFIX,match.rtbidder.net,REJECT
DOMAIN-SUFFIX,n-st.vip.com,REJECT
DOMAIN-SUFFIX,n.mark.letv.com,REJECT
DOMAIN-SUFFIX,nstat.tudou.com,REJECT
DOMAIN-SUFFIX,p-log.ykimg.com,REJECT
DOMAIN-SUFFIX,p.l.qq.com,REJECT
DOMAIN-SUFFIX,p.l.ykimg.com,REJECT
DOMAIN-SUFFIX,p.l.youku.com,REJECT
DOMAIN-SUFFIX,pics.taobaocdn.com,REJECT
DOMAIN-SUFFIX,pop.uusee.com,REJECT
DOMAIN-SUFFIX,pq.stat.ku6.com,REJECT
DOMAIN-SUFFIX,pv.sohu.com,REJECT
DOMAIN-SUFFIX,r.l.youku.com,REJECT
DOMAIN-SUFFIX,rcd.iqiyi.com,REJECT
DOMAIN-SUFFIX,rtb.behe.com,REJECT
DOMAIN-SUFFIX,show.re.taobao.com,REJECT
DOMAIN-SUFFIX,shrek.6.cn,REJECT
DOMAIN-SUFFIX,simba.6.cn,REJECT
DOMAIN-SUFFIX,st.vq.ku6.cn,REJECT
DOMAIN-SUFFIX,stat.tudou.com,REJECT
DOMAIN-SUFFIX,stat.youku.com,REJECT
DOMAIN-SUFFIX,static.g.ppstream.com,REJECT
DOMAIN-SUFFIX,static.ku6.com,REJECT
DOMAIN-SUFFIX,static.lstat.youku.com,REJECT
DOMAIN-SUFFIX,stats.tudou.com,REJECT
DOMAIN-SUFFIX,strip.taobaocdn.com,REJECT
DOMAIN-SUFFIX,stuff.cdn.biddingx.com,REJECT
DOMAIN-SUFFIX,t.cr-nielsen.com,REJECT
DOMAIN-SUFFIX,tns.simba.taobao.com,REJECT
DOMAIN-SUFFIX,traffic.uusee.com,REJECT
DOMAIN-SUFFIX,union.6.cn,REJECT
IP-CIDR,123.125.117.0/22,REJECT,no-resolve
DOMAIN-KEYWORD,facebook,Proxy,force-remote-dns
DOMAIN-KEYWORD,gmail,Proxy,force-remote-dns
DOMAIN-KEYWORD,google,Proxy,force-remote-dns
DOMAIN-KEYWORD,instagram,Proxy,force-remote-dns
DOMAIN-KEYWORD,twitter,Proxy,force-remote-dns
DOMAIN-KEYWORD,youtube,Proxy,force-remote-dns
DOMAIN-SUFFIX,t.co,Proxy,force-remote-dns
DOMAIN-SUFFIX,twimg.com,Proxy,force-remote-dns
DOMAIN-KEYWORD,jackd,Proxy,force-remote-dns
DOMAIN-SUFFIX,scdn.co,Proxy,force-remote-dns
DOMAIN-KEYWORD,akamaihd,Proxy,force-remote-dns
DOMAIN-SUFFIX,cdninstagram.com,Proxy,force-remote-dns
DOMAIN-SUFFIX,line-cdn.net,Proxy
DOMAIN-SUFFIX,line-apps.com,Proxy
DOMAIN-SUFFIX,line.me,Proxy
DOMAIN-SUFFIX,line.naver.jp,Proxy
DOMAIN-SUFFIX,netflix.com,Proxy
DOMAIN-SUFFIX,netflix.net,Proxy
DOMAIN-SUFFIX,nflxext.com,Proxy
DOMAIN-SUFFIX,nflximg.com,Proxy
DOMAIN-SUFFIX,nflximg.net,Proxy
DOMAIN-SUFFIX,nflxvideo.net,Proxy
DOMAIN-KEYWORD,amazon,Proxy
DOMAIN-KEYWORD,appledaily,Proxy
DOMAIN-KEYWORD,blogspot,Proxy
DOMAIN-KEYWORD,dropbox,Proxy
DOMAIN-SUFFIX,4sqi.net,Proxy
DOMAIN-SUFFIX,amplitude.com,Proxy
DOMAIN-SUFFIX,android.com,Proxy
DOMAIN-SUFFIX,angularjs.org,Proxy
DOMAIN-SUFFIX,apple-dns.net,Proxy
DOMAIN-SUFFIX,appspot.com,Proxy
DOMAIN-SUFFIX,att.com,Proxy
DOMAIN-SUFFIX,azurewebsites.net,Proxy
DOMAIN-SUFFIX,bit.ly,Proxy
DOMAIN-SUFFIX,bitbucket.org,Proxy
DOMAIN-SUFFIX,blog.com,Proxy
DOMAIN-SUFFIX,blogcdn.com,Proxy
DOMAIN-SUFFIX,blogger.com,Proxy
DOMAIN-SUFFIX,blogsmithmedia.com,Proxy
DOMAIN-SUFFIX,bloomberg.com,Proxy
DOMAIN-SUFFIX,box.net,Proxy
DOMAIN-SUFFIX,chromium.org,Proxy
DOMAIN-SUFFIX,cl.ly,Proxy
DOMAIN-SUFFIX,cloudflare.com,Proxy
DOMAIN-SUFFIX,cloudfront.net,Proxy
DOMAIN-SUFFIX,cloudmagic.com,Proxy
DOMAIN-SUFFIX,cocoapods.org,Proxy
DOMAIN-SUFFIX,crashlytics.com,Proxy
DOMAIN-SUFFIX,d.pr,Proxy
DOMAIN-SUFFIX,dayone.me,Proxy
DOMAIN-SUFFIX,droplr.com,Proxy
DOMAIN-SUFFIX,digicert.com,Proxy
DOMAIN-SUFFIX,dnsimple.com,Proxy
DOMAIN-SUFFIX,docker.com,Proxy
DOMAIN-SUFFIX,dribbble.com,Proxy
DOMAIN-SUFFIX,duckduckgo.com,Proxy
DOMAIN-SUFFIX,edgecastcdn.net,Proxy
DOMAIN-SUFFIX,edgesuite.net,Proxy
DOMAIN-SUFFIX,engadget.com,Proxy
DOMAIN-SUFFIX,eurekavpt.com,Proxy
DOMAIN-SUFFIX,evernote.com,Proxy
DOMAIN-SUFFIX,fabric.io,Proxy
DOMAIN-SUFFIX,fastly.net,Proxy
DOMAIN-SUFFIX,fb.me,Proxy
DOMAIN-SUFFIX,fbcdn.net,Proxy
DOMAIN-SUFFIX,fc2.com,Proxy
DOMAIN-SUFFIX,feedburner.com,Proxy
DOMAIN-SUFFIX,feedly.com,Proxy
DOMAIN-SUFFIX,feedsportal.com,Proxy
DOMAIN-SUFFIX,flickr.com,Proxy
DOMAIN-SUFFIX,g.co,Proxy
DOMAIN-SUFFIX,ggpht.com,Proxy
DOMAIN-SUFFIX,git.io,Proxy
DOMAIN-SUFFIX,github.com,Proxy
DOMAIN-SUFFIX,github.io,Proxy
DOMAIN-SUFFIX,githubusercontent.com,Proxy
DOMAIN-SUFFIX,godaddy.com,Proxy
DOMAIN-SUFFIX,golang.org,Proxy
DOMAIN-SUFFIX,goo.gl,Proxy
DOMAIN-SUFFIX,goodreaders.com,Proxy
DOMAIN-SUFFIX,goodreads.com,Proxy
DOMAIN-SUFFIX,gravatar.com,Proxy
DOMAIN-SUFFIX,gstatic.com,Proxy
DOMAIN-SUFFIX,ift.tt,Proxy
DOMAIN-SUFFIX,imageshack.us,Proxy
DOMAIN-SUFFIX,img.ly,Proxy
DOMAIN-SUFFIX,imgur.com,Proxy
DOMAIN-SUFFIX,instapaper.com,Proxy
DOMAIN-SUFFIX,ipn.li,Proxy
DOMAIN-SUFFIX,is.gd,Proxy
DOMAIN-SUFFIX,itun.es,Proxy
DOMAIN-SUFFIX,j.mp,Proxy
DOMAIN-SUFFIX,jshint.com,Proxy
DOMAIN-SUFFIX,kat.cr,Proxy
DOMAIN-SUFFIX,libsyn.com,Proxy
DOMAIN-SUFFIX,licdn.com,Proxy
DOMAIN-SUFFIX,linkedin.com,Proxy
DOMAIN-SUFFIX,linode.com,Proxy
DOMAIN-SUFFIX,lithium.com,Proxy
DOMAIN-SUFFIX,live.com,Proxy
DOMAIN-SUFFIX,live.net,Proxy
DOMAIN-SUFFIX,mathjax.org,Proxy
DOMAIN-SUFFIX,medium.com,Proxy
DOMAIN-SUFFIX,megaupload.com,Proxy
DOMAIN-SUFFIX,microsoft.com,DIRECT
DOMAIN-SUFFIX,mobile01.com,Proxy
DOMAIN-SUFFIX,modmyi.com,Proxy
DOMAIN-SUFFIX,name.com,Proxy
DOMAIN-SUFFIX,nextmedia.com,Proxy
DOMAIN-SUFFIX,nyt.com,Proxy
DOMAIN-SUFFIX,nytimes.com,Proxy
DOMAIN-SUFFIX,omnigroup.com,Proxy
DOMAIN-SUFFIX,onenote.com,Proxy
DOMAIN-SUFFIX,openvpn.net,Proxy
DOMAIN-SUFFIX,openwrt.org,Proxy
DOMAIN-SUFFIX,ow.ly,Proxy
DOMAIN-SUFFIX,periscope.tv,Proxy
DOMAIN-SUFFIX,playpcesor.com,Proxy
DOMAIN-SUFFIX,pinboard.in,Proxy
DOMAIN-SUFFIX,qdaily.com,Proxy
DOMAIN-SUFFIX,scdn.co,Proxy
DOMAIN-SUFFIX,skype.com,Proxy
DOMAIN-SUFFIX,smartmailcloud.com,Proxy
DOMAIN-SUFFIX,sndcdn.com,Proxy
DOMAIN-SUFFIX,soundcloud.com,Proxy
DOMAIN-SUFFIX,spotify.com,Proxy
DOMAIN-SUFFIX,squarespace.com,Proxy
DOMAIN-SUFFIX,sstatic.net,Proxy
DOMAIN-SUFFIX,stackoverflow.com,Proxy
DOMAIN-SUFFIX,staticflickr.com,Proxy
DOMAIN-SUFFIX,symauth.com,Proxy
DOMAIN-SUFFIX,symcb.com,Proxy
DOMAIN-SUFFIX,symcd.com,Proxy
DOMAIN-SUFFIX,tapbots.com,Proxy
DOMAIN-SUFFIX,tapbots.net,Proxy
DOMAIN-SUFFIX,techcrunch.com,Proxy
DOMAIN-SUFFIX,thepiratebay.org,Proxy
DOMAIN-SUFFIX,tiny.cc,Proxy
DOMAIN-SUFFIX,tinypic.com,Proxy
DOMAIN-SUFFIX,tmblr.co,Proxy
DOMAIN-SUFFIX,tumblr.com,Proxy
DOMAIN-SUFFIX,twitch.tv,Proxy
DOMAIN-SUFFIX,txmblr.com,Proxy
DOMAIN-SUFFIX,typekit.net,Proxy
DOMAIN-SUFFIX,ubnt.com,Proxy
DOMAIN-SUFFIX,urchin.com,Proxy
DOMAIN-SUFFIX,v.gd,Proxy
DOMAIN-SUFFIX,vimeo.com,Proxy
DOMAIN-SUFFIX,vine.co,Proxy
DOMAIN-SUFFIX,vsco.co,Proxy
DOMAIN-SUFFIX,weather.com,Proxy
DOMAIN-SUFFIX,wikimedia.org,Proxy
DOMAIN-SUFFIX,wikipedia.com,Proxy
DOMAIN-SUFFIX,wikipedia.org,Proxy
DOMAIN-SUFFIX,windows.net,Proxy
DOMAIN-SUFFIX,wordpress.com,Proxy
DOMAIN-SUFFIX,wp.com,Proxy
DOMAIN-SUFFIX,wsj.com,Proxy
DOMAIN-SUFFIX,wsj.net,Proxy
DOMAIN-SUFFIX,yahoo.com,Proxy
DOMAIN-SUFFIX,youtu.be,Proxy
DOMAIN-SUFFIX,ytimg.com,Proxy
IP-CIDR,91.108.56.0/22,Proxy,no-resolve
IP-CIDR,91.108.4.0/22,Proxy,no-resolve
IP-CIDR,109.239.140.0/24,Proxy,no-resolve
IP-CIDR,149.154.160.0/20,Proxy,no-resolve
IP-CIDR,192.168.0.0/16,DIRECT
IP-CIDR,10.0.0.0/8,DIRECT
IP-CIDR,100.64.0.0/10,DIRECT
IP-CIDR,172.16.0.0/12,DIRECT
IP-CIDR,127.0.0.0/8,DIRECT
FINAL,DIRECT
