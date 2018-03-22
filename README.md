声明：所有的接口都是爬取得豆瓣的电影，该项目只是用来个人练习和学习使用，不涉及任何商用用途。如果侵权，请及时联系本人，本人会尽快删除。

# 分支说明
    1.dev-flexible 手淘自适应
    2.dev 采用antd高清方案自适应
    3.dev-vm 采用vm自适应（具体的参数还未调整，具体什么坑，还没注意到）

# vue + vuex 尝试
    1.尝试构建vue程序
    2.webpack 2.0
    3.eslint 加入


# 启动 运行

    yarn                      npm 
    yarn install              npm install 
    yarn start                npm start        
  

# 更改
    
    * 2017-06-27
        webpack升级3.0
    
    * 2017-12-05
        修复babel问题，build文件修复
    
    * 2017-12-28
        重新优化build,将koa集成，服务器部署，通过nginx做的反向代理。数据采用node作为转发层，抓取豆瓣影视的借口获取数据。

    * 2017-12-30
        合并dev到master,优化部分代码：完成了film-item的组件

    * 2018-2-27
        服务器集成jenkin,自动构建部署（暂时只是github搭建的，晚点会上gitlab,打算拿公司的项目着手）。
    
    * 2018-2-27
        加入lazyload组件。优化部分代码。
    
     * 2017-3-18
        postcss完善配置项，rem升级到vw, cssnext替代sass文件，优化package.json文件，去除无用组件。

    * 2017-3-22
        film-item界面重新布局，服务器端配置数据库。
                
# ToDo
    * 将主页的film-item剥离（Done）
    * 
    * film-detail页面的实现
    