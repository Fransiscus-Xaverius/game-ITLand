import {Player} from './classes/Player'
import {Terminal} from 'xterm'

const halo:number=3;
const halo2:string="Hello";
const halo3:boolean=true;

const term:Terminal = new Terminal();
var element:HTMLElement|null = document.getElementById('terminal') 
if(element != null){
    term.open(element);
}

alert('helllooooo')
