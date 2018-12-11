import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Table} from 'reactstrap';
import '../support/css/bunting.css';

class cart extends Component {
    state = { cartproduk : []}    

    componentDidMount() {
        axios.get(`http://localhost:1997/cart`)
            .then((res) => {
                console.log(res)
                this.setState({cartproduk: res.data})
                console.log(this.state.cartproduk)

            }).catch((err) => {
                console.log(err)
            })
    }

    getcartlist = () => {
        axios.get('http://localhost:1997/cart')
            .then((res) => {
                // console.log(res)    
                this.setState({cartproduk: res.data})
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnCartDeleteClick = (id) => {
        axios.delete('http://localhost:1997/cart/' + id)
            .then((res) => {
                this.getcartlist();
            }).catch((err) => {
                console.log(err);                
            })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')) {
            axios.delete('http://localhost:1997/popok/' + id)
                .then((res) => {
                    this.getPopokList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
    
    onBtnCheckOutClick = () => {
        // const { nama, user, harga ,id} = this.state.cartproduk
        axios.post('http://localhost:1997/history', {
            user : this.props.username,
            detail : this.state.cartproduk
        }).then((res) => {
            for(var i = 1; i <= this.state.cartproduk.length + 1 ; i++){
                axios.delete('http://localhost:1997/cart/' + i)
                .then((res) => {
                    this.getcartlist();
                }).catch((err) => {
                    console.log(err);                
                })
            }    
        }).catch((err) => {
            console.log(err);                
        })
    }

    rendercartPopok = () => {
        var listcart = this.state.cartproduk.map((item) => {
            if (item.user === this.props.username) {
                if (item.id !== this.state.selectedIdEdit) {
                    return (

                          <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.nama}</td>
                            <td>{item.qty}</td>
                            <td>{item.harga}</td>
                            <td>{item.totalharga}</td>
                            <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.setState({ selectedIdEdit: item.id })} /></td>
                            <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                          </tr>
                    )
                }
                return(
                <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.nama}</td>
                    <td> <input
                            type="number"
                            ref="qtyEdit"
                            defaultValue={item.qty}
                        /></td>
                    <td>{item.harga}</td>
                    <td>{item.totalharga}</td>
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={() => this.onBtnSaveClick(item.id)} /></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ selectedIdEdit: 0 })} /></td>
                </tr>
                )
            }
        })
        return listcart;

    }
    

    render() {
        if(this.props.username !== undefined) {
            return (
                <div>
                    <div>
                        <h1>Cart List</h1>
                    </div>
                    <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Qty</th>
                            <th>Harga</th>
                            <th>Total Harga</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rendercartPopok()}
                    </tbody>
                    
                    </Table>
                    <div className="col-3" style={{marginTop: "10px"}}>
                        <input className="btn" type="button" value="CheckOut" onClick={this.onBtnCheckOutClick}/>
                    </div>
                </div>        
            )         
        } 
        // console.log(this.state.cartproduk)
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return {
        produk: state.selectedProduk,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(cart);
