import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PopokItemBertasbih from './PopokItemBertasbih';

class PopokListBertasbih extends Component {
    state = { listPopok: [], searchListPopok: [] }

    componentDidMount() {
        axios.get('http://localhost:1997/popok')
            .then((res) => {
                this.setState({ listPopok: res.data, searchListPopok: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnSearchClick = () => {
        var nama = this.refs.searchNama.value;
        var merk = this.refs.searchMerk.value;
        var hargaMin = parseInt(this.refs.hargaMinSearch.value);
        var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

        var arrSearch = this.state.listPopok.filter((item) => {
            return item.merk.includes(merk) 
                    && item.harga >= hargaMin
                    && item.harga <= hargaMax
                    && item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListPopok: arrSearch })
    }

    renderListPopok = () => {
        var total = 12;
        var size = 4;
        var check = true;
        var listJSXPopok = this.state.searchListPopok.map((item) => {
            if(total === 0 && check === true) {
                size = 6;
                total = 12;
                check = false;
            }
            else if(total === 0 && check === false){
                size = 4;
                total = 12;
                check = true;
            }
            total -= size;

            return (
                <PopokItemBertasbih size={size} popok={item} />
            )
        })
        return listJSXPopok;
    }

    render() {
        if(this.props.username !== "") {
            if(this.props.popok.id !== 0) {
                return <Redirect to={`/popokdetail?popokid=${this.props.popok.id}&namapopok=${this.props.popok.nama}`} />
            }
            return (
                <div>
                    <section className="bg-light" id="portfolio">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-uppercase">List Popok</h2>
                                <h3 className="section-subheading text-muted">Best popok in town.</h3>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <form>
                                        <input type="text" className="form-input" ref="searchNama" placeholder="Nama Popok" />
                                        <select ref="searchMerk">
                                            <option value="">All Merk</option>
                                            <option>Bronson</option>
                                            <option>Bunting</option>
                                            <option>Uchiha</option>
                                        </select>
                                        Harga : <input type="number" ref="hargaMinSearch" defaultValue="0" /> - <input type="number" ref="hargaMaxSearch" defaultValue="9999999" />
                                        <input type="button" className="btn btn-success" value="Search" onClick={this.onBtnSearchClick} />
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                   {this.renderListPopok()}
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        
        return <Redirect to='/login' />
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username, popok: state.selectedPopok }
}

export default connect(mapStateToProps)(PopokListBertasbih);