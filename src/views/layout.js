import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import SliderRight from '../components/slider/index';
import Nav from '../components/nav/nav';
import Index from '../components/home/index';
import { isMobileOrPc } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isShowSlider: false,
      // isIndexPage: false,
      date: new Date("2019/09/01"),
      date2:new Date(),
      diff2:0,
    };
  }
  componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      //date: new Date(),
      date2:new Date(),

      diff2:this.networkTime(this.state.date),


      //date3:this.state.date2.valueOf()-this.state.date.valueOf()

    });
  }
   networkTime(time) {
    var netConnectTime = parseInt(Date.parse(time)/1000);//网络连接时间
    var currentTime = parseInt(new Date().getTime()/1000);//当前时间
    var hasUseTime = parseInt(currentTime - netConnectTime);
    var returnObj = {};
    // 1 时 = 3600秒 1分 = 60秒
    if (hasUseTime  < 60) {
      if (hasUseTime < 0) {
        returnObj = "时间"+"0秒";
      }else{
        returnObj = "时间"+parseInt(hasUseTime)+"秒";
      }
      return returnObj;

    }else if (hasUseTime >= 60 &&  hasUseTime <= 3600) {
      returnObj = "时间"+parseInt(hasUseTime/60)+"分钟";
      return returnObj;
    }else if (hasUseTime > 3600 && hasUseTime <= 3600*24) {
      var h = parseInt(hasUseTime/3600);
      var min = parseInt((hasUseTime - h*3600)/60);
      returnObj ="时间"+h+"小时"+min + "分钟"
      return returnObj;

    }else if (hasUseTime > 3600*24 ){
      var day = parseInt( hasUseTime/ (24*3600) );
      var hour = parseInt( (hasUseTime - day*24*3600) / 3600);
      var minute = parseInt( (hasUseTime - day*24*3600 - hour*3600) /60 );
      returnObj = "时间"+day+ "天"+hour+"小时"+minute+'分钟';
      return returnObj;
    }
  }

  render() {
    let isShowSlider = false;
    let pathName = this.props.location.pathname;
    if (
      pathName !== '/articleDetail' &&
      pathName !== '/about' &&
      !isMobileOrPc()
    ) {
      isShowSlider = true;
    }

    let isIndexPage = false;
    if (pathName === '/') {
      isIndexPage = true;
    }
    return (
      <div className="Layouts">
        {!isIndexPage ? (
          <div>
            <Nav pathname={this.props.location.pathname} />
            <Layout className="layout">
              <Content>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                  <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>
                    {this.props.children}
                  </Content>
                  {!isShowSlider ? (
                    ''
                  ) : (
                    <Sider width={350} style={{ background: '#fff' }}>
                      <SliderRight />
                    </Sider>
                  )}
                </Layout>
              </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', background: '#fff' }}>
              服务端学习 ©2019 created by 杨园亮 网站稳定运行{this.state.diff2}
            </Footer>
            <BackTop />
          </div>
        ) : (
          <Index />
        )}
      </div>
    );
  }
}

export default Layouts;
