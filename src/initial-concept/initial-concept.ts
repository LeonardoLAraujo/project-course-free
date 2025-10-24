import {html, css, TemplateResult, CSSResult, LitElement, PropertyValues} from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import initialConceptMan from '../images/initial_concept_man.png';
import '../components/course-collapsed-button';
import '../components/course-button';
import FreeCourse from '../free-course';
import CourseCollapsedButton from '../components/course-collapsed-button';

export type CollapsedButtonData = {
    label: TemplateResult | string;
    text: TemplateResult | string;
}

@customElement('initial-concept')
export default class InitialConcept extends LitElement{

    static override get styles(): CSSResult{

        return css`

            .initial-concept{
                display: flex;
                position: relative;
                width: inherit;
            }

            .initial-concept__leftSide{
                width: 381px;
            }

            .initial-concept__leftSide > * {
                position: absolute;
            }

            .leftSide__lightBlueBlock{
                top: 98px;
                left: 204px;
                background-color: #3C97FC;
                width: 151px;
                height: 177px;
            }

            .leftSide__darkBlueBlock{
                top: 284px;
                width: 355px;
                height: 416px;
                background-color: #031B30;
            }

            .leftside__man{
                left: -9px;
                top: 12px;
            }

            h3{
                font-family: RobotoBold;
                font-size: 20px;
                margin: 14px 0;
            }

            p{
                font-family: RobotoRegular;
                font-size: 14px;
            }

            .initial-concept__rightSide p{
                max-width: 468px;
            }

            .rightSide__advanceButton{
                display: flex;
                justify-content: center;
                position: absolute;
                top: 635px;
                width: 514px;
            }
            
        `;

    }

    protected collapsedData: CollapsedButtonData[] = [
        {
            label: "Design Gráfico",
            text: `Design é toda criação, desenvolvimento de objetos e/ou produtos, 
                que tenham como objetivo a resolução de um problema. 
                Tendo sempre como ponto de partida um problema a ser solucionado, o design irá explorar diversos conceitos, 
                sejam eles estéticos ou estratégicos, para viabilizar a resolução, 
                mantendo sempre em mente a finalidade do que será criado.
                O profissional designer gráfico tem como objetivo estabelecer a comunicação, 
                garantindo que a mensagem seja entregue da melhor forma possível, 
                seja elaborando uma embalagem para um produto, criando um cartão de visita ou o visual de uma empresa. 
                Sua principal missão é resolver o problema proposto de forma criativa fazendo uso de diversos conhecimentos
                técnicos pertinentes.
            `
        },
        {
            label: "Comunicação Visual",
            text: `Comunicação visual é o meio onde a comunicação acontece, neste caso, 
            usufruindo de recursos visuais para que a mensagem seja transmitida. 
            Seu uso é extremamente comum, justamente por isso não nos atentamos ao seu uso: placas de trânsito, 
            desenhos, ícones, signos, vídeos, fotos e imagens. Todos estes elementos nos transmitem mensagens, 
            você já reparou? No percurso da sua casa ao trabalho, ou outro trajeto que você sempre faça, 
            observe a sua volta: quantos tipos diferentes de comunicação visual é possível encontrar?
            `
        },
        {
            label: "Processamento de imagens",
            text: `Certo, já sabemos que tanto a Comunicação Visual quanto o Design Gráfico lidam diretamente com imagens, 
            mas qual a importância das imagens? Como nosso cérebro reage a elas?
            Com toda certeza você já deve ter ouvido o famoso ditado "uma imagem vale mais do que mil palavras". 
            O que exatamente isto significa? 
            Uma imagem é capaz de transmitir mensagens de forma muito mais rápida do que texto, 
            além de ser mais impactante por poder desencadear sentimentos como alegria, raiva, 
            compaixão e curiosidade nas pessoas que as veem. 
            Neurocientistas do MIT (Massachusetts Institute of Technology ou Instituto de Tecnologia de Massachusetts, 
            em tradução livre) descobriram através de testes que nosso cérebro leva apenas 13 milissegundos para compreender uma imagem, 
            superando em velocidade todos os estudos anteriores. Logo, 
            o uso excessivo de imagens para publicidade e propaganda, por exemplo, 
            é mais do que justificado. 
            `
        }
    ];

    @queryAll('course-collapsed-button')
    private _collapsedButtons!: NodeListOf<CourseCollapsedButton>;

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        
        this._collapsedButtons.forEach(button => {
            button.addEventListener('oncollapsed', (event: Event) => {
                this.collapseAllButtonsExceptSame(event.target as CourseCollapsedButton);
            });
        });
    }

    protected collapseAllButtonsExceptSame(except: CourseCollapsedButton): void {

        this._collapsedButtons.forEach(button => {
            if (button !== except){
                button.isCollapsed = true;
            }
        });
    }

    protected anyCollapsed(): boolean {
        
        const totalCollapsed: number = Array.from(this._collapsedButtons).filter(button => button.isCollapsed).length;

        return totalCollapsed > 0 ? true : false;
    }

    protected advance(): void {

        FreeCourse.instance.applyTransitionNext();
    }

    protected createCollapsedButtons(): TemplateResult {

        return html`
            ${this.collapsedData.map(data => html`<course-collapsed-button label=${data.label} .text=${data.text}></course-collapsed-button>`)}
            <div class="rightSide__advanceButton">
                <course-button .onPressed=${() => {
                    this.advance();
                }}></course-button>
            </div>
        `;
    }


    protected override render(): TemplateResult{

        return html`
            <div class="initial-concept">
                <div class="initial-concept__leftSide">
                    <div class="leftSide__lightBlueBlock"></div>
                    <div class="leftSide__darkBlueBlock"></div>
                    <img class="leftside__man" src="${initialConceptMan}">
                </div>
                <div class="initial-concept__rightSide">
                    <h3>Alguns conceitos iniciais</h3>
                    <p class="">
                        Antes de efetivamente iniciar a descoberta do programa e suas possibilidades, 
                        há alguns conceitos essenciais que você deve dominar para que tudo ocorra da melhor forma possível e seus estudos sejam produtivos. 
                        Confira os principais no decorrer do tópico, caso ainda tenha dúvidas, 
                        sinta-se livre para pesquisar mais sobre o assunto ou para chamar um instrutor via Skype. 
                        Você está pronto?
                    </p>
                    <h3>Comunicação Visual x Design Gráfico</h3>
                    <p>
                        O programa Adobe Photoshop é vastamente utilizado no mercado de trabalho voltado a estas duas áreas, 
                        mas você sabe diferenciá-las?
                    </p>
                    ${this.createCollapsedButtons()}
                </div>
            </div>
        `;

    }
}

declare global{

   interface HTMLElementTagNameMap{

    'initial-concept': InitialConcept

   }
}