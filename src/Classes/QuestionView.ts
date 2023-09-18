import { Question } from "./Question";
import { API } from "./API";

export class QuestionView {

    private QuestionArea: HTMLDivElement | null = null;
    private UpdateBtn: HTMLButtonElement | null = null;
    private api:API | null = null;
    private curQuestion:Question | null = null;

    constructor(QuestionArea: HTMLDivElement, UpdateButton: HTMLButtonElement, api:API){
        this.setQuestionArea(QuestionArea);
        this.setUpdateBtn(UpdateButton);
        this.setAPI(api);
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

    public async UpdateQuestion(){
        const reqAPI = await this.api?.getQuestion();
        let q:Question = {text:reqAPI?.text!, a:reqAPI?.a!, b:reqAPI?.b!, c:reqAPI?.c!, d:reqAPI?.d!, answer:reqAPI?.answer!};
        this.curQuestion = q;
        if(this.QuestionArea!=null && this.curQuestion !=null){
            this.QuestionArea!.innerHTML = this.curQuestion!.text;
        }
        else{
            if(this.QuestionArea == null) alert('memek null cok');
        }
    }

}