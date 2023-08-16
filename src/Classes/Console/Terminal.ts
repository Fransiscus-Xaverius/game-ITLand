export class Terminal{
    public content:string = "";
    public running:boolean = false

    public execute():void{
        this.running = true
        alert(this.content)
    }

    public stop():void{
        this.running = false
    }
}