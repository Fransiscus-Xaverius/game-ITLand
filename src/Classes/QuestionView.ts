import { Question } from "./Question";
import { API } from "./API";

export class QuestionView {

    private QuestionArea: HTMLDivElement | null = null;
    private UpdateBtn: HTMLButtonElement | null = null;
    private api:API | null = null;
    private curQuestion:Question | null = null;
    private AButton: HTMLButtonElement | null = null;
    private BButton: HTMLButtonElement | null = null;
    private CButton: HTMLButtonElement | null = null;
    private DButton: HTMLButtonElement | null = null;

    constructor(QuestionArea: HTMLDivElement, UpdateButton: HTMLButtonElement, api:API, a:HTMLButtonElement, b:HTMLButtonElement, c:HTMLButtonElement, d:HTMLButtonElement){
        this.setQuestionArea(QuestionArea);
        this.setUpdateBtn(UpdateButton);
        this.setAPI(api);
        this.setButtons(a,b,c,d);
    }

    public setButtons(a:HTMLButtonElement, b:HTMLButtonElement, c:HTMLButtonElement, d:HTMLButtonElement){
        this.AButton = a;
        this.BButton = b;
        this.CButton = c;
        this.DButton = d;
    }

    public async load(){
        await this.UpdateQuestion();
    }

    public setQuestionArea(QuestionArea: HTMLDivElement | null): void {
        this.QuestionArea = QuestionArea;
    }

    public setUpdateBtn(UpdateBtn:HTMLButtonElement | null): void{
        this.UpdateBtn = UpdateBtn;
    }

    public setCurQuestion(question:Question| null): void{
        this.curQuestion = question;
    }

    public setAPI(api:API){
        this.api = api;
    }

    public async checkAnswer(self:HTMLButtonElement, val:string): Promise<void>{
        if(val==""){ self.style.display = 'none' }
        else{
            alert("nice");
            await this.UpdateQuestion();
        }
    }

    public resetAnswerButtons(a:HTMLButtonElement, b:HTMLButtonElement, c:HTMLButtonElement, d:HTMLButtonElement){
        //Object passed here to make sure it isn't null.
        a.value = "";
        b.value = "";
        c.value = "";
        d.value = "";
        a.style.display = "inline";
        b.style.display = "inline";
        c.style.display = "inline";
        d.style.display = "inline";
    }

    public async UpdateQuestion(){
        const reqAPI = await this.api?.getQuestion();
        let q:Question = {text:reqAPI?.text!, a:reqAPI?.a!, b:reqAPI?.b!, c:reqAPI?.c!, d:reqAPI?.d!, answer:reqAPI?.answer!};
        this.curQuestion = q;
        if(this.QuestionArea!=null && this.curQuestion !=null && this.AButton && this.BButton && this.CButton && this.DButton){
            this.QuestionArea!.innerHTML = this.curQuestion!.text;
            this.AButton!.innerHTML = `A. ${q.a}`;
            this.BButton!.innerHTML = `B. ${q.b}`;
            this.CButton!.innerHTML = `C. ${q.c}`;
            this.DButton!.innerHTML = `D. ${q.d}`;
            this.resetAnswerButtons(this.AButton, this.BButton, this.CButton, this.DButton);
            switch(q.answer){
                case 'a':
                    this.AButton.value = "ans";
                    break;
                case 'b':
                    this.BButton.value = "ans";
                    break;
                case 'c':
                    this.CButton.value = "ans";
                    break;
                case 'd':
                    this.DButton.value = "ans";
                    break;
                default:
                    break;
            }

        }
        else{
            if(this.QuestionArea == null) alert('QuestionArea is null! please tell a nearby admin');
        }
    }

}