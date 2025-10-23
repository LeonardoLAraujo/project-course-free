import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, state } from 'lit/decorators.js';

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
            }

            .free-course{
                position: relative;
                width: fit-content;
                height: 100%;
                transition: left 0.5s ease-out;
            }

            .test{
                width: 895px;
                height: 100%;
                display: inherit;
                flex-shrink: 0;
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
        `;
    }

    private readonly _screenWidth: number = SCREEN_WIDTH;


    @state()
    private _transitionType: TransitionType = TransitionType.SlideTransition;

    @state()
    private _slideOffset: number = 0;

    @state()
    private _maxSlideValue: number = 0;

    private _freeCourseContainer?: HTMLDivElement;

    private _allowSlide: boolean = true;

    protected override firstUpdated(): void {
        this._freeCourseContainer = this.shadowRoot?.querySelector<HTMLDivElement>('.free-course') as HTMLDivElement;
        this._freeCourseContainer.addEventListener('transitionend', () => {
            this._allowSlide = true;
        });
        this._maxSlideValue = this._freeCourseContainer?.offsetWidth as number;
    }

    public getTransitionType(): TransitionType {

        return this._transitionType;
    }

    public fadeIn(): void {


    }

    public fadeOut(): void {


    }

    public slideFront(): void {
        if (!this._allowSlide) return;
        if (this._slideOffset !== -this._maxSlideValue + this._screenWidth){
            this._slideOffset -= this._screenWidth;
            this._allowSlide = false;
        } 
    }

    public slideBack(): void {
        if (!this._allowSlide) return;

        if (this._slideOffset !== 0){
            this._slideOffset += this._screenWidth;
            this._allowSlide = false;
        }

    }

    protected override render(): TemplateResult{
        return html`
            <style>

                .free-course{
                    display: ${this._transitionType == TransitionType.SlideTransition ? 'flex' : 'block'};
                    left: ${this._slideOffset}px;
                }

            </style>
            <button @click=${this.slideBack}>Slide <<</button>
            <button @click=${this.slideFront}>Slide >></button>
            <div class="free-course">
                <div class="test azul"></div>
                <div class="test yellow"></div>
                <div class="test orange"></div>
                <div class="test grey"></div>
                <div class="test red"></div>
            </div>
        `;
    }

}

declare global{
    interface HTMLElementTagNameMap{
        'course-free': FreeCourse
    }
}