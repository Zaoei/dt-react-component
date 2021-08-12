import * as React from 'react';
import { Icon, Tooltip, message } from 'antd';

export interface CopyIconProps {
    text: string;
    style?: React.CSSProperties;
    title?: string;
    customRender?: React.ReactNode;
}

export default class CopyIcon extends React.Component<any, any> {
    fakeHandlerCallback: () => void;
    fakeHandler: EventListener | void;
    fakeElem: HTMLTextAreaElement;

    componentWillUnmount() {
        this.removeFake();
    }

    copy = (value: any) => {
        this.removeFake();

        this.fakeHandlerCallback = () => this.removeFake();
        this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback);

        this.fakeElem = document.createElement('textarea');
        // Prevent zooming on iOS
        this.fakeElem.style.fontSize = '12pt';

        // Reset box model
        this.fakeElem.style.border = '0';
        this.fakeElem.style.padding = '0';
        this.fakeElem.style.margin = '0';

        // Move element out of screen horizontally
        this.fakeElem.style.position = 'absolute';
        this.fakeElem.style.left = '-9999px';

        // Move element to the same position vertically
        const yPosition = window.pageYOffset || document.documentElement.scrollTop;

        this.fakeElem.style.top = `${yPosition}px`;

        this.fakeElem.setAttribute('readonly', '');
        this.fakeElem.value = value;

        document.body.appendChild(this.fakeElem);
        this.fakeElem.select();

        this.text();
    };

    removeFake() {
        if (this.fakeHandler) {
            document.body.removeEventListener('click', this.fakeHandlerCallback);
            this.fakeHandler = null;
            this.fakeHandlerCallback = null;
        }

        if (this.fakeElem) {
            document.body.removeChild(this.fakeElem);
            this.fakeElem = null;
        }
    }

    text() {
        let succeeded;

        try {
            succeeded = document.execCommand('copy');
        } catch (err) {
            succeeded = false;
        }

        this.handleResult(succeeded);
    }

    handleResult(succeeded: any) {
        if (succeeded) {
            message.success('复制成功');
        } else {
            message.error('不支持');
        }
    }

    render() {
        let { customRender, text, style, title, ...otherProps } = this.props;

        style = {
            cursor: 'pointer',
            fontSize: '13px',
            ...style
        };

        return customRender ? (
            <span onClick={this.copy.bind(this, text)}>{customRender}</span>
        ) : (
            <Tooltip placement="right" title={title || '复制'}>
                <Icon
                    className="copy"
                    onClick={this.copy.bind(this, text)}
                    style={style}
                    {...otherProps}
                    type="copy"
                />
            </Tooltip>
        );
    }
}
