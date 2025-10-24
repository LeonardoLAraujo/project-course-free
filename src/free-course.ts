import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';
import "./pages/course-home";
import "./pages/initial-concept/initial-concept";
import "./pages/course-cerebro";
import "./components/course-button-back";
import "./pages/course-possibility";
import "./pages/bitmap-vector/bitmap-vector";
import "./pages/course-quiz";
import "./pages/course-quiz-question";
import "./pages/course-reference";
import "./pages/color-modes/color-modes";
import "./pages/course-quiz";
import "./pages/course-quiz-question";

export enum TransitionType {
    SlideTransition,
    FadeTransition
}

const SCREEN_WIDTH: number = 895;


@customElement('free-course')
export default class FreeCourse extends LitElement{

    static override get styles(): CSSResult{
        return css`
        
            :host{
                display: block;
                width: 895px;
                height: 700px;
                overflow: hidden;
                position: relative;
                -webkit-user-select: none;
                user-select: none;
                -webkit-user-drag: none;
            }

            .free-course{
                position: relative;
                width: fit-content;
                height: 100%;
                transition: left 0.5s ease-out;
                overflow: hidden;
            }

            .free-course > * {
                width: 895px;
                height: 700px;
                display: inherit;
                flex-shrink: 0;
                overflow: hidden;
                -webkit-user-select: none;
                user-select: none;
                -webkit-user-drag: none;
            }

            .test.azul{
                background-color: blue;
            }

            .test.yellow{
                background-color: yellow;
            }

            .test.orange{
                background-color: orange;
            }

            .test.grey{
                background-color: grey;
            }

            .test.red{
                background-color: red;
            }

            .animation{
                animation: fadeAnimation 1s ease-in-out forwards;
            }

            @keyframes fadeAnimation {
                0%{
                    opacity: 1;
                }

                50%{
                    opacity: 0;
                }

                100%{
                    opacity: 1;
                }
            }
        `;
    }

    static instance: FreeCourse;

    private readonly _screenWidth: number = SCREEN_WIDTH;


    @state()
    private _transitionType: TransitionType = TransitionType.SlideTransition;

    @state()
    private _slideOffset: number = 0;

    @state()
    private _maxSlideValue: number = 0;
    @query('.free-course')
    private _freeCourseContainer!: HTMLDivElement;

    private _allowTransiton: boolean = true;

    private _currentPageIndex: number = 0;

    @queryAll('.free-course > *')
    private _pages!: NodeListOf<HTMLElement>;

    protected override firstUpdated(): void {
        FreeCourse.instance = this;

        this._freeCourseContainer.addEventListener('transitionend', () => {
            this._allowTransiton = true;
        });

        this._freeCourseContainer.addEventListener('animationend', () => {
            this._freeCourseContainer.className = 'free-course';
            this._allowTransiton = true;
            this._changePageVisibilityForFadeEffect(this._currentPageIndex);
        });

        this._maxSlideValue = this._freeCourseContainer.offsetWidth as number;
    }

    public getTransitionType(): TransitionType {

        return this._transitionType;
    }

    public toogleTransitionType(){
        if (this._transitionType == TransitionType.SlideTransition){
            this._transitionType = TransitionType.FadeTransition;
            this._changePageVisibilityForFadeEffect(this._currentPageIndex);
        }else if (this._transitionType == TransitionType.FadeTransition){
            this._transitionType = TransitionType.SlideTransition;
        }
    }

    private _changePageVisibilityForFadeEffect(pageIndice: number){

        if (this._transitionType === TransitionType.SlideTransition) return;

        Array.from(this._pages).forEach((page, index) => {
            if (index === pageIndice){
                page.style.display = 'inherit';
            }else{
                page.style.display = 'none';
            }
        });
    }

    public applyTransitionNext(): void {

        if (this._transitionType === TransitionType.SlideTransition){

            this._slideFront();

        }else if (this._transitionType === TransitionType.FadeTransition){

            if (this._currentPageIndex < this._pages.length -1 && this._allowTransiton){
                this._currentPageIndex ++;
                this._allowTransiton = false;
                this._fade();
            }
        }
    }

    public applyTransitionPreviuos(): void {

        if (this._transitionType === TransitionType.SlideTransition){

            this._slideBack();

        }else if (this._transitionType === TransitionType.FadeTransition){

            if (this._currentPageIndex !== 0 && this._allowTransiton){
                this._currentPageIndex --;
                this._allowTransiton = false;
                this._fade();
            }
            
        }
    }

    private _fade(): void {
        this._freeCourseContainer.className = 'free-course animation';
    }

    private _slideFront(): void {
        if (!this._allowTransiton) return;
        if (this._slideOffset !== -this._maxSlideValue + this._screenWidth){
            this._slideOffset -= this._screenWidth;
            this._allowTransiton = false;
            this._currentPageIndex ++;
        } 
    }

    private _slideBack(): void {
        if (!this._allowTransiton) return;

        if (this._slideOffset !== 0){
            this._slideOffset += this._screenWidth;
            this._allowTransiton = false;
            this._currentPageIndex --;
        }
    }

    protected override render(): TemplateResult{
        return html`
            <style>

                .free-course{
                    display: ${this._transitionType == TransitionType.SlideTransition ? 'flex' : 'block'};
                    left: ${this._slideOffset}px;
                }

                .free-course > * {
                    position: ${this._transitionType == TransitionType.SlideTransition ? 'static' : 'absolute'};
                }

            </style>
            <div class="free-course">
                <course-home></course-home>
                <initial-concept></initial-concept>
                <course-cerebro></course-cerebro>
                <course-possibility></course-possibility>
                <bitmap-vector></bitmap-vector>
                <color-modes></color-modes>
                <course-quiz></course-quiz>
                <course-quiz-question></course-quiz-question>
                <course-reference></course-reference>
            </div>
            <!--<button @click=${this.applyTransitionPreviuos}>Slide <<</button>
            <button @click=${this.applyTransitionNext}>Slide >></button>
            <button @click=${this.toogleTransitionType}>Change TransitionType</button>-->
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-free': FreeCourse
    }
}