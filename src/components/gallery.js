import React from 'react';
import Modal from './model';
import './gallery.css';
class Gallery extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            poke_names : [
                {
                    id : 0,
                    name : '',
                    imgurl : '',
                    pokeDetails : null
                }
            ],
            nextLink : '',
            lastid : 1, 
            isModelOpen : false,
            selectedId : 0,
        }   
       
        const pokelist = [];
        fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(res => res.json())
        .then( data => {
            data.results.forEach( ( element, index)  => {
                pokelist.push({ id : this.state.lastid + index, name: element.name, imgurl : `https://pokeres.bastionbot.org/images/pokemon/${ this.state.lastid +index}.png`});
            });
            this.setState({lastid : this.state.lastid + data.results.length});
            this.setState( { poke_names : pokelist ,nextLink : data.next } );
        } );
        this.loaditem = this.loaditem.bind(this);
       // this.showPokeDetail = this.showPokeDetail.bind(this);
    }

    toggleModal = () => {
    this.setState({
        isModelOpen: !this.state.isModelOpen
        });
    }
    loaditem()
    {   const pokelist=this.state.poke_names;
        fetch(this.state.nextLink)
        .then(res => res.json())
        .then( data => {
            data.results.forEach( ( element, index)  => {
                pokelist.push({id:this.state.lastid+index, name: element.name, imgurl : `https://pokeres.bastionbot.org/images/pokemon/${this.state.lastid+index}.png`});
            });
            this.setState({lastid : this.state.lastid + data.results.length});
            this.setState( { poke_names : pokelist ,nextLink : data.next } );
        } );
    }

    showPokeDetail(pokeid){
        
        this.setState({selectedId : pokeid});
        const pokeDetails = {
            height : null,
            weight : null,
            type : [],
            abilitiesdetail : [],
        };
        if( this.state.poke_names[pokeid].pokeDetails == null ) {
      //  alert("hello"+pokeid);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeid}`)
        .then(res =>res.json())
        .then(data => {
           pokeDetails.weight = data.weight/10;
           pokeDetails.height = data.height;
           data.types.forEach((type) => {
                pokeDetails.type.push(type.type.name);
           data.abilities.forEach((ability) => {
                pokeDetails.abilitiesdetail.push(ability.ability.name);
           });
          const pokeoldname = this.state.poke_names;
           pokeoldname[pokeid].pokeDetails = pokeDetails;
          this.setState({poke_names : pokeoldname});
          this.toggleModal();
        });
    });
    }
    else
    {
        this.toggleModal();
    }
    }
    render() {
        const listitems = this.state.poke_names.map ( (poke)=> <li onClick={this.showPokeDetail.bind(this, poke.id)} key={poke.id.toString()}  className="poke-item"> <img alt="poke" src={poke.imgurl} /> {poke.name}</li> );
        return(
            <div>
                <div className="header">
                    <h1>Welcome to image gallery...</h1>
                </div>
                <div className="gallery-content">
                    <ul className="ulname">
                        {listitems}
                    </ul>
                    <button className="btnseemore" onClick={this.loaditem}>see more</button>
                </div>
            
                <Modal show={this.state.isModelOpen } onClose={this.toggleModal}  poke={this.state.poke_names[this.state.selectedId]} >
                </Modal>
            </div>

            
        );
    } 

}
export default Gallery;