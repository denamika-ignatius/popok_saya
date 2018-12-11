import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { select_popok, onCartAdd} from '../actions';
import { Button} from 'reactstrap';
import { Redirect } from 'react-router-dom';

class PopokDetail extends Component {
    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var popokId = params.popokid;
        // var popokId = this.props.match.params.id;
        axios.get(`http://localhost:1997/popok/${popokId}`)
            .then((res) => {
                this.props.select_popok(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    onBtnCartClick = () => {
        var nama = this.refs.namaCart;
        var img = this.refs.imgCart;
        var harga = this.refs.hargaCart;
        var quantity = this.refs.quantityCart;
        var totalHarga = harga*quantity;

        this.props.onCartAdd({nama, img, harga, quantity, totalHarga})
    }

    renderButton = () => {
        if(this.props.loading) {
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return <Button color="success"
                    onClick={this.onBtnCartClick}>
                    Add To Cart
                </Button>
    }
     render() {
        var { nama, harga, img, description, merk } = this.props.popok;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img ref="imgCart" alt={img} src={img} className="img-responsive" />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1 ref="namaCart">{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div>
                        <div className="row">
                            <h2 ref="hargaCart">Rp. {harga}</h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <div>
                        <input ref="quantityCart" type="number" name="quantity" id="quantity" placeholder="Mau Beli Berapa" required />
                        </div>
                        <div>
                            {this.renderButton()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { popok: state.selectedPopok }
}

export default connect(mapStateToProps, { select_popok , onCartAdd})(PopokDetail);
