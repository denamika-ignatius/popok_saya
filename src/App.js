import React, { Component } from 'react';
import HeaderBertasbih from './components/HeaderBertasbih';
import LoginBertasbih from './components/LoginBertasbih';
import HomeBertasbih from './components/HomeBertasbih';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import { keepLogin, cookieChecked } from './actions';
import RegisterBertasbih from './components/RegisterBertasbih';
import PopokListBertasbih from './components/PopokListBertasbih';
import ManagePopokBertasbih from './components/ManagePopokBertasbih';
import PopokDetail from './components/PopokDetail';

const cookies = new Cookies();

class App extends Component {
  state = { content: 'Ini Content' }

  componentDidMount() {
      const username = cookies.get('Ferguso');
      if(username !== undefined) {
          this.props.keepLogin(username);
      }
      else {
        this.props.cookieChecked();
      }
  }

  onBtnOKClick = () => {
    this.setState({ content: 'Ini Comberan' })
  }

  render() {
    if (this.props.cookie) {
      return (
        <div>
          <HeaderBertasbih navBrand={"Kacrut"} />
          <div>
            <Route exact path="/" component={HomeBertasbih} />
            <Route path="/login" component={LoginBertasbih} />
            <Route path="/register" component={RegisterBertasbih} />
            <Route path="/popoklist" component={PopokListBertasbih} />
            <Route path="/managepopok" component={ManagePopokBertasbih} />
            <Route path="/popokdetail" component={PopokDetail} />
          </div>
        </div>
      );
    }
    
    return (<div>
              <center><h1>Loading...</h1></center>
          </div>);
  }
}

const mapStateToProps = (state) => {
    return { cookie: state.auth.cookie }
}

export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));

// class Manusia {
//   constructor(bertasbih, kucing) {
//     this.nama = bertasbih
//     this.umur = kucing
//   }
// }

// var Andi = new Manusia('Andi', 25);
// var Budi = new Manusia('Budi', 27);