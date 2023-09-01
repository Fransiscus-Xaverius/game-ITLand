import { Terminal } from "./Console/Terminal";

export class TerminalView{
    private terminal:Terminal|null = null
    private textArea:HTMLTextAreaElement|null = null
    private executeButton:HTMLButtonElement|null = null
    private stopButton:HTMLButtonElement|null = null

    constructor(
        textArea:HTMLTextAreaElement|null, 
        executeButton:HTMLButtonElement|null, 
        stopButton:HTMLButtonElement|null, 
        terminal:Terminal|null = null
        ) {
        this.setTerminal(terminal)
        this.setTextArea(textArea)
        this.setExecuteButton(executeButton)
        this.setStopButton(stopButton)
    }

    public setTextArea(value:HTMLTextAreaElement|null){
        const inputListener = (evt:Event) => {
            if(!this.terminal)return
            const target = evt.target as HTMLTextAreaElement
            // console.log(target)
            this.terminal.content = target.value
        }
        
        if(value){
            value.addEventListener('input', inputListener)
            if(this.terminal){
                value.value = this.terminal.content
            }
        } 
        this.textArea?.removeEventListener('input', inputListener)
        this.textArea = value
    }

    public setTerminal(value:Terminal|null){
        if(this.textArea && value) this.textArea.value = value.content
        this.terminal = value
    }

    public setExecuteButton(value:HTMLButtonElement|null):void{
        const executeClickListener = (evt:MouseEvent) => {
            if(!this.terminal) return
            try{

                this.terminal.compile()
                this.terminal.execute()
            }
            catch(err){
                throw err;
                console.log('Compile Time ' + err)
            }
        }
        if(this.executeButton) this.executeButton.removeEventListener('click', executeClickListener)
        value?.addEventListener('click', executeClickListener)
        this.executeButton = value
    }

    public setStopButton(value:HTMLButtonElement|null):void{
        const stopClickListener = (evt:MouseEvent) => {
            if(!this.terminal) return
            this.terminal.stop()
        }
        if(this.stopButton) this.stopButton.removeEventListener('click', stopClickListener)
        value?.addEventListener('click', stopClickListener)
        this.stopButton = value
    }
}