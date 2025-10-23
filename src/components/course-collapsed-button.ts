import { IconTypes } from 'ecv-component';
import {LitElement, html, css, TemplateResult, CSSResult, PropertyValues} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

@customElement('course-collapsed-button')
export default class CourseCollapsedButton extends LitElement{


    static override get styles(): CSSResult{

        return css`
            :host{
                display: block;
                margin: 20px 0;
                user-select: none;
                -webkit-user-select: none;
                -webkit-user-drag: none;
            }

            .course-collapsed-button{
                font-family: RobotoBold;
                font-size: 16px;
            }

            .course-collapsed-button__header{
                display: flex;
                align-items: center;
                background-color: #031B30;
                color: white;
                height: 39px;
                padding: 0 20px;
                justify-content: space-between;
                box-shadow: 0 4px 4px 0 #00000025;
                margin-bottom: 4px;
            }

            .course-collapsed-button__header:hover{
                background-color: #3C97FC;
            }

            .header__button{
                width: 14px;
                height: 14px;
                background-color: white;
                border-radius: 50%;
                cursor: pointer;
            }

            .course-collapsed-button__text{
                background-color: #F5F5F5;
                box-shadow: 0 4px 4px 0 #00000025;
                max-width: 474px;
                font-size: 14px;
                font-family: RobotoLight;
                overflow: hidden;
                transition: height 0.5s ease-in-out;
                padding: 0 20px;
            }

            .text__text{
                margin: 0;
                height: 135px;
                overflow: auto;
            }
        
        `;

    }

    @property({type: String})
    public label: string = '';

    @property({type: String})
    public text: string = '';

    @property({type: Boolean})
    public isCollapsed: boolean = true;

    @query('.course-collapsed-button__text')
    private _textContainer!: HTMLDivElement;

    @query('.text__text')
    private _textElement!: HTMLParagraphElement;

    @state()
    private _defaultPaddingValue: string= '';

    @state()
    private _allowClick: boolean = true;

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        this._textContainer.addEventListener('transitionend', () => {

            if (this.isCollapsed){
                this._defaultPaddingValue = '0 20px!important';
            }

            this._allowClick = true;
        });
        this._textContainer.addEventListener('transitionstart', () => {

            if (!this.isCollapsed){
                this._defaultPaddingValue = '20px!important';
                this._textElement.scrollTop = 0;
            }
        });
    }

    public toogleCollapsed(): void {
        if (this._allowClick){
            this.dispatchEvent(new CustomEvent('oncollapsed', { detail: {
                collapsed: this.isCollapsed
            } }));
            this.isCollapsed = !this.isCollapsed;
            this._allowClick = false;
        }
    }

    protected override render(): TemplateResult{

        return html`
            <style>

                .course-collapsed-button__text{
                    height: ${this.isCollapsed ? '0' : `${this._textElement.offsetHeight}px`};
                    padding: ${this._defaultPaddingValue};
                }

            </style>
            <div class="course-collapsed-button">
                <div class="course-collapsed-button__header">
                    ${this.label}
                    <div class="header__button" @click=${this.toogleCollapsed}>
                        <ecv-icon 
                            .icon=${IconTypes.Add}
                            .iconStyle=${{
                                size: '14px',
                                color: 'black'
                            }}
                        >
                        </ecv-icon>
                    </div>
                </div>
                <div class="course-collapsed-button__text">
                    <p class="text__text">${this.text}</p>
                </div>
            </div>
        `;

    }

}

declare global{

   interface HTMLElementTagNameMap{

    'course-collapsed-button': CourseCollapsedButton

   }
}