import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';
import QUIZ_BALL from "../images/quizBall.png";
import "../components/course-button";
import CourseButton from '../components/course-button';
import DIVISOR from "../images/divisor.png";

type Quiz = {
    title: string,
    correct: boolean,
    descripton: string
}

const QUESTION: Quiz[] = [
    {title: "RNYB", correct: false, descripton: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
    {title: "CMYK", correct: true, descripton: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
    {title: "CNYK", correct: false, descripton: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
    {title: "RGB", correct: false, descripton: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
];

@customElement('course-quiz-question')
export default class CourseQuizQuestion extends LitElement{

    static override get styles(): CSSResult{
        return css`
            p, h1{
                margin: 0;
            }

            h1{
                font-size: 96px;
                font-weight: bold;
            }

            p{
                width: 61%;
            }

            .question{
                width: 100%;
                height: 100%;
                padding: 0rem 2rem;
                display: flex;
                flex-direction: column;
            }

            .question__content{
                display: flex;
            }

            .content__introduction{
                display: flex;
                flex-direction: column;
                gap: 25px;
                margin-left: 4rem;
            }

            .question__content img{
                object-fit: contain;
            }

            .cards__card{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 334px;
                height: 40px;
                background-color: #031B30;
                color: #fff;
                font-size: 30px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }

            .cards__card[actual="actual"]{
                background-color: #3B97FC;
            }

            .cards__card:hover{
                background-color: #3B97FC;
            }

            .cards__response{
                display: none;
                width: 302px;
                height: 133px;
                padding: 1rem;
                background-color: #D4E9FF;
                overflow-y: auto;
            }

            .cards__response::-webkit-scrollbar{
                background-color: #031B30;
                color: #fff;
                width: 11px;
            }

            .cards__response::-webkit-scrollbar-thumb{
                background-color: #3B97FC;
            }

            .cards__response p{
                width: 100%;
            }

            .introduction__cards{
                width: fit-content;
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            course-button{
                align-self: center;
                margin-top: 10rem;
            }

            .course-buttonResponse{
                margin-top: 1rem;
            }

            .introduction__divisor{
                top: 103px;
                height: 163px;
                width: 357px;   
                position: absolute;
            }

            .content__result{
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .content__result p{
                display: none;
                width: fit-content;
                font-size: 32px;
                color: #353535;
            }
        `;
    }   

    @state()
    private _isCorrect: boolean = false;

    @queryAll(".cards__response")
    private _listCardsResponse!: NodeListOf<HTMLDivElement>;

    @queryAll(".cards__card")
    private _listCardsCard!: NodeListOf<HTMLDivElement>;
    
    @query("course-button")
    private _courseButton!: CourseButton;

    @query(".result__text")
    private _resultText!: HTMLParagraphElement;

    private _selectedQuestion(e: MouseEvent, index: number, isCorrect: boolean): void {
        const element = e.currentTarget as HTMLDivElement;

        this._listCardsResponse.forEach((card: HTMLDivElement) => {
            card.style.display = "none";
        });

        this._listCardsCard.forEach((card: HTMLDivElement) => {
            card.removeAttribute("actual");
        });

        element.setAttribute("actual", "actual");

        this._courseButton.style.marginTop = "1rem";
        this._listCardsResponse[index].style.display = "block";
        this._resultText.style.display = "block";
        this._isCorrect = isCorrect;
    }

    private _generateQuizQuestionCard(): Array<TemplateResult>{
        return QUESTION.map((question: Quiz, index: number) => html`
            <div>
                <div class="cards__card" @click=${(e: MouseEvent) => {this._selectedQuestion(e, index, question.correct)}}> 
                    ${question.title}
                </div>
                <div class="cards__response">
                    <p>
                        ${question.descripton}
                    </p>
                </div>
            </div>
        `);
    }

    protected override render(): TemplateResult{
        return html`
            <div class="question">
                <div class="question__content">
                    <div class="content__introduction">
                        <div>
                            <h1>Quiz</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
                                unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        
                        <div class="introduction__cards">
                            ${this._generateQuizQuestionCard()}
                        </div>  
                    </div>
                    <img src=${DIVISOR} class="introduction__divisor">
                    <div class="content__result">
                        <img src=${QUIZ_BALL}>
                        <p class="result__text">${this._isCorrect ? "Acertou!" : "Errou!"}</p>
                    </div>
                </div>
                <course-button></course-button>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-quiz-question': CourseQuizQuestion
    }
}