import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';
import QUIZ_BALL from "../images/quizBall.png";
import "../components/course-button";
import CourseButton from '../components/course-button';
import DIVISOR from "../images/divisor.png";
import "../components/course-button-back";
import { FontWeight, IconTypes } from 'ecv-component';

type Quiz = {
    title: string,
    correct: boolean,
    descripton: string
}

const QUESTION = [
    {
        description: "Qual das alternativas não corresponde a uma forma de comunicação visual?",
        exercice: [
            {title: "Mímica", correct: false, descripton: "Alternativa incorreta. Também é considerada uma forma de comunicação visual por transmitir mensagens através dos gestos."},
            {title: "Gráficos", correct: false, descripton: "Alternativa incorreta. É considerado como comunicação visual, pois transmite informações através de recursos gráficos (linhas, pontos, curvas)"},
            {title: "Fotografia", correct: false, descripton: "Alternativa incorreta. Fotografias nos transmitem mensagens também através de recursos puramente visuais. Quando vemos uma fotografia de uma pessoa sorrindo, logo supomos que a pessoa estava feliz naquele momento, que algo poderia ter acontecido para deixá-la nesta condição. Todas estas interpretações que podemos extrair são mensagens."},
            {title: "Telefonema", correct: true, descripton: "Alternativa correta. Ao falarmos ao telefone, estamos lidando apenas com a audição. Neste caso, a comunicação se dá exclusivamente de forma oral, não tendo interferência do meio visual."},
        ]
    },
    {   
        description: "De acordo com o texto, qual das alternativas abaixo não representa uma característica do processamento de imagens pelo cérebro?",
        exercice: [
            {title: "Imagens transmitem mensagens mais rápido do que texto", correct: false, descripton: "Alternativa incorreta. Esta informação está correta de acordo com o estudo feito pelos neurocientistas do MIT (Massachusetts Institute of Technology)."},
            {title: "Imagens desencadeiam sentimentos", correct: false, descripton: "Alternativa incorreta. Esta informação está correta de acordo com o estudos estudos apresentados. Ao ver imagens nosso cérebro nos remeterá a sentimentos relacionados ao que vimos."},
            {title: "10% da sua atividade cerebral é ativada durante o processo visual", correct: true, descripton: "Alternativa correta. Nosso cérebro ativa 50% de sua atividade durante o processo visual."},
            {title: "O cérebro demora 13 milissegundos para processar uma imagem", correct: false, descripton: "Alternativa incorreta. Os estudos realizados confirmaram o menor tempo já registrado para processamento de uma imagem como 13 milissegundos"},
        ]
    },
    {
        description: "Qual das alternativas refere-se ao tratamento de uma imagem?",
        exercice: [
            {title: "Realizar recortes e girar a imagem", correct: false, descripton: "Alternativa incorreta. O processo de recortar e girar uma imagem refere-se a edição de imagem."},
            {title: "Recuperar uma imagem em mau estado, retirar imperfeições como amassados e manchas", correct: true, descripton: "Alternativa correta. Todos os processos citados têm relação com o tratamento e recuperação de uma imagem."},
            {title: "Unir diversas imagens para compor uma imagem única e diferente", correct: false, descripton: "Alternativa incorreta. O processo descrito trata da manipulação de uma imagem, não de tratá-la."},
            {title: "Deixar a imagem em preto e branco", correct: false, descripton: "Alternativa incorreta. Alteração de cor está relacionado a editar uma imagem, não ao tratamento dela."},
        ]
    },
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
                width: 74%;
            }

            .question{
                width: 100%;
                height: 100%;
                padding: 0rem 2rem;
                display: flex;
                flex-direction: column;
                position: relative;
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
                -webkit-user-drag: none;
            }

            .cards__card{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 377px;
                height: 40px;
                background-color: #031B30;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
                padding: 0.5rem;
            }

            .cards__card p{
                line-break: after-white-space;
                width: fit-content;
            }

            .cards__card[actual="actual"]{
                background-color: #3B97FC;
            }

            .cards__card:hover{
                background-color: #3B97FC;
            }

            .cards__response{
                display: none;
                width: 361px;
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

            course-button,
            button{
                align-self: center;
                margin-top: 10rem;
            }

            .course-buttonResponse{
                margin-top: 1rem;
            }

            .introduction__divisor{
                display: none;
                top: 45px;
                height: 126px;
                width: 303px;
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

            course-button-back,
            .buttonBack{
                position: absolute;
                top: 10px;
                left: 10px;
            }

            button{
                background-color: #FF4101;
                color: #fff;
                font-size: 20px;
                font-weight: 700;
                border: none;
                width: 168px;
                height: 39px;
                cursor: pointer;
                box-shadow: 0px 4px 4px 0px #00000040;
                font-family: RobotoRegular;
            }
            
            button:hover{
                background-color: #ad2e04;
            }

            .buttonBack{
                width: fit-content;
                padding: 0.2rem;
                border-radius: 50%;
                border: 3px solid #000;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }

            .buttonBack:hover{
                opacity: 0.8;
            }
        `;
    }   

    @state()
    private _isCorrect: boolean = false;

    @state()
    private _nextQuestion: number = 0;

    @queryAll(".cards__response")
    private _listCardsResponse!: NodeListOf<HTMLDivElement>;

    @queryAll(".cards__card")
    private _listCardsCard!: NodeListOf<HTMLDivElement>;
    
    @query("course-button")
    private _courseButton!: CourseButton;

    @query("button")
    private _buttonNextQuestion!: HTMLButtonElement;

    @query(".result__text")
    private _resultText!: HTMLParagraphElement;

    // @query(".introduction__divisor")
    // private _introductionDivisor!: HTMLImageElement;

    private _selectedQuestion(e: MouseEvent, index: number, isCorrect: boolean): void {
        const element = e.currentTarget as HTMLDivElement;

        this._listCardsResponse.forEach((card: HTMLDivElement) => {
            card.style.display = "none";
        });

        this._listCardsCard.forEach((card: HTMLDivElement) => {
            card.removeAttribute("actual");
        });

        element.setAttribute("actual", "actual");

        this._nextQuestion == QUESTION.length - 1 ?
        this._courseButton.style.marginTop = "1rem" : 
        this._buttonNextQuestion.style.marginTop = "1rem";

        this._listCardsResponse[index].style.display = "block";
        this._resultText.style.display = "block";
        this._isCorrect = isCorrect;
        //this._introductionDivisor.style.display = "block";
    }

    private resetQuestion(): void{
        this._listCardsResponse.forEach((card: HTMLDivElement) => {
            card.style.display = "none";
        });

        this._listCardsCard.forEach((card: HTMLDivElement) => {
            card.removeAttribute("actual");
        });

        this._buttonNextQuestion.style.marginTop = "10rem";
        this._resultText.style.display = "none";

        this.requestUpdate();
        //this._introductionDivisor.style.display = "none";
    }

    private _generateQuizQuestionCard(){
        return QUESTION[this._nextQuestion]?.exercice.map((question: Quiz, index: number) => html`
            <div>
                <div class="cards__card" @click=${(e: MouseEvent) => {this._selectedQuestion(e, index, question.correct)}}> 
                    <p>${question.title}</p>
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
                 ${this._nextQuestion == QUESTION.length - 1 || this._nextQuestion == 0? 
                    html`<course-button-back></course-button-back>` : 
                    html`<div class="buttonBack" @click=${() => {this._nextQuestion--; this.resetQuestion()}}>
                            <ecv-icon .icon=${IconTypes.ArrowBack} .iconStyle=${{size: "25px", weight: FontWeight.Bold}}></ecv-icon>
                        </div>`}
                
                
                <div class="question__content">
                    <div class="content__introduction">
                        <div>
                            <h1>Quiz</h1>
                            <p>${QUESTION[this._nextQuestion]?.description}</p>
                        </div>
                        
                        <div class="introduction__cards">
                            ${this._generateQuizQuestionCard()}
                        </div>  
                    </div>
                    <!-- <img src=${DIVISOR} class="introduction__divisor"> -->
                    <div class="content__result">
                        <img src=${QUIZ_BALL}>
                        <p class="result__text">${this._isCorrect ? "Acertou!" : "Errou!"}</p>
                    </div>
                </div>
                ${this._nextQuestion == QUESTION.length - 1 ? 
                    html`<course-button></course-button>` : 
                    html`<button @click=${() => {this._nextQuestion++; this.resetQuestion()}}>Avançar</button>`
                }
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-quiz-question': CourseQuizQuestion
    }
}