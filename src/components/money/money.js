import './index.less';
import React, { Component } from 'react';
import {  message } from 'antd';
import chat from '../../assets/chat.png';
import LoadingCom from '../loading/loading';
import https from '../../utils/https';
import urls from '../../utils/urls';
import ReactTabllist from 'react-tabllist';
class TimeLineCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      phone: '',
      name: '',
      content: '',
      className: 'demo3',
      data:  [
        ["用户名", "金额", "留言"],
        ['row 1; column 1', 'row 1; column 2', 'row 1; column 3']

      ],
      property: {
        // The style of the outermost container
        style: {
          width: '100%',
          margin: '0 auto',
          height: 300,
          border: '1px solid #999999'
        },
        speed: 50,
        isScroll: true,
        border: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#999999'
        },
        header: {
          show: false
        },
        body: {
          row: {
            visual: {
              show: true,
              interval: 1,
              style: {
                backgroundColor: '#E8F4FC'
              }
            },
            silent: {
              show: false,
              style: {
                backgroundColor: '#bcf0fc'
              }
            }
          }
        }
      }

    };
    this.handleSearch=this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch() {
    this.setState({
      isLoading: true,
    });
    https.post(
        urls.getMoneyList,
      )
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            isLoading: false,
          });
          this.setState({
            data:res.data.data,
          });
        } else {
          this.setState({
            isLoading: false,
          });
          message.error(res.data.message, 1);
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        console.error(err);
      });
  }
  componentDidMount() {
    if (this.props.location.pathname === '/money') {
      this.setState(
          {
            likes: true,
          },
          () => {
            this.handleSearch();
          },
      );
    } else {
      this.handleSearch();
    }
  }
  componentWillMount(){
    this.setState(

        () => {
          this.handleSearch();
        },
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="money">
        {this.state.isLoading ? <LoadingCom /> : ''}
        <img src={chat} alt="微信"/>微信
        <ReactTabllist {...this.state}/>
      </div>

    );
  }
}

export default TimeLineCustom;
