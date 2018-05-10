---
layout: post
title:  "Python多线程与多进程"
categories: Python
tags:  Python 多线程 多进程
author: 陈超文
---

* content
{:toc}





# 多线程与多进程基础
形象理解多线程与多进程：
- 多线程：
打开一个浏览器的多个窗口
- 多进程
打开多个浏览器
## 多线程
### 介绍
python多线程实际上是一个线程，多个任务切换调用，网上很多人说这是假的多线程，具体原理不细说，看廖雪峰
### 例子

```python

import threading
def do_somethig(*args):
    pass

for args in args_list:
    thread = threading.Thread(target=do_something,
                              args=(*args))
    thread.start()
    threads.append(thread)
for thread in threads:
    thread.join()

```
## 多进程
### 介绍
多进程就是根据cpu核数量开启进程执行任务，具体看廖雪峰
### 例子
```python
from multiprocessing import Process, Pool

def do_somethig(*args):
    pass

asy_list=[]#保存进程运行结束后返回的结果
p = Pool()  # 预留一个cpu爬虫效率更高，可能是因为主进程本来就占用一个cpu的原因
for arguments in arguments_list:
    asy_list.append(p.apply_async(do_somethig,
                                  args=(*arguments)))
result_list = [asy.get() for asy in asy_list]

```

# 多线程进阶
## queue消息队列
### 介绍
[Python爬虫(五)--多线程续(Queue)][1]
### 例子
```python
# -*- coding:utf-8 -*-

import threading
import time
import queue


all_done=False

def worker(tName):
    print(tName,'started')
    while not all_done:
        try:
            item = q.get(timeout=2)
        except queue.Empty:#如果过了2秒还没有获得新任务，回去看一下是否已经all_done
            continue
        q.task_done()
        print(tName, 'finish',str(item))
    print(tName,'done')

q = queue.Queue(6)

for i in range(3):
     t = threading.Thread(target=worker,args=('Thread'+str(i),))
     # t.daemon = True
     t.start()

for item in range(20):
    q.put(item)

q.join()

all_done=True

a = 1
```
# 多进程进阶

[1]: https://www.jianshu.com/p/544d406e0875
